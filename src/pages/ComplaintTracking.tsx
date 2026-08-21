interface ComplaintTrackingProps {
  lang: "en" | "mr";
}

const complaints = [
  {
    id: "GP-2024-089",
    cat: "Water",
    cat_mr: "पाणी",
    title: "No water supply for 3 days",
    title_mr: "3 दिवसांपासून पाणी नाही",
    location: "House No. 142, Shivaji Nagar",
    date: "18 August 2024",
    status: "In Progress",
    assignedTo: "Suresh Mane (Water Dept.)",
    remarks: "Team has been dispatched to inspect the pipeline. Issue expected to be resolved within 48 hours.",
    img: "photo-1504711434969-e33886168f5c",
    timeline: [
      { stage: "Reported", done: true, date: "18 Aug, 10:30 AM" },
      { stage: "Assigned", done: true, date: "18 Aug, 2:15 PM" },
      { stage: "In Progress", done: true, date: "19 Aug, 9:00 AM" },
      { stage: "Resolved", done: false, date: "" },
      { stage: "Closed", done: false, date: "" },
    ],
  },
  {
    id: "GP-2024-076",
    cat: "Road",
    cat_mr: "रस्ता",
    title: "Large pothole near school",
    title_mr: "शाळेजवळ मोठा खड्डा",
    location: "Main Road near Zilla Parishad School",
    date: "14 August 2024",
    status: "Pending",
    assignedTo: "Unassigned",
    remarks: "Under review by Panchayat.",
    img: "photo-1449824913935-59a10b8d2000",
    timeline: [
      { stage: "Reported", done: true, date: "14 Aug, 4:00 PM" },
      { stage: "Assigned", done: false, date: "" },
      { stage: "In Progress", done: false, date: "" },
      { stage: "Resolved", done: false, date: "" },
      { stage: "Closed", done: false, date: "" },
    ],
  },
];

const statusColor: Record<string, string> = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Pending": "bg-orange-100 text-orange-700",
  "Resolved": "bg-green-100 text-green-700",
  "Closed": "bg-gray-100 text-gray-600",
};

export default function ComplaintTracking({ lang }: ComplaintTrackingProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">माझ्या तक्रारी</span> : "My Complaints"}
      </h1>

      {complaints.map((c, ci) => (
        <div key={ci} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            <img
              src={`https://images.unsplash.com/${c.img}?w=400&h=300&fit=crop&auto=format`}
              alt={c.title}
              className="w-full h-48 md:h-full object-cover bg-gray-100"
            />
            <div className="md:col-span-2 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono-data text-gray-400">{c.id}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {lang === "mr" ? c.cat_mr : c.cat}
                    </span>
                  </div>
                  <h3 className={`font-bold text-gray-900 text-lg ${lang === "mr" ? "devanagari" : ""}`} style={{ fontFamily: "Poppins" }}>
                    {lang === "mr" ? c.title_mr : c.title}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">📍 {c.location}</div>
                  <div className="text-sm text-gray-400 mt-0.5">📅 Reported: {c.date}</div>
                </div>
                <span className={`status-badge px-3 py-1.5 rounded-xl font-semibold ${statusColor[c.status]}`}>
                  {c.status}
                </span>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-0 mb-5 overflow-x-auto pb-1">
                {c.timeline.map((stage, si) => (
                  <div key={si} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        stage.done ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-300 text-gray-400"
                      }`}>
                        {stage.done ? "✓" : si + 1}
                      </div>
                      <div className={`text-[10px] mt-1 whitespace-nowrap font-medium ${stage.done ? "text-green-700" : "text-gray-400"}`}>{stage.stage}</div>
                      {stage.date && <div className="text-[9px] text-gray-400">{stage.date}</div>}
                    </div>
                    {si < c.timeline.length - 1 && (
                      <div className={`w-8 sm:w-12 h-0.5 mt-[-14px] ${c.timeline[si + 1].done || stage.done ? "bg-green-500" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Assigned + Remarks */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                  <div className="text-xs font-semibold text-blue-700 mb-1">👤 Assigned To</div>
                  <div className="text-sm text-gray-700">{c.assignedTo}</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                  <div className="text-xs font-semibold text-gray-600 mb-1">💬 Panchayat Remarks</div>
                  <div className="text-sm text-gray-700">{c.remarks}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
