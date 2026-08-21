import { useState } from "react";

interface AdminComplaintsProps {
  lang?: string;
}

const complaints = [
  {
    id: "GP-2024-089",
    citizen: "Rahul Patil",
    mobile: "98765-43210",
    household: "HH-2024-0142",
    cat: "Water",
    title: "No water supply for 3 days",
    location: "House No. 142, Shivaji Nagar",
    date: "18 August 2024",
    status: "In Progress",
    assignedTo: "Suresh Mane",
    priority: "High",
    priorityColor: "text-orange-600 bg-orange-50",
    remarks: "Team has been dispatched to inspect the pipeline.",
    img: "photo-1504711434969-e33886168f5c",
  },
  {
    id: "GP-2024-090",
    citizen: "Suresh Kumar",
    mobile: "97654-32100",
    household: "HH-2024-0198",
    cat: "Road",
    title: "Large pothole near school",
    location: "Main Road near ZP School",
    date: "18 August 2024",
    status: "Pending",
    assignedTo: "Unassigned",
    priority: "Medium",
    priorityColor: "text-yellow-600 bg-yellow-50",
    remarks: "",
    img: "photo-1449824913935-59a10b8d2000",
  },
];

const statusOptions = ["Pending", "Assigned", "In Progress", "Resolved", "Closed"];

const statusColor: Record<string, string> = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Pending": "bg-orange-100 text-orange-700",
  "Resolved": "bg-green-100 text-green-700",
  "Closed": "bg-gray-100 text-gray-600",
  "Assigned": "bg-blue-100 text-blue-700",
};

export default function AdminComplaints({}: AdminComplaintsProps) {
  const [selected, setSelected] = useState<typeof complaints[0] | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(complaints.map((c) => [c.id, c.status]))
  );
  const [remarks, setRemarks] = useState<Record<string, string>>(
    Object.fromEntries(complaints.map((c) => [c.id, c.remarks]))
  );
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? complaints : complaints.filter((c) => statuses[c.id] === filter);

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>Complaint Management</h1>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Pending", "In Progress", "Resolved", "Closed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-4 py-2 rounded-xl border transition-all ${filter === f ? "bg-blue-700 text-white border-blue-700" : "bg-white border-gray-200 text-gray-600 hover:border-blue-400"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={`grid ${selected ? "lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
        {/* List */}
        <div className="space-y-4">
          {filtered.map((c, i) => (
            <div
              key={i}
              onClick={() => setSelected(c)}
              className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all ${selected?.id === c.id ? "border-blue-400 shadow-md" : "border-gray-100 card-hover"}`}
            >
              <div className="flex items-start gap-4">
                <img src={`https://images.unsplash.com/${c.img}?w=80&h=80&fit=crop&auto=format`} alt="" className="w-16 h-16 rounded-xl object-cover bg-gray-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs font-mono-data text-gray-400">{c.id}</span>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.cat}</span>
                    </div>
                    <span className={`status-badge px-2.5 py-1 rounded-lg flex-shrink-0 ${statusColor[statuses[c.id]]}`}>{statuses[c.id]}</span>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm truncate">{c.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">👤 {c.citizen} · 📍 {c.location}</div>
                  <div className="text-xs text-gray-400 mt-0.5">📅 {c.date}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={(e) => { e.stopPropagation(); setSelected(c); }} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors">View Details</button>
                <button onClick={(e) => { e.stopPropagation(); setStatuses(s => ({ ...s, [c.id]: "In Progress" })); }} className="text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 px-3 py-1.5 rounded-lg font-medium transition-colors">In Progress</button>
                <button onClick={(e) => { e.stopPropagation(); setStatuses(s => ({ ...s, [c.id]: "Resolved" })); }} className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg font-medium transition-colors">Resolve</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
              <div className="text-3xl mb-2">📋</div>
              <div>No complaints found</div>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in">
            <div className="relative">
              <img src={`https://images.unsplash.com/${selected.img}?w=600&h=200&fit=crop&auto=format`} alt="" className="w-full h-40 object-cover bg-gray-100" />
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-xl shadow flex items-center justify-center text-gray-500 hover:bg-gray-50">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-data text-sm text-gray-400">{selected.id}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{selected.cat}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selected.priorityColor}`}>{selected.priority}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "Poppins" }}>{selected.title}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Citizen</div>
                  <div className="font-semibold text-gray-800 text-sm">{selected.citizen}</div>
                  <div className="text-xs text-gray-500">{selected.mobile}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400 mb-1">Household</div>
                  <div className="font-mono-data font-semibold text-green-700 text-sm">{selected.household}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                  <div className="text-xs text-gray-400 mb-1">Location</div>
                  <div className="font-medium text-gray-800 text-sm">📍 {selected.location}</div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatuses(s => ({ ...s, [selected.id]: st }))}
                      className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${statuses[selected.id] === st ? "bg-blue-700 text-white border-blue-700" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400"}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assigned */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Assign To</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option>Suresh Mane (Water Dept.)</option>
                  <option>Ramesh Pawar (Road Dept.)</option>
                  <option>Vijay Shinde (Electrician)</option>
                  <option>Mohan Jadhav (Plumber)</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Admin Remarks</label>
                <textarea
                  rows={3}
                  value={remarks[selected.id]}
                  onChange={(e) => setRemarks(r => ({ ...r, [selected.id]: e.target.value }))}
                  placeholder="Add remarks or update notes..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-colors text-sm">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
