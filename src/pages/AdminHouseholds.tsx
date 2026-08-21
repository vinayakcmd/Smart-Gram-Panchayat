import { useState } from "react";

const households = [
  { id: "HH-2024-0142", house: "142", head: "Rahul Patil", mobile: "98765-43210", members: 5, ward: "Ward 3", address: "Shivaji Nagar, Rahatgaon" },
  { id: "HH-2024-0198", house: "198", head: "Suresh Kumar", mobile: "97654-32100", members: 4, ward: "Ward 1", address: "Gandhi Chowk, Rahatgaon" },
  { id: "HH-2024-0056", house: "56", head: "Meena Devi", mobile: "99012-34567", members: 3, ward: "Ward 2", address: "Ambedkar Nagar, Rahatgaon" },
  { id: "HH-2024-0312", house: "312", head: "Anil Shinde", mobile: "98654-32100", members: 6, ward: "Ward 4", address: "Bhima Colony, Rahatgaon" },
  { id: "HH-2024-0089", house: "89", head: "Priya Jadhav", mobile: "97832-10945", members: 2, ward: "Ward 2", address: "New Colony, Rahatgaon" },
  { id: "HH-2024-0421", house: "421", head: "Ramesh More", mobile: "96543-21098", members: 7, ward: "Ward 5", address: "Jijamata Nagar, Rahatgaon" },
];

export default function AdminHouseholds() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof households[0] | null>(null);

  const filtered = households.filter((h) => {
    const q = search.toLowerCase();
    return !q || h.id.toLowerCase().includes(q) || h.house.includes(q) || h.head.toLowerCase().includes(q) || h.mobile.includes(q);
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>Household Management</h1>
          <p className="text-gray-500 text-sm">{households.length} households registered</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors">
          + Register Household
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="grid sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, house no., name, or mobile..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <select className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>All Wards</option>
            <option>Ward 1</option>
            <option>Ward 2</option>
            <option>Ward 3</option>
            <option>Ward 4</option>
            <option>Ward 5</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center">
            📥 Export CSV
          </button>
        </div>
      </div>

      <div className={`grid ${selected ? "lg:grid-cols-2" : "grid-cols-1"} gap-5`}>
        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {["Household ID", "House No.", "Head of Family", "Mobile", "Members", "Ward", "Action"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((h, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelected(h)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === h.id ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-3 font-mono-data text-xs text-green-700 font-semibold">{h.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">#{h.house}</td>
                    <td className="px-4 py-3 text-gray-700">{h.head}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono-data text-xs">{h.mobile}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-bold inline-flex items-center justify-center">{h.members}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{h.ward}</td>
                    <td className="px-4 py-3">
                      <button onClick={(e) => { e.stopPropagation(); setSelected(h); }} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <div className="text-3xl mb-2">🏘️</div>
              <div className="text-sm">No households found</div>
            </div>
          )}
          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Showing {filtered.length} of {households.length} households</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button key={p} className={`w-7 h-7 rounded-lg text-xs font-medium ${p === 1 ? "bg-blue-700 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in">
            <div className="p-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <div className="font-mono-data font-bold text-green-700 text-lg">{selected.id}</div>
                <div className="text-gray-500 text-sm">{selected.address}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "House Number", value: `#${selected.house}` },
                  { label: "Ward", value: selected.ward },
                  { label: "Head of Family", value: selected.head },
                  { label: "Mobile", value: selected.mobile },
                  { label: "Total Members", value: String(selected.members) },
                  { label: "Status", value: "Active" },
                ].map((info, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 mb-0.5">{info.label}</div>
                    <div className="font-semibold text-gray-800 text-sm">{info.value}</div>
                  </div>
                ))}
              </div>

              {/* QR Code Preview */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-center">
                <div className="text-xs text-green-700 font-semibold mb-3">Household QR Code</div>
                <div className="inline-block p-3 bg-white border-2 border-green-600 rounded-xl mb-3">
                  <svg viewBox="0 0 80 80" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" fill="white"/>
                    <rect x="4" y="4" width="24" height="24" fill="#15803d"/>
                    <rect x="8" y="8" width="16" height="16" fill="white"/>
                    <rect x="10" y="10" width="12" height="12" fill="#15803d"/>
                    <rect x="52" y="4" width="24" height="24" fill="#15803d"/>
                    <rect x="56" y="8" width="16" height="16" fill="white"/>
                    <rect x="58" y="10" width="12" height="12" fill="#15803d"/>
                    <rect x="4" y="52" width="24" height="24" fill="#15803d"/>
                    <rect x="8" y="56" width="16" height="16" fill="white"/>
                    <rect x="10" y="58" width="12" height="12" fill="#15803d"/>
                    {[32,36,40,44,48,32,40,36,48,32,36,44,48,40,36,32,44].map((x, i) => (
                      <rect key={i} x={x} y={28 + (i % 4) * 8} width="4" height="4" fill="#15803d"/>
                    ))}
                  </svg>
                </div>
                <div className="font-mono-data text-xs text-gray-500">{selected.id} · {selected.address.split(",")[0]}</div>
                <div className="flex gap-2 justify-center mt-3">
                  <button className="text-xs bg-green-700 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-green-800 transition-colors">⬇️ Download</button>
                  <button className="text-xs border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">🖨️ Print</button>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-xl text-sm hover:bg-blue-100 transition-colors">Edit Household</button>
                <button className="flex-1 py-2.5 bg-purple-50 text-purple-700 font-semibold rounded-xl text-sm hover:bg-purple-100 transition-colors">View Members</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
