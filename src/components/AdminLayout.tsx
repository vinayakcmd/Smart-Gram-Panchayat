import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "admin", icon: "📊", label: "Dashboard" },
  { id: "admin-citizens", icon: "👥", label: "Citizens" },
  { id: "admin-households", icon: "🏘️", label: "Households", badge: 0 },
  { id: "admin-complaints", icon: "📋", label: "Complaints", badge: 12 },
  { id: "admin-documents", icon: "📄", label: "Documents" },
  { id: "admin-news", icon: "📰", label: "News" },
  { id: "admin-contacts", icon: "📞", label: "Contacts" },
  { id: "admin-reports", icon: "📈", label: "Reports" },
  { id: "admin-settings", icon: "⚙️", label: "Settings" },
];

export default function AdminLayout({ children, currentPage, onNavigate }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed md:relative z-40 inset-y-0 left-0 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg shadow">🛡️</div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: "Poppins" }}>Admin Portal</div>
              <div className="text-xs text-slate-400">Smart Gram Panchayat</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium sidebar-link ${
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">GP</div>
            <div>
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-slate-400">admin@rahatgaon.gov.in</div>
            </div>
          </div>
          <button onClick={() => onNavigate("login")} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 rounded-xl hover:bg-slate-800 transition-colors">
            🚪 Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button className="md:hidden text-gray-500" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input placeholder="Search citizens, complaints..." className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">5</span>
              </button>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">GP</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
