import "dotenv/config";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
const app = express();
const port = Number(process.env.API_PORT || 3001);
const uploadDir = path.resolve("backend/uploads");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir, limits: { fileSize: 5 * 1024 * 1024 } });

type User = { id: string; name: string; name_mr: string | null; role: "citizen" | "admin"; identifier: string; email: string | null; mobile: string | null; household_id: string | null };
type AuthRequest = Request & { user?: User };

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

function authEmail(identifier: string) { return `${identifier.replace(/\D/g, "")}@smartgram.local`; }
function nextId(prefix: string) { return `${prefix}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`; }
function safeUser(user: User) { return { id: user.id, name: user.name, nameMr: user.name_mr, role: user.role, identifier: user.identifier, email: user.email, mobile: user.mobile, householdId: user.household_id }; }
async function profileById(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) throw error;
  return data as User;
}
async function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required" });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: "Invalid or expired token" });
  try { req.user = await profileById(data.user.id); next(); } catch { return res.status(401).json({ error: "User profile not found" }); }
}
function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin access required" });
  next();
}
function handle(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(error);
  res.status(400).json({ error: error instanceof Error ? error.message : "Request failed" });
}

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "smart-gram-panchayat-api", database: "supabase" }));

app.post("/api/auth/register", async (req, res, next) => {
  try {
    const { name, mobile, password, email } = req.body as { name?: string; mobile?: string; password?: string; email?: string };
    const identifier = mobile?.replace(/\D/g, "");
    if (!name?.trim() || !identifier || !password) return res.status(400).json({ error: "Name, mobile number, and password are required" });
    if (!/^\d{10}$/.test(identifier)) return res.status(400).json({ error: "Enter a valid 10-digit mobile number" });
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    const { data: existing } = await supabase.from("users").select("id").eq("identifier", identifier).maybeSingle();
    if (existing) return res.status(409).json({ error: "This mobile number is already registered" });
    const { data, error } = await supabase.auth.admin.createUser({ email: authEmail(identifier), password, email_confirm: true, user_metadata: { name: name.trim(), identifier, mobile: identifier } });
    if (error || !data.user) throw error || new Error("Unable to create account");
    const { error: profileError } = await supabase.from("users").update({ name: name.trim(), email: email?.trim() || null, mobile: identifier }).eq("id", data.user.id);
    if (profileError) throw profileError;
    res.status(201).json({ success: true, userId: data.user.id });
  } catch (error) { next(error); }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const { identifier, password } = req.body as { identifier?: string; password?: string };
    if (!identifier || !password) return res.status(401).json({ error: "Invalid login credentials" });
    const { data, error } = await supabase.auth.signInWithPassword({ email: identifier.includes("@") ? identifier : authEmail(identifier), password });
    if (error || !data.session || !data.user) return res.status(401).json({ error: "Invalid login credentials" });
    const user = await profileById(data.user.id);
    res.json({ token: data.session.access_token, user: safeUser(user) });
  } catch (error) { next(error); }
});

app.get("/api/me", auth, (_req: AuthRequest, res) => res.json(safeUser(_req.user!)));
app.patch("/api/me", auth, async (req: AuthRequest, res, next) => {
  try { const { name, email, mobile } = req.body; const { error } = await supabase.from("users").update({ name, email, mobile }).eq("id", req.user!.id); if (error) throw error; res.json({ success: true }); } catch (error) { next(error); }
});

app.get("/api/complaints", auth, async (req: AuthRequest, res, next) => {
  try { let query = supabase.from("complaints").select("*").order("created_at", { ascending: false }); if (req.user!.role !== "admin") query = query.eq("user_id", req.user!.id); const { data, error } = await query; if (error) throw error; res.json(data); } catch (error) { next(error); }
});
app.post("/api/complaints", auth, upload.array("photos", 5), async (req: AuthRequest, res, next) => {
  try { const { category, title, description, location, priority = "medium" } = req.body; if (!category || !title || !description) return res.status(400).json({ error: "Category, title, and description are required" }); const { data, error } = await supabase.from("complaints").insert({ id: nextId("GP"), user_id: req.user!.id, citizen: req.user!.name, category, title, description, location: location || null, priority }).select().single(); if (error) throw error; res.status(201).json(data); } catch (error) { next(error); }
});
app.patch("/api/complaints/:id", auth, adminOnly, async (req, res, next) => { try { const { status, assignedTo, remarks } = req.body; const { data, error } = await supabase.from("complaints").update({ status, assigned_to: assignedTo, remarks }).eq("id", req.params.id).select().single(); if (error) return res.status(404).json({ error: "Complaint not found" }); res.json(data); } catch (error) { next(error); } });

