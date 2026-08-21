import { useEffect, useState } from "react";
import { api, type Application } from "../lib/api";

interface DocumentServicesProps {
  lang: "en" | "mr";
}

const services = [
  { icon: "👶", name: "Birth Certificate", name_mr: "जन्म प्रमाणपत्र", desc: "Apply for official birth certificate for newborns or for records", desc_mr: "नवजात अर्भकांसाठी किंवा नोंदींसाठी अधिकृत जन्म प्रमाणपत्र", fee: "₹50", days: "7 days" },
  { icon: "⚰️", name: "Death Certificate", name_mr: "मृत्यू प्रमाणपत्र", desc: "Official death certificate for legal and financial procedures", desc_mr: "कायदेशीर आणि आर्थिक प्रक्रियांसाठी अधिकृत मृत्यू प्रमाणपत्र", fee: "₹50", days: "7 days" },
  { icon: "🏠", name: "Residence Certificate", name_mr: "निवास प्रमाणपत्र", desc: "Proof of residence in the village for various official purposes", desc_mr: "विविध अधिकृत उद्देशांसाठी गावातील निवासाचा पुरावा", fee: "₹30", days: "5 days" },
  { icon: "💰", name: "Income Certificate", name_mr: "उत्पन्न प्रमाणपत्र", desc: "Annual income certificate for scholarships and government schemes", desc_mr: "शिष्यवृत्ती आणि सरकारी योजनांसाठी वार्षिक उत्पन्न प्रमाणपत्र", fee: "₹30", days: "5 days" },
  { icon: "🌱", name: "No Objection Certificate", name_mr: "ना हरकत प्रमाणपत्र", desc: "NOC for construction, business, or other activities in the village", desc_mr: "गावातील बांधकाम, व्यवसाय किंवा इतर उपक्रमांसाठी ना हरकत", fee: "₹100", days: "10 days" },
  { icon: "📜", name: "Caste Certificate", name_mr: "जात प्रमाणपत्र", desc: "Village-level recommendation letter for caste certificate", desc_mr: "जात प्रमाणपत्रासाठी गाव पातळीवरील शिफारस पत्र", fee: "₹20", days: "3 days" },
];

export default function DocumentServices({ lang }: DocumentServicesProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"services" | "track">("services");
  const [applications, setApplications] = useState<Application[]>([]);
  const [purpose, setPurpose] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.applications().then(setApplications).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Unable to load applications"));
  }, []);

  const handleApply = (name: string) => {
    setSelectedService(name);
    setShowForm(true);
    setSubmitted(false);
    setActiveTab("services");
    window.scrollTo(0, 0);
  };

  if (showForm && !submitted) {
    return (
      <div className="animate-fade-in max-w-xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">←</button>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>Apply: {selectedService}</h1>
        </div>

        <form onSubmit={async (e) => { e.preventDefault(); setError(""); try { const application = await api.createApplication(selectedService, purpose); setSubmittedId(application.id); setApplications((current) => [application, ...current]); setSubmitted(true); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Unable to submit application"); } }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Applicant Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Full Name</label>
                <input defaultValue="Rahul Patil" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Mobile Number</label>
                <input defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Household ID</label>
                <input defaultValue="HH-2024-0142" readOnly className="w-full px-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-500" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Document Type</label>
                <input value={selectedService} readOnly className="w-full px-4 py-2.5 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Purpose / Reason</label>
              <textarea rows={3} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="State the purpose for this document..." required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 text-sm mb-4">Upload Supporting Documents</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-green-400 transition-colors">
              <div className="text-2xl mb-2">📎</div>
              <div className="text-sm text-gray-500">Click to upload Aadhaar, Ration Card, or other required documents</div>
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-2xl transition-colors shadow-lg text-sm">
            Submit Application
          </button>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">{error}</p>}
        </form>
      </div>
    );
  }

  if (showForm && submitted) {
    return (
      <div className="animate-fade-in max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">📄</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "Poppins" }}>Application Submitted!</h2>
        <p className="text-gray-500 mb-6">Your {selectedService} application has been received and is under review.</p>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 inline-block mb-8">
          <div className="text-sm text-green-700 mb-1">Application ID</div>
          <div className="text-2xl font-bold text-green-800 font-mono-data">{submittedId}</div>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setShowForm(false); setActiveTab("track"); }} className="bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition-colors">Track Application</button>
          <button onClick={() => setShowForm(false)} className="border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Back to Services</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">दस्तऐवज सेवा</span> : "Document Services"}
      </h1>

      {/* Tab */}
      <div className="flex bg-gray-100 rounded-xl p-1 w-fit">
        <button onClick={() => setActiveTab("services")} className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${activeTab === "services" ? "bg-white shadow text-green-700" : "text-gray-500"}`}>
          📄 Services
        </button>
        <button onClick={() => setActiveTab("track")} className={`text-sm font-semibold px-5 py-2 rounded-lg transition-all ${activeTab === "track" ? "bg-white shadow text-green-700" : "text-gray-500"}`}>
          📊 My Applications
        </button>
      </div>

      {activeTab === "services" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 card-hover flex flex-col">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className={`font-bold text-gray-900 mb-2 ${lang === "mr" ? "devanagari" : ""}`} style={{ fontFamily: "Poppins" }}>
                {lang === "mr" ? s.name_mr : s.name}
              </h3>
              <p className={`text-gray-500 text-sm leading-relaxed mb-5 flex-1 ${lang === "mr" ? "devanagari" : ""}`}>
                {lang === "mr" ? s.desc_mr : s.desc}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">Fee: <strong className="text-gray-700">{s.fee}</strong></span>
                <span className="text-xs text-gray-400">⏱ {s.days}</span>
              </div>
              <button onClick={() => handleApply(s.name)} className="w-full py-2.5 bg-green-700 text-white font-semibold rounded-xl text-sm hover:bg-green-800 transition-colors">
                {lang === "mr" ? <span className="devanagari">अर्ज करा</span> : "Apply Now"}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "track" && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-800">My Applications</h2>
          {applications.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-mono-data text-gray-400 mb-1">{a.id}</div>
                  <div className={`font-semibold text-gray-900 ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? a.type_mr : a.type}</div>
                  <div className="text-xs text-gray-400 mt-1">Submitted: {new Date(a.created_at).toLocaleDateString()}</div>
                </div>
                <span className="status-badge px-3 py-1.5 rounded-xl font-semibold flex-shrink-0 bg-yellow-100 text-yellow-700">{a.status}</span>
              </div>
              {/* Mini timeline */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["Submitted", "Under Review", "Approved"].map((stage, si) => {
                  const active = a.status === "Approved" ? si <= 2 : a.status === "Under Review" ? si <= 1 : si === 0;
                  return (
                    <div key={si} className="flex items-center flex-shrink-0">
                      <div className={`flex flex-col items-center`}>
                        <div className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border-2 ${active ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-300 text-gray-400"}`}>
                          {active ? "✓" : si + 1}
                        </div>
                        <div className={`text-[10px] mt-1 ${active ? "text-green-700 font-medium" : "text-gray-400"}`}>{stage}</div>
                      </div>
                      {si < 2 && <div className={`w-8 h-0.5 mt-[-12px] ${active && si < (a.status === "Approved" ? 2 : a.status === "Under Review" ? 1 : 0) ? "bg-green-500" : "bg-gray-200"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
