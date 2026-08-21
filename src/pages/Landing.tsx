import { useState } from "react";

interface LandingProps {
  onNavigate: (page: string) => void;
  lang: "en" | "mr";
  setLang: (l: "en" | "mr") => void;
}

const t = {
  en: {
    nav: ["Home", "About", "Services", "News", "Contact"],
    login: "Login",
    register: "Register",
    hero1: "A Smarter Village,",
    hero2: "A Better Tomorrow",
    heroDesc:
      "Smart Gram Panchayat brings digital governance to your village — report issues, access services, and stay informed, all in one place.",
    reportCta: "Report an Issue",
    exploreCta: "Explore Services",
    stat1: "Registered Households",
    stat2: "Issues Resolved",
    stat3: "Village Services",
    stat4: "Active Citizens",
    featTitle: "Everything Your Village Needs",
    featDesc: "A complete digital platform for modern village governance",
    howTitle: "How It Works",
    newsTitle: "Latest Village News",
    contactTitle: "Important Contacts",
    footerDesc: "Empowering villages through digital governance.",
    footerRights: "© 2024 Smart Gram Panchayat, Rahatgaon, Maharashtra",
  },
  mr: {
    nav: ["मुख्यपृष्ठ", "आमच्याबद्दल", "सेवा", "बातम्या", "संपर्क"],
    login: "लॉगिन",
    register: "नोंदणी",
    hero1: "स्मार्ट गाव,",
    hero2: "उज्ज्वल उद्या",
    heroDesc:
      "स्मार्ट ग्राम पंचायत तुमच्या गावात डिजिटल प्रशासन आणते — तक्रारी नोंदवा, सेवा मिळवा आणि माहिती अद्ययावत ठेवा.",
    reportCta: "तक्रार नोंदवा",
    exploreCta: "सेवा पहा",
    stat1: "नोंदणीकृत कुटुंबे",
    stat2: "समस्या सुटलेल्या",
    stat3: "ग्राम सेवा",
    stat4: "सक्रिय नागरिक",
    featTitle: "गावासाठी सर्वकाही",
    featDesc: "आधुनिक ग्राम प्रशासनासाठी संपूर्ण डिजिटल व्यासपीठ",
    howTitle: "हे कसे कार्य करते",
    newsTitle: "ताज्या बातम्या",
    contactTitle: "महत्त्वाचे संपर्क",
    footerDesc: "डिजिटल प्रशासनाद्वारे गावांना सशक्त बनवणे.",
    footerRights: "© 2024 स्मार्ट ग्राम पंचायत, राहटगाव, महाराष्ट्र",
  },
};

const features = [
  {
    icon: "📋",
    en: "Complaint Management",
    mr: "तक्रार व्यवस्थापन",
    desc_en: "Report and track village issues with real-time status updates",
    desc_mr: "वास्तविक वेळेत स्थिती अद्यतनांसह समस्या नोंदवा",
  },
  {
    icon: "🏠",
    en: "Household Registry",
    mr: "कुटुंब नोंदणी",
    desc_en: "Digital QR-based household identification for all families",
    desc_mr: "सर्व कुटुंबांसाठी डिजिटल QR-आधारित ओळख",
  },
  {
    icon: "📄",
    en: "Document Services",
    mr: "दस्तऐवज सेवा",
    desc_en: "Apply for certificates online without visiting the office",
    desc_mr: "कार्यालयाला भेट न देता ऑनलाइन प्रमाणपत्रे मिळवा",
  },
  {
    icon: "📰",
    en: "Village News",
    mr: "गाव बातम्या",
    desc_en: "Stay updated with government schemes, announcements, and events",
    desc_mr: "सरकारी योजना, घोषणा आणि कार्यक्रमांची माहिती",
  },
  {
    icon: "📞",
    en: "Emergency Contacts",
    mr: "आपत्कालीन संपर्क",
    desc_en: "Quick access to Panchayat officials and emergency services",
    desc_mr: "पंचायत अधिकारी आणि आपत्कालीन सेवांशी त्वरित संपर्क",
  },
  {
    icon: "📊",
    en: "Transparent Reports",
    mr: "पारदर्शक अहवाल",
    desc_en: "View village development work and budget utilization reports",
    desc_mr: "ग्राम विकास कार्य आणि अर्थसंकल्प वापर अहवाल",
  },
];

