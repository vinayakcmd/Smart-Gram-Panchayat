import { useState } from "react";

interface CitizenLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  lang: "en" | "mr";
  setLang: (l: "en" | "mr") => void;
}

const navItems = [
  { id: "dashboard", icon: "🏠", en: "Dashboard", mr: "डॅशबोर्ड" },
  { id: "household", icon: "👨‍👩‍👧", en: "My Household", mr: "माझे कुटुंब" },
  { id: "qrcode", icon: "📱", en: "My QR Code", mr: "माझा QR कोड" },
  { id: "report", icon: "📢", en: "Report Issue", mr: "तक्रार नोंदवा" },
  { id: "complaints", icon: "📋", en: "My Complaints", mr: "माझ्या तक्रारी" },
  { id: "news", icon: "📰", en: "Village News", mr: "गाव बातम्या" },
  { id: "contacts", icon: "📞", en: "Contacts", mr: "संपर्क" },
  { id: "documents", icon: "📄", en: "Documents", mr: "दस्तऐवज" },
  { id: "profile", icon: "👤", en: "My Profile", mr: "माझी प्रोफाइल" },
];

const notifications = [
  { text: "Your complaint #GP-2024-089 is In Progress", time: "2h ago", type: "info" },
  { text: "Water supply complaint resolved", time: "1d ago", type: "success" },
  { text: "New announcement: Health Camp on 25 Aug", time: "2d ago", type: "warning" },
];

export default function CitizenLayout({ children, currentPage, onNavigate, lang, setLang }: CitizenLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gov-gradient flex items-center justify-center text-white text-lg shadow">🌾</div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight" style={{ fontFamily: "Poppins" }}>Smart GP</div>
              <div className="text-xs text-green-700 devanagari">राहटगाव</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium sidebar-link ${
                currentPage === item.id
                  ? "bg-green-50 text-green-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? item.mr : item.en}</span>
              {item.id === "complaints" && (
                <span className="ml-auto text-xs font-mono bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">2</span>
              )}
            </button>
          ))}
        </nav>

        {/* Profile + Logout */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm">रा</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">Rahul Patil</div>
              <div className="text-xs text-gray-500 font-mono-data">HH-2024-0142</div>
            </div>
          </div>
          <button onClick={() => onNavigate("landing")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors">
            <span>🚪</span> <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "लॉगआउट" : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 font-medium text-gray-600 hover:border-green-500 hover:text-green-700 transition-colors"
            >
              {lang === "en" ? "मराठी" : "English"}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-gray-900 text-sm" style={{ fontFamily: "Poppins" }}>Notifications</span>
                    <button className="text-xs text-green-700">Mark all read</button>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={i} className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                      <div className="text-sm text-gray-800 leading-snug">{n.text}</div>
                      <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-9 h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer">रा</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden flex border-t border-gray-100 bg-white">
          {[
            { id: "dashboard", icon: "🏠", label: "Home" },
            { id: "report", icon: "📢", label: "Report" },
            { id: "complaints", icon: "📋", label: "Issues" },
            { id: "news", icon: "📰", label: "News" },
            { id: "documents", icon: "📄", label: "Docs" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center py-2 text-xs gap-0.5 ${currentPage === item.id ? "text-green-700" : "text-gray-400"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
