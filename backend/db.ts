import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.resolve("backend/data");
fs.mkdirSync(dataDir, { recursive: true });

export const db = new Database(path.join(dataDir, "panchayat.sqlite"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_mr TEXT,
    identifier TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('citizen', 'admin')),
    email TEXT,
    mobile TEXT,
    household_id TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS households (
    id TEXT PRIMARY KEY,
    house_number TEXT NOT NULL,
    head TEXT NOT NULL,
    mobile TEXT NOT NULL,
    members INTEGER NOT NULL,
    ward TEXT NOT NULL,
    address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active'
  );
  CREATE TABLE IF NOT EXISTS complaints (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    citizen TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    priority TEXT NOT NULL DEFAULT 'medium',
    status TEXT NOT NULL DEFAULT 'Pending',
    assigned_to TEXT,
    remarks TEXT DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    purpose TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Under Review',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    body TEXT NOT NULL,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'Draft',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const seed = db.transaction(() => {
  const userCount = db.prepare("SELECT COUNT(*) AS count FROM users").get() as { count: number };
  if (userCount.count === 0) {
    const passwordHash = bcrypt.hashSync("demo123", 10);
    db.prepare(`INSERT INTO users (name, name_mr, identifier, password_hash, role, email, mobile, household_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run("Rahul Patil", "राहुल पाटील", "9876543210", passwordHash, "citizen", "rahul.patil@gmail.com", "+91 98765 43210", "HH-2024-0142");
    db.prepare(`INSERT INTO users (name, identifier, password_hash, role, email)
      VALUES (?, ?, ?, ?, ?)`)
      .run("Admin User", "admin@rahatgaon.gov.in", passwordHash, "admin", "admin@rahatgaon.gov.in");
  }

  const householdCount = db.prepare("SELECT COUNT(*) AS count FROM households").get() as { count: number };
  if (householdCount.count === 0) {
    const insert = db.prepare(`INSERT INTO households (id, house_number, head, mobile, members, ward, address)
      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    [
      ["HH-2024-0142", "142", "Rahul Patil", "98765-43210", 5, "Ward 3", "Shivaji Nagar, Rahatgaon"],
      ["HH-2024-0198", "198", "Suresh Kumar", "97654-32100", 4, "Ward 1", "Gandhi Chowk, Rahatgaon"],
      ["HH-2024-0056", "56", "Meena Devi", "99012-34567", 3, "Ward 2", "Ambedkar Nagar, Rahatgaon"],
      ["HH-2024-0312", "312", "Anil Shinde", "98654-32100", 6, "Ward 4", "Bhima Colony, Rahatgaon"],
    ].forEach((household) => insert.run(...household));
  }

  const complaintCount = db.prepare("SELECT COUNT(*) AS count FROM complaints").get() as { count: number };
  if (complaintCount.count === 0) {
    const citizen = db.prepare("SELECT id, name FROM users WHERE role = 'citizen' LIMIT 1").get() as { id: number; name: string };
    const insert = db.prepare(`INSERT INTO complaints
      (id, user_id, citizen, category, title, description, location, priority, status, assigned_to, remarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    insert.run("GP-2024-089", citizen.id, citizen.name, "Water", "No water supply for 3 days", "Pipeline inspection required.", "House No. 142, Shivaji Nagar", "high", "In Progress", "Suresh Mane", "Team has been dispatched to inspect the pipeline.");
    insert.run("GP-2024-090", citizen.id, citizen.name, "Road", "Large pothole near school", "Pothole creates a safety risk.", "Main Road near ZP School", "medium", "Pending", null, "");
  }

  const newsCount = db.prepare("SELECT COUNT(*) AS count FROM news").get() as { count: number };
  if (newsCount.count === 0) {
    const insert = db.prepare("INSERT INTO news (title, category, body, image_url, status) VALUES (?, ?, ?, ?, ?)");
    insert.run("Free Health Camp - 25 August 2024", "Announcement", "A free health camp will be organized at the Gram Panchayat office.", null, "Published");
    insert.run("PM Awas Yojana Applications Now Open", "Government Scheme", "Eligible families can apply at the Panchayat office before 15 September 2024.", null, "Published");
  }
});

seed();