const steps = [
  { icon: "📱", en: "Register", mr: "नोंदणी करा", desc_en: "Sign up with your mobile number", desc_mr: "तुमच्या मोबाइल नंबरने नोंदणी करा" },
  { icon: "🔑", en: "Login", mr: "लॉगिन करा", desc_en: "Access your personal dashboard", desc_mr: "तुमच्या डॅशबोर्डमध्ये प्रवेश करा" },
  { icon: "📝", en: "Report & Apply", mr: "तक्रार & अर्ज", desc_en: "Submit complaints or document requests", desc_mr: "तक्रारी किंवा दस्तऐवज विनंत्या सादर करा" },
  { icon: "✅", en: "Track & Resolve", mr: "ट्रॅक & निराकरण", desc_en: "Monitor progress until resolution", desc_mr: "निराकरण होईपर्यंत प्रगती पहा" },
];

const news = [
  { cat: "Announcement", cat_mr: "घोषणा", title: "Free Health Camp on 25 August 2024", title_mr: "25 ऑगस्ट 2024 रोजी मोफत आरोग्य शिबिर", date: "20 Aug 2024", img: "photo-1559523161-0fc0d8b12cfd" },
  { cat: "Government Scheme", cat_mr: "सरकारी योजना", title: "PM Awas Yojana Applications Open", title_mr: "PM आवास योजना अर्ज सुरू", date: "18 Aug 2024", img: "photo-1504711434969-e33886168f5c" },
  { cat: "Road Work", cat_mr: "रस्ता काम", title: "Main Road Repair Work Starting Next Week", title_mr: "मुख्य रस्ता दुरुस्ती पुढच्या आठवड्यापासून", date: "15 Aug 2024", img: "photo-1449824913935-59a10b8d2000" },
];

const contacts = [
  { icon: "🏛️", name: "Gram Panchayat Office", name_mr: "ग्राम पंचायत कार्यालय", phone: "02167-223456" },
  { icon: "👤", name: "Sarpanch – Ramesh Patil", name_mr: "सरपंच – रमेश पाटील", phone: "98765-43210" },
  { icon: "🚑", name: "Ambulance (108)", name_mr: "रुग्णवाहिका (108)", phone: "108" },
  { icon: "🚒", name: "Fire Brigade", name_mr: "अग्निशमन दल", phone: "101" },
];

