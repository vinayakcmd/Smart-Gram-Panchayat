import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import ComplaintTracking from "./pages/ComplaintTracking";
import Household from "./pages/Household";
import QRCode from "./pages/QRCode";
import VillageNews from "./pages/VillageNews";
import Contacts from "./pages/Contacts";
import DocumentServices from "./pages/DocumentServices";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminNews from "./pages/AdminNews";
import AdminHouseholds from "./pages/AdminHouseholds";
import CitizenLayout from "./components/CitizenLayout";
import AdminLayout from "./components/AdminLayout";

type Page =
  | "landing"
  | "login"
  | "dashboard"
  | "report"
  | "tracking"
  | "complaints"
  | "household"
  | "qrcode"
  | "news"
  | "contacts"
  | "documents"
  | "profile"
  | "admin"
  | "admin-complaints"
  | "admin-citizens"
  | "admin-households"
  | "admin-documents"
  | "admin-news"
  | "admin-contacts"
  | "admin-reports"
  | "admin-settings";

const citizenPages: Page[] = [
  "dashboard", "report", "tracking", "complaints", "household",
  "qrcode", "news", "contacts", "documents", "profile",
];

const adminPages: Page[] = [
  "admin", "admin-complaints", "admin-citizens", "admin-households",
  "admin-documents", "admin-news", "admin-contacts", "admin-reports", "admin-settings",
];

function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-gray-100">
      <div className="text-4xl mb-4">🚧</div>
      <div className="font-semibold text-lg text-gray-600" style={{ fontFamily: "Poppins" }}>{title}</div>
      <div className="text-sm mt-1">Coming soon</div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [lang, setLang] = useState<"en" | "mr">("en");

  const navigate = (p: string) => setPage(p as Page);

  if (page === "landing") return <Landing onNavigate={navigate} lang={lang} setLang={setLang} />;
  if (page === "login") return <Login onNavigate={navigate} lang={lang} />;

  if (citizenPages.includes(page)) {
    const sidebarActive = page === "tracking" ? "complaints" : page;
    return (
      <CitizenLayout currentPage={sidebarActive} onNavigate={navigate} lang={lang} setLang={setLang}>
        {page === "dashboard" && <Dashboard onNavigate={navigate} lang={lang} />}
        {page === "report" && <ReportIssue onNavigate={navigate} lang={lang} />}
        {(page === "tracking" || page === "complaints") && <ComplaintTracking lang={lang} />}
        {page === "household" && <Household lang={lang} />}
        {page === "qrcode" && <QRCode lang={lang} />}
        {page === "news" && <VillageNews lang={lang} />}
        {page === "contacts" && <Contacts lang={lang} />}
        {page === "documents" && <DocumentServices lang={lang} />}
        {page === "profile" && <Profile lang={lang} />}
      </CitizenLayout>
    );
  }

  if (adminPages.includes(page)) {
    return (
      <AdminLayout currentPage={page} onNavigate={navigate}>
        {page === "admin" && <AdminDashboard onNavigate={navigate} />}
        {page === "admin-complaints" && <AdminComplaints />}
        {page === "admin-households" && <AdminHouseholds />}
        {page === "admin-news" && <AdminNews />}
        {page === "admin-citizens" && <AdminPlaceholder title="Citizen Management" />}
        {page === "admin-documents" && <AdminPlaceholder title="Document Applications" />}
        {page === "admin-contacts" && <AdminPlaceholder title="Contact Management" />}
        {page === "admin-reports" && <AdminPlaceholder title="Reports & Analytics" />}
        {page === "admin-settings" && <AdminPlaceholder title="Settings" />}
      </AdminLayout>
    );
  }

  return null;
}
