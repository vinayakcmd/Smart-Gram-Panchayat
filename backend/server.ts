import "dotenv/config";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { db } from "./db";

const app = express();
const port = Number(process.env.API_PORT || 3001);
const jwtSecret = process.env.JWT_SECRET || "development-only-secret";
const uploadDir = path.resolve("backend/uploads");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir, limits: { fileSize: 5 * 1024 * 1024 } });

type AuthRequest = Request & { user?: { id: number; role: "citizen" | "admin"; identifier: string } };
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

function issueToken(user: { id: number; role: "citizen" | "admin"; identifier: string }) {
  return jwt.sign(user, jwtSecret, { expiresIn: "8h" });
}
function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
  try { req.user = jwt.verify(header.slice(7), jwtSecret) as AuthRequest["user"]; next(); }
  catch { return res.status(401).json({ error: "Invalid or expired token" }); }
}
function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin access required" });
  next();
}
function nextId(prefix: string) {
  return `${prefix}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
}

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "smart-gram-panchayat-api" }));

app.post("/api/auth/login", (req, res) => {
  const { identifier, password } = req.body as { identifier?: string; password?: string };
  const user = identifier ? db.prepare("SELECT * FROM users WHERE identifier = ?").get(identifier) as any : undefined;
  if (!user || !password || !bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: "Invalid login credentials" });
  const safeUser = { id: user.id, name: user.name, nameMr: user.name_mr, role: user.role, identifier: user.identifier, email: user.email, mobile: user.mobile, householdId: user.household_id };
  res.json({ token: issueToken({ id: user.id, role: user.role, identifier: user.identifier }), user: safeUser });
});

app.get("/api/me", auth, (req: AuthRequest, res) => {
  const user = db.prepare("SELECT id, name, name_mr AS nameMr, identifier, role, email, mobile, household_id AS householdId FROM users WHERE id = ?").get(req.user!.id);
  res.json(user);
});
app.patch("/api/me", auth, (req: AuthRequest, res) => {
  const { name, email, mobile, occupation } = req.body;
  db.prepare("UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), mobile = COALESCE(?, mobile) WHERE id = ?").run(name, email, mobile, req.user!.id);
  res.json({ success: true, occupation: occupation || null });
});

app.get("/api/complaints", auth, (req: AuthRequest, res) => {
  const query = req.user!.role === "admin" ? "SELECT * FROM complaints ORDER BY created_at DESC" : "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC";
  const rows = req.user!.role === "admin" ? db.prepare(query).all() : db.prepare(query).all(req.user!.id);
  res.json(rows);
});
app.post("/api/complaints", auth, upload.array("photos", 5), (req: AuthRequest, res) => {
  const { category, title, description, location, priority = "medium" } = req.body;
  if (!category || !title || !description) return res.status(400).json({ error: "Category, title, and description are required" });
  const user = db.prepare("SELECT name FROM users WHERE id = ?").get(req.user!.id) as { name: string };
  const id = nextId("GP");
  db.prepare(`INSERT INTO complaints (id, user_id, citizen, category, title, description, location, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, req.user!.id, user.name, category, title, description, location || null, priority);
  res.status(201).json(db.prepare("SELECT * FROM complaints WHERE id = ?").get(id));
});
app.patch("/api/complaints/:id", auth, adminOnly, (req, res) => {
  const { status, assignedTo, remarks } = req.body;
  db.prepare("UPDATE complaints SET status = COALESCE(?, status), assigned_to = COALESCE(?, assigned_to), remarks = COALESCE(?, remarks) WHERE id = ?").run(status, assignedTo, remarks, req.params.id);
  const complaint = db.prepare("SELECT * FROM complaints WHERE id = ?").get(req.params.id);
  if (!complaint) return res.status(404).json({ error: "Complaint not found" });
  res.json(complaint);
});

