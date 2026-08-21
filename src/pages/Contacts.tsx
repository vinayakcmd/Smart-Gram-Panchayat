interface ContactsProps {
  lang: "en" | "mr";
}

const contacts = [
  { icon: "🏛️", name: "Gram Panchayat Office", name_mr: "ग्राम पंचायत कार्यालय", service: "General Services", service_mr: "सामान्य सेवा", phone: "02167-223456", color: "bg-green-50 border-green-100" },
  { icon: "👤", name: "Sarpanch – Ramesh Patil", name_mr: "सरपंच – रमेश पाटील", service: "Village Head", service_mr: "ग्राम प्रमुख", phone: "98765-43210", color: "bg-blue-50 border-blue-100" },
  { icon: "🧑‍💼", name: "Gram Sevak – Anita Desai", name_mr: "ग्राम सेवक – अनिता देसाई", service: "Administrative", service_mr: "प्रशासन", phone: "98234-56789", color: "bg-purple-50 border-purple-100" },
  { icon: "👩‍⚕️", name: "Health Worker – Savita More", name_mr: "आरोग्य कर्मचारी – सविता मोरे", service: "Health Services", service_mr: "आरोग्य सेवा", phone: "99012-34567", color: "bg-pink-50 border-pink-100" },
  { icon: "🚑", name: "Ambulance", name_mr: "रुग्णवाहिका", service: "Emergency Medical", service_mr: "आपत्कालीन वैद्यकीय", phone: "108", color: "bg-red-50 border-red-100" },
  { icon: "🚔", name: "Police – Rahatgaon Chowki", name_mr: "पोलीस – राहटगाव चौकी", service: "Law & Order", service_mr: "कायदा व सुव्यवस्था", phone: "100", color: "bg-indigo-50 border-indigo-100" },
  { icon: "🚒", name: "Fire Brigade", name_mr: "अग्निशमन दल", service: "Fire Emergency", service_mr: "अग्नि आपत्कालीन", phone: "101", color: "bg-orange-50 border-orange-100" },
  { icon: "⚡", name: "Electrician – Vijay Shinde", name_mr: "इलेक्ट्रिशियन – विजय शिंदे", service: "Electrical Repairs", service_mr: "विद्युत दुरुस्ती", phone: "98654-32100", color: "bg-yellow-50 border-yellow-100" },
  { icon: "🔧", name: "Plumber – Mohan Jadhav", name_mr: "प्लंबर – मोहन जाधव", service: "Water & Plumbing", service_mr: "पाणी व प्लंबिंग", phone: "97832-10945", color: "bg-cyan-50 border-cyan-100" },
];

export default function Contacts({ lang }: ContactsProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">महत्त्वाचे संपर्क</span> : "Important Contacts"}
      </h1>

      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-3xl">🆘</div>
        <div className="flex-1">
          <div className="font-semibold text-red-800 text-sm">Emergency Numbers</div>
          <div className="text-red-600 text-xs mt-0.5">Ambulance: 108 · Police: 100 · Fire: 101 · Disaster: 1078</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((c, i) => (
          <div key={i} className={`rounded-2xl border p-5 card-hover ${c.color}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">{c.icon}</div>
              <a href={`tel:${c.phone}`} className="w-9 h-9 rounded-xl bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors text-sm shadow-sm">📞</a>
            </div>
            <h3 className={`font-semibold text-gray-900 mb-1 text-sm leading-snug ${lang === "mr" ? "devanagari" : ""}`} style={{ fontFamily: "Poppins" }}>
              {lang === "mr" ? c.name_mr : c.name}
            </h3>
            <div className={`text-xs text-gray-500 mb-3 ${lang === "mr" ? "devanagari" : ""}`}>
              {lang === "mr" ? c.service_mr : c.service}
            </div>
            <div className="font-mono-data font-semibold text-green-700">{c.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
