const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

export type ApiUser = {
  id: string;
  name: string;
  nameMr?: string | null;
  role: "citizen" | "admin";
  identifier: string;
  email?: string | null;
  mobile?: string | null;
  householdId?: string | null;
};

export type Complaint = {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string | null;
  priority: string;
  status: string;
  assigned_to?: string | null;
  remarks?: string | null;
  citizen?: string;
  created_at: string;
};

export type Application = {
  id: string;
  type: string;
  purpose: string;
  status: string;
  created_at: string;
};

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  body: string;
  imageUrl?: string | null;
  status?: string;
  createdAt: string;
};

function token() {
  return localStorage.getItem("smart-gram-token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const authToken = token();
  if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
  const response = await fetch(`${apiUrl}${path}`, { ...options, headers });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error || "Request failed");
  return body as T;
}

export const api = {
  login: (identifier: string, password: string) => request<{ token: string; user: ApiUser }>("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier, password }) }),
  register: (payload: { name: string; mobile: string; password: string; email?: string }) => request<{ success: boolean }>("/api/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request<ApiUser>("/api/me"),
  updateMe: (payload: Partial<ApiUser>) => request<{ success: boolean }>("/api/me", { method: "PATCH", body: JSON.stringify(payload) }),
  complaints: () => request<Complaint[]>("/api/complaints"),
  createComplaint: (payload: { category: string; title: string; description: string; location?: string; priority: string; photos?: File[] }) => {
    const body = new FormData();
    body.append("category", payload.category);
    body.append("title", payload.title);
    body.append("description", payload.description);
    body.append("location", payload.location || "");
    body.append("priority", payload.priority);
    payload.photos?.forEach((photo) => body.append("photos", photo));
    return request<Complaint>("/api/complaints", { method: "POST", body });
  },
  applications: () => request<Application[]>("/api/applications"),
  createApplication: (type: string, purpose: string, documents?: File[]) => {
    const body = new FormData();
    body.append("type", type);
    body.append("purpose", purpose);
    documents?.forEach((document) => body.append("documents", document));
    return request<Application>("/api/applications", { method: "POST", body });
  },
  news: () => request<NewsItem[]>("/api/news"),
};
