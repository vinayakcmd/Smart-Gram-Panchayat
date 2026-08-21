import { useState } from "react";

interface ReportIssueProps {
  onNavigate: (page: string) => void;
  lang: "en" | "mr";
}

const categories = [
  { icon: "🗑️", en: "Garbage", mr: "कचरा" },
  { icon: "🛣️", en: "Road", mr: "रस्ता" },
  { icon: "💧", en: "Water", mr: "पाणी" },
  { icon: "🚰", en: "Drainage", mr: "नाली" },
  { icon: "💡", en: "Streetlight", mr: "दिवाबत्ती" },
  { icon: "⚡", en: "Electricity", mr: "वीज" },
  { icon: "🚽", en: "Sanitation", mr: "स्वच्छता" },
  { icon: "❓", en: "Other", mr: "इतर" },
];

export default function ReportIssue({ onNavigate, lang }: ReportIssueProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [selectedCat, setSelectedCat] = useState("");
  const [priority, setPriority] = useState("medium");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const complaintId = "GP-2024-" + Math.floor(Math.random() * 900 + 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => { setUploading(false); setStep("success"); }, 1500);
  };

  if (step === "success") {
    return (
      <div className="animate-fade-in max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins" }}>
          {lang === "mr" ? <span className="devanagari">तक्रार यशस्वीरीत्या नोंदवली!</span> : "Complaint Submitted Successfully!"}
        </h2>
        <p className={`text-gray-500 mb-6 ${lang === "mr" ? "devanagari" : ""}`}>
          {lang === "mr" ? "तुमची तक्रार ग्राम पंचायत कार्यालयाकडे पाठवली गेली आहे." : "Your complaint has been sent to the Gram Panchayat office."}
        </p>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 inline-block">
          <div className="text-sm text-green-700 mb-1">{lang === "mr" ? "तक्रार क्रमांक" : "Complaint ID"}</div>
          <div className="text-2xl font-bold text-green-800 font-mono-data">{complaintId}</div>
          <div className="text-xs text-green-600 mt-1">Save this for tracking</div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => onNavigate("tracking")} className="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors">
            {lang === "mr" ? <span className="devanagari">स्थिती पहा</span> : "Track Complaint"}
          </button>
          <button onClick={() => { setStep("form"); setTitle(""); setDesc(""); setSelectedCat(""); }} className="border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">
            {lang === "mr" ? <span className="devanagari">नवीन तक्रार</span> : "New Complaint"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">तक्रार नोंदवा</span> : "Report a Village Issue"}
      </h1>
      <p className={`text-gray-500 text-sm mb-7 ${lang === "mr" ? "devanagari" : ""}`}>
        {lang === "mr" ? "गावातील समस्या पंचायतीला कळवा" : "Notify the Panchayat about village problems"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "Poppins" }}>
            {lang === "mr" ? <span className="devanagari">श्रेणी निवडा *</span> : "Select Category *"}
          </label>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.en}
                type="button"
                onClick={() => setSelectedCat(cat.en)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all text-xs font-medium ${
                  selectedCat === cat.en
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? cat.mr : cat.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {lang === "mr" ? <span className="devanagari">तक्रारीचे शीर्षक *</span> : "Issue Title *"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lang === "mr" ? "उदा. माझ्या घरापुढे कचरा साचला आहे" : "e.g. Garbage piling up near my house"}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {lang === "mr" ? <span className="devanagari">तपशीलवार वर्णन *</span> : "Detailed Description *"}
            </label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={lang === "mr" ? "समस्येचे तपशीलवार वर्णन करा..." : "Describe the issue in detail..."}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              required
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {lang === "mr" ? <span className="devanagari">फोटो अपलोड करा</span> : "Upload Photos"}
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
            <div className="text-3xl mb-2">📷</div>
            <div className="text-sm text-gray-500">
              {lang === "mr" ? <span className="devanagari">फोटो निवडण्यासाठी येथे क्लिक करा</span> : "Click to select photos or drag & drop"}
            </div>
            <div className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB each</div>
          </div>
          <div className="flex gap-2 mt-3">
            {["Photo 1.jpg", "Photo 2.jpg"].map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-xs text-green-700">
                <span>📎</span> {p}
                <button type="button" className="text-green-400 hover:text-red-500 ml-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {lang === "mr" ? <span className="devanagari">स्थान</span> : "Location"}
          </label>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-sm font-medium text-gray-800">House No. 142, Shivaji Nagar</div>
              <div className="text-xs text-gray-500">Rahatgaon, Tal. Rahata, Dist. Ahmednagar</div>
            </div>
            <button type="button" className="ml-auto text-xs text-green-700 font-medium border border-green-300 rounded-lg px-3 py-1.5 hover:bg-green-100 transition-colors">
              Change
            </button>
          </div>
          <div className="mt-3 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            🗺️ Map View (tap to change location)
          </div>
        </div>

        {/* Priority */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {lang === "mr" ? <span className="devanagari">प्राधान्यक्रम</span> : "Priority"}
          </label>
          <div className="flex gap-3">
            {[
              { value: "low", label: "Low", label_mr: "कमी", color: "border-blue-300 bg-blue-50 text-blue-700" },
              { value: "medium", label: "Medium", label_mr: "मध्यम", color: "border-yellow-300 bg-yellow-50 text-yellow-700" },
              { value: "high", label: "High", label_mr: "जास्त", color: "border-orange-300 bg-orange-50 text-orange-700" },
              { value: "urgent", label: "Urgent", label_mr: "तातडीचे", color: "border-red-300 bg-red-50 text-red-700" },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${priority === p.value ? p.color : "border-gray-100 text-gray-500 bg-gray-50"}`}
              >
                <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? p.label_mr : p.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-colors shadow-lg flex items-center justify-center gap-2 text-sm"
        >
          {uploading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              Submitting...
            </>
          ) : (
            <><span>📢</span> <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "तक्रार सादर करा" : "Submit Complaint"}</span></>
          )}
        </button>
      </form>
    </div>
  );
}