app.get("/api/households", auth, adminOnly, (req, res) => {
  const search = String(req.query.search || "");
  res.json(db.prepare(`SELECT id, house_number AS house, head, mobile, members, ward, address, status FROM households WHERE id LIKE ? OR house_number LIKE ? OR head LIKE ? OR mobile LIKE ? ORDER BY id`).all(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`));
});
app.get("/api/households/me", auth, (req: AuthRequest, res) => {
  const user = db.prepare("SELECT household_id FROM users WHERE id = ?").get(req.user!.id) as { household_id: string };
  const household = db.prepare("SELECT id, house_number AS house, head, mobile, members, ward, address, status FROM households WHERE id = ?").get(user.household_id);
  res.json(household || null);
});

app.get("/api/applications", auth, (req: AuthRequest, res) => res.json(db.prepare("SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC").all(req.user!.id)));
app.post("/api/applications", auth, upload.array("documents", 5), (req: AuthRequest, res) => {
  const { type, purpose } = req.body;
  if (!type || !purpose) return res.status(400).json({ error: "Document type and purpose are required" });
  const id = nextId("APP");
  db.prepare("INSERT INTO applications (id, user_id, type, purpose) VALUES (?, ?, ?, ?)").run(id, req.user!.id, type, purpose);
  res.status(201).json(db.prepare("SELECT * FROM applications WHERE id = ?").get(id));
});

app.get("/api/news", (_req, res) => res.json(db.prepare("SELECT id, title, category, body, image_url AS imageUrl, status, created_at AS createdAt FROM news WHERE status = 'Published' ORDER BY created_at DESC").all()));
app.get("/api/admin/news", auth, adminOnly, (_req, res) => res.json(db.prepare("SELECT id, title, category, body, image_url AS imageUrl, status, created_at AS createdAt FROM news ORDER BY created_at DESC").all()));
app.post("/api/admin/news", auth, adminOnly, (req, res) => {
  const { title, category, body, imageUrl, status = "Draft" } = req.body;
  if (!title || !body) return res.status(400).json({ error: "Title and body are required" });
  const result = db.prepare("INSERT INTO news (title, category, body, image_url, status) VALUES (?, ?, ?, ?, ?)").run(title, category || "Announcement", body, imageUrl || null, status);
  res.status(201).json(db.prepare("SELECT * FROM news WHERE id = ?").get(result.lastInsertRowid));
});
app.patch("/api/admin/news/:id", auth, adminOnly, (req, res) => {
  const { title, category, body, imageUrl, status } = req.body;
  db.prepare("UPDATE news SET title = COALESCE(?, title), category = COALESCE(?, category), body = COALESCE(?, body), image_url = COALESCE(?, image_url), status = COALESCE(?, status) WHERE id = ?").run(title, category, body, imageUrl, status, req.params.id);
  res.json(db.prepare("SELECT * FROM news WHERE id = ?").get(req.params.id));
});
app.delete("/api/admin/news/:id", auth, adminOnly, (req, res) => { db.prepare("DELETE FROM news WHERE id = ?").run(req.params.id); res.status(204).send(); });

app.get("/api/admin/dashboard", auth, adminOnly, (_req, res) => {
  const count = (sql: string) => (db.prepare(sql).get() as { count: number }).count;
  res.json({ totalCitizens: count("SELECT COUNT(*) AS count FROM users WHERE role = 'citizen'"), totalHouseholds: count("SELECT COUNT(*) AS count FROM households"), complaints: count("SELECT COUNT(*) AS count FROM complaints"), pending: count("SELECT COUNT(*) AS count FROM complaints WHERE status = 'Pending'"), inProgress: count("SELECT COUNT(*) AS count FROM complaints WHERE status = 'In Progress'"), resolved: count("SELECT COUNT(*) AS count FROM complaints WHERE status = 'Resolved'") });
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => res.status(400).json({ error: error.message || "Request failed" }));
app.listen(port, () => console.log(`Smart Gram Panchayat API running at http://localhost:${port}`));