app.get("/api/households", auth, adminOnly, async (req, res, next) => { try { const search = String(req.query.search || ""); const { data, error } = await supabase.from("households").select("id, house:house_number, head, mobile, members, ward, address, status").or(`id.ilike.%${search}%,house_number.ilike.%${search}%,head.ilike.%${search}%,mobile.ilike.%${search}%`).order("id"); if (error) throw error; res.json(data); } catch (error) { next(error); } });
app.get("/api/households/me", auth, async (req: AuthRequest, res, next) => { try { if (!req.user!.household_id) return res.json(null); const { data, error } = await supabase.from("households").select("id, house:house_number, head, mobile, members, ward, address, status").eq("id", req.user!.household_id).maybeSingle(); if (error) throw error; res.json(data); } catch (error) { next(error); } });

app.get("/api/applications", auth, async (req: AuthRequest, res, next) => { try { const { data, error } = await supabase.from("applications").select("*").eq("user_id", req.user!.id).order("created_at", { ascending: false }); if (error) throw error; res.json(data); } catch (error) { next(error); } });
app.post("/api/applications", auth, upload.array("documents", 5), async (req: AuthRequest, res, next) => { try { const { type, purpose } = req.body; if (!type || !purpose) return res.status(400).json({ error: "Document type and purpose are required" }); const { data, error } = await supabase.from("applications").insert({ id: nextId("APP"), user_id: req.user!.id, type, purpose }).select().single(); if (error) throw error; res.status(201).json(data); } catch (error) { next(error); } });

app.get("/api/news", async (_req, res, next) => { try { const { data, error } = await supabase.from("news").select("id, title, category, body, imageUrl:image_url, status, createdAt:created_at").eq("status", "Published").order("created_at", { ascending: false }); if (error) throw error; res.json(data); } catch (error) { next(error); } });
app.get("/api/admin/news", auth, adminOnly, async (_req, res, next) => { try { const { data, error } = await supabase.from("news").select("id, title, category, body, imageUrl:image_url, status, createdAt:created_at").order("created_at", { ascending: false }); if (error) throw error; res.json(data); } catch (error) { next(error); } });
app.post("/api/admin/news", auth, adminOnly, async (req, res, next) => { try { const { title, category, body, imageUrl, status = "Draft" } = req.body; if (!title || !body) return res.status(400).json({ error: "Title and body are required" }); const { data, error } = await supabase.from("news").insert({ title, category: category || "Announcement", body, image_url: imageUrl || null, status }).select().single(); if (error) throw error; res.status(201).json(data); } catch (error) { next(error); } });
app.patch("/api/admin/news/:id", auth, adminOnly, async (req, res, next) => { try { const { title, category, body, imageUrl, status } = req.body; const { data, error } = await supabase.from("news").update({ title, category, body, image_url: imageUrl, status }).eq("id", req.params.id).select().single(); if (error) throw error; res.json(data); } catch (error) { next(error); } });
app.delete("/api/admin/news/:id", auth, adminOnly, async (req, res, next) => { try { const { error } = await supabase.from("news").delete().eq("id", req.params.id); if (error) throw error; res.status(204).send(); } catch (error) { next(error); } });

app.get("/api/admin/dashboard", auth, adminOnly, async (_req, res, next) => { try { const count = async (table: string, filters?: (query: any) => any) => { let query = supabase.from(table).select("id", { count: "exact", head: true }); if (filters) query = filters(query); const result = await query; if (result.error) throw result.error; return result.count || 0; }; res.json({ totalCitizens: await count("users", (q) => q.eq("role", "citizen")), totalHouseholds: await count("households"), complaints: await count("complaints"), pending: await count("complaints", (q) => q.eq("status", "Pending")), inProgress: await count("complaints", (q) => q.eq("status", "In Progress")), resolved: await count("complaints", (q) => q.eq("status", "Resolved")) }); } catch (error) { next(error); } });

app.use(handle);
app.listen(port, () => console.log(`Smart Gram Panchayat API using Supabase at http://localhost:${port}`));
