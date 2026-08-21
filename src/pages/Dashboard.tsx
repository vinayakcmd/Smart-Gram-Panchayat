import { useState } from "react";

interface DashboardProps {
  onNavigate: (page: string) => void;
  lang: "en" | "mr";
}

const stats = [
  { label: "Total Complaints", label_mr: "एकूण तक्रारी", value: 7, icon: "📋", bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
  { label: "Pending", label_mr: "प्रलंबित", value: 2, icon: "⏳", bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  { label: "In Progress", label_mr: "प्रगतीपथावर", value: 2, icon: "🔄", bg: "bg-yellow-500", light: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-100" },
  { label: "Resolved", label_mr: "निराकृत", value: 3, icon: "✅", bg: "bg-green-600", light: "bg-green-50", text: "text-green-700", border: "border-green-100" },
];

const complaints = [
  { id: "GP-2024-089", cat: "Water", cat_mr: "पाणी", catIcon: "💧", title: "No water supply for 3 days", title_mr: "3 दिवसांपासून पाणी नाही", date: "18 Aug 2024", status: "In Progress", status_mr: "प्रगतीपथावर", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "GP-2024-076", cat: "Road", cat_mr: "रस्ता", catIcon: "🛣️", title: "Large pothole near school", title_mr: "शाळेजवळ मोठा खड्डा", date: "14 Aug 2024", status: "Pending", status_mr: "प्रलंबित", statusColor: "bg-orange-100 text-orange-700" },
  { id: "GP-2024-061", cat: "Streetlight", cat_mr: "दिवाबत्ती", catIcon: "💡", title: "Streetlight not working near temple", title_mr: "मंदिराजवळील दिवाबत्ती बंद", date: "8 Aug 2024", status: "Resolved", status_mr: "निराकृत", statusColor: "bg-green-100 text-green-700" },
];

const news = [
  { icon: "🏥", title: "Free Health Camp – 25 August 2024", title_mr: "मोफत आरोग्य शिबिर – 25 ऑगस्ट 2024", time: "2 days ago", cat: "Health", catColor: "bg-pink-100 text-pink-700" },
  { icon: "🛤️", title: "Main Road Repair starting next week", title_mr: "मुख्य रस्ता दुरुस्ती पुढच्या आठवड्यात", time: "4 days ago", cat: "Road Work", catColor: "bg-orange-100 text-orange-700" },
  { icon: "💧", title: "Water supply schedule for September", title_mr: "सप्टेंबरसाठी पाणीपुरवठा वेळापत्रक", time: "5 days ago", cat: "Water", catColor: "bg-blue-100 text-blue-700" },
];

const quickActions = [
  { id: "household", icon: "👨‍👩‍👧", label: "Household", label_mr: "कुटुंब", color: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100" },
  { id: "qrcode", icon: "📱", label: "QR Code", label_mr: "QR कोड", color: "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-100" },
  { id: "documents", icon: "📄", label: "Documents", label_mr: "दस्तऐवज", color: "bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-100" },
  { id: "contacts", icon: "📞", label: "Contacts", label_mr: "संपर्क", color: "bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-100" },
  { id: "news", icon: "📰", label: "News", label_mr: "बातम्या", color: "bg-green-50 hover:bg-green-100 text-green-700 border-green-100" },
  { id: "profile", icon: "👤", label: "My Profile", label_mr: "प्रोफाइल", color: "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-100" },
];

export default function Dashboard({ onNavigate, lang }: DashboardProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="animate-fade-in space-y-5">
      {/* Welcome Banner */}
      <div className="hero-gradient rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-5 translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full bg-white opacity-5 translate-y-12" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
              <span className="text-green-300 text-xs">Tuesday, 20 August 2024</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Poppins" }}>
              {lang === "mr" ? <span className="devanagari">नमस्ते, राहुल पाटील 👋</span> : "Welcome back, Rahul Patil 👋"}
            </h1>
            <div className="flex flex-wrap gap-3">
              <div className="text-sm text-white/80 bg-white/10 rounded-lg px-3 py-1.5">
                <span className="text-green-300 font-mono-data font-semibold">HH-2024-0142</span>
              </div>
              <div className="text-sm text-white/80 bg-white/10 rounded-lg px-3 py-1.5">
                <span>🏠</span> <span className="text-white font-medium">House #142</span>
              </div>
              <div className="text-sm text-white/80 bg-white/10 rounded-lg px-3 py-1.5">
                <span>👥</span> <span className="text-white font-medium">5 Members</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate("report")}
            className="flex items-center gap-2 bg-white text-green-700 font-bold px-5 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-lg text-sm flex-shrink-0"
          >
            <span>📢</span>
            <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "तक्रार नोंदवा" : "Report an Issue"}</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {!dismissed && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
          <span className="text-amber-500 text-xl flex-shrink-0 mt-0.5">⚠️</span>
          <div className="flex-1">
            <div className="font-semibold text-amber-800 text-sm">Important Announcement</div>
            <div className={`text-amber-700 text-sm mt-0.5 ${lang === "mr" ? "devanagari" : ""}`}>
              {lang === "mr" ? "पाणीपुरवठा 22 ऑगस्ट रोजी सकाळी 6–10 वाजेपर्यंत बंद राहील" : "Water supply will be shut on 22 Aug 6–10 AM for maintenance work."}
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="text-amber-400 hover:text-amber-600 text-xl flex-shrink-0">×</button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`${s.light} rounded-2xl p-5 border ${s.border} card-hover cursor-pointer relative overflow-hidden`}
            onClick={() => onNavigate("complaints")}
          >
            <div className={`absolute top-0 right-0 w-14 h-14 rounded-bl-3xl ${s.bg} opacity-10`} />
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center text-sm mb-3 shadow-sm`}>
              {s.icon}
            </div>
            <div className={`text-3xl font-extrabold font-mono-data ${s.text}`}>{s.value}</div>
            <div className={`text-xs font-medium text-gray-600 mt-1.5 ${lang === "mr" ? "devanagari" : ""}`}>
              {lang === "mr" ? s.label_mr : s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent Complaints */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>
              {lang === "mr" ? <span className="devanagari">अलीकडील तक्रारी</span> : "Recent Complaints"}
            </h2>
            <button onClick={() => onNavigate("complaints")} className="text-xs text-green-700 font-semibold hover:underline flex items-center gap-1">View All →</button>
          </div>
          <div className="divide-y divide-gray-50">
            {complaints.map((c, i) => (
              <div key={i} className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onNavigate("tracking")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">{c.catIcon}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-mono-data text-gray-400">{c.id}</span>
                      </div>
                      <div className={`text-sm font-medium text-gray-800 truncate ${lang === "mr" ? "devanagari" : ""}`}>
                        {lang === "mr" ? c.title_mr : c.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{c.date}</div>
                    </div>
                  </div>
                  <span className={`status-badge px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${c.statusColor} ${lang === "mr" ? "devanagari" : ""}`}>
                    {lang === "mr" ? c.status_mr : c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-50">
            <button onClick={() => onNavigate("report")} className="w-full py-3 gov-gradient text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm">
              <span>📢</span>
              <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "नवीन तक्रार नोंदवा" : "Report a New Issue"}</span>
            </button>
          </div>
        </div>

        {/* News + Announcement */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>
              {lang === "mr" ? <span className="devanagari">गाव बातम्या</span> : "Village News"}
            </h2>
            <button onClick={() => onNavigate("news")} className="text-xs text-green-700 font-semibold hover:underline">View All →</button>
          </div>
          <div className="divide-y divide-gray-50 flex-1">
            {news.map((n, i) => (
              <div key={i} className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onNavigate("news")}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-lg flex-shrink-0">{n.icon}</div>
                  <div className="min-w-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${n.catColor}`}>{n.cat}</span>
                    <div className={`text-sm font-medium text-gray-800 leading-snug mt-1 ${lang === "mr" ? "devanagari" : ""}`}>
                      {lang === "mr" ? n.title_mr : n.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-gray-700 text-sm mb-3 px-1">
          {lang === "mr" ? <span className="devanagari">द्रुत क्रिया</span> : "Quick Actions"}
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map((a, i) => (
            <button key={i} onClick={() => onNavigate(a.id)} className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition-colors ${a.color}`}>
              <span className="text-2xl">{a.icon}</span>
              <span className={`text-xs font-semibold text-center leading-tight ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? a.label_mr : a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