export default function Landing({ onNavigate, lang, setLang }: LandingProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const tx = t[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gov-gradient flex items-center justify-center text-white font-bold text-lg shadow">🌾</div>
            <div>
              <div className="font-bold text-gray-900 leading-tight text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>Smart Gram Panchayat</div>
              <div className={`text-xs text-green-700 ${lang === "mr" ? "devanagari" : ""}`}>
                {lang === "mr" ? "राहटगाव, महाराष्ट्र" : "Rahatgaon, Maharashtra"}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {tx.nav.map((n, i) => (
              <a key={i} href="#" className={`text-sm font-medium text-gray-600 hover:text-green-700 transition-colors ${lang === "mr" ? "devanagari" : ""}`}>{n}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 font-medium text-gray-600 hover:border-green-500 hover:text-green-700 transition-colors"
            >
              {lang === "en" ? "मराठी" : "English"}
            </button>
            <button onClick={() => onNavigate("login")} className="hidden sm:block text-sm font-medium text-green-700 border border-green-600 rounded-lg px-4 py-1.5 hover:bg-green-50 transition-colors">
              {tx.login}
            </button>
            <button onClick={() => onNavigate("login")} className="text-sm font-semibold bg-green-700 text-white rounded-lg px-4 py-1.5 hover:bg-green-800 transition-colors shadow-sm">
              {tx.register}
            </button>
            <button className="md:hidden ml-1 text-gray-500" onClick={() => setMobileMenu(!mobileMenu)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
            {tx.nav.map((n, i) => (
              <a key={i} href="#" className={`text-sm font-medium text-gray-700 ${lang === "mr" ? "devanagari" : ""}`}>{n}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-24 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-green-400 blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot"></span>
              <span className="text-green-300 text-xs font-medium">Digital Maharashtra Initiative</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span className={lang === "mr" ? "devanagari" : ""}>{tx.hero1}</span>
              <br />
              <span className="text-green-400">{tx.hero2}</span>
            </h1>
            <p className={`text-blue-100 text-lg mb-8 leading-relaxed max-w-lg ${lang === "mr" ? "devanagari" : ""}`}>{tx.heroDesc}</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => onNavigate("report")} className="bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center gap-2">
                <span>📢</span> <span className={lang === "mr" ? "devanagari" : ""}>{tx.reportCta}</span>
              </button>
              <button onClick={() => onNavigate("documents")} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors flex items-center gap-2">
                <span>🔍</span> <span className={lang === "mr" ? "devanagari" : ""}>{tx.exploreCta}</span>
              </button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=600&h=400&fit=crop&auto=format"
                alt="Smart village digital governance"
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent rounded-2xl"></div>
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">✅</div>
              <div>
                <div className="text-xs text-gray-500">Issues Resolved</div>
                <div className="text-lg font-bold text-gray-800" style={{ fontFamily: "JetBrains Mono" }}>1,248</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">👨‍👩‍👧‍👦</div>
              <div>
                <div className="text-xs text-gray-500">Households</div>
                <div className="text-lg font-bold text-gray-800" style={{ fontFamily: "JetBrains Mono" }}>3,562</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-700 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: "3,562", label: tx.stat1, icon: "🏠" },
            { num: "1,248", label: tx.stat2, icon: "✅" },
            { num: "24", label: tx.stat3, icon: "🛠️" },
            { num: "8,940", label: tx.stat4, icon: "👥" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl font-extrabold text-white" style={{ fontFamily: "JetBrains Mono" }}>{s.num}</div>
              <div className={`text-green-200 text-sm mt-1 ${lang === "mr" ? "devanagari" : ""}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "mr" ? <span className="devanagari">{tx.featTitle}</span> : tx.featTitle}
            </h2>
            <p className={`text-gray-500 ${lang === "mr" ? "devanagari" : ""}`}>{tx.featDesc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover cursor-pointer" onClick={() => onNavigate("dashboard")}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {lang === "mr" ? <span className="devanagari">{f.mr}</span> : f.en}
                </h3>
                <p className={`text-gray-500 text-sm leading-relaxed ${lang === "mr" ? "devanagari" : ""}`}>
                  {lang === "mr" ? f.desc_mr : f.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12" style={{ fontFamily: "Poppins, sans-serif" }}>
            {lang === "mr" ? <span className="devanagari">{tx.howTitle}</span> : tx.howTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-green-200 z-0"></div>
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center text-2xl mx-auto mb-4">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-700 text-white text-xs font-bold flex items-center justify-center" style={{ fontFamily: "JetBrains Mono" }}>{i + 1}</span>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {lang === "mr" ? <span className="devanagari">{s.mr}</span> : s.en}
                </h4>
                <p className={`text-gray-500 text-xs ${lang === "mr" ? "devanagari" : ""}`}>
                  {lang === "mr" ? s.desc_mr : s.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              {lang === "mr" ? <span className="devanagari">{tx.newsTitle}</span> : tx.newsTitle}
            </h2>
            <button onClick={() => onNavigate("news")} className="text-green-700 text-sm font-medium hover:underline">View All →</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover cursor-pointer">
                <img src={`https://images.unsplash.com/${n.img}?w=400&h=200&fit=crop&auto=format`} alt={n.title} className="w-full h-44 object-cover bg-green-50" />
                <div className="p-5">
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-1 rounded-full">{lang === "mr" ? n.cat_mr : n.cat}</span>
                  <h3 className={`font-semibold text-gray-900 mt-3 mb-2 text-sm leading-snug ${lang === "mr" ? "devanagari" : ""}`} style={{ fontFamily: "Poppins, sans-serif" }}>
                    {lang === "mr" ? n.title_mr : n.title}
                  </h3>
                  <div className="text-xs text-gray-400">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10" style={{ fontFamily: "Poppins, sans-serif" }}>
            {lang === "mr" ? <span className="devanagari">{tx.contactTitle}</span> : tx.contactTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contacts.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center card-hover">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className={`font-semibold text-gray-800 text-sm mb-1 ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? c.name_mr : c.name}</div>
                <div className="text-green-700 font-mono-data text-sm font-medium mb-3">{c.phone}</div>
                <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-green-800 transition-colors">
                  📞 Call
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 gov-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Ready to Get Started?</h2>
          <p className="text-white/80 mb-8">Join thousands of citizens already using Smart Gram Panchayat</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => onNavigate("login")} className="bg-white text-green-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Register Now
            </button>
            <button onClick={() => onNavigate("login")} className="border border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-white">🌾</div>
                <span className="text-white font-bold" style={{ fontFamily: "Poppins" }}>Smart Gram Panchayat</span>
              </div>
              <p className={`text-sm max-w-xs leading-relaxed ${lang === "mr" ? "devanagari" : ""}`}>{tx.footerDesc}</p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              {["Services", "About Us", "Privacy Policy", "Contact"].map((l, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-xs text-center">
            <span className={lang === "mr" ? "devanagari" : ""}>{tx.footerRights}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
