import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area, CartesianGrid,
} from "recharts";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const stats = [
  { label: "Total Citizens", value: 8940, icon: "👥", bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-700" },
  { label: "Total Households", value: 3562, icon: "🏘️", bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-700" },
  { label: "New Complaints", value: 34, icon: "🆕", bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-700", sub: "This week" },
  { label: "Pending", value: 12, icon: "⏳", bg: "bg-red-500", light: "bg-red-50", text: "text-red-700" },
  { label: "In Progress", value: 8, icon: "🔄", bg: "bg-yellow-500", light: "bg-yellow-50", text: "text-yellow-700" },
  { label: "Resolved", value: 1248, icon: "✅", bg: "bg-green-600", light: "bg-green-50", text: "text-green-700", sub: "All time" },
];

const monthlyData = [
  { month: "Mar", complaints: 24, resolved: 18 },
  { month: "Apr", complaints: 31, resolved: 25 },
  { month: "May", complaints: 28, resolved: 22 },
  { month: "Jun", complaints: 45, resolved: 38 },
  { month: "Jul", complaints: 38, resolved: 30 },
  { month: "Aug", complaints: 34, resolved: 22 },
];

const categoryData = [
  { name: "Water", value: 28 },
  { name: "Road", value: 22 },
  { name: "Garbage", value: 18 },
  { name: "Electricity", value: 14 },
  { name: "Drainage", value: 10 },
  { name: "Other", value: 8 },
];

const statusData = [
  { name: "Pending", value: 12 },
  { name: "In Progress", value: 8 },
  { name: "Resolved", value: 1248 },
  { name: "Closed", value: 210 },
];

const CAT_COLORS = ["#06b6d4", "#f97316", "#22c55e", "#eab308", "#3b82f6", "#a855f7"];
const STATUS_COLORS = ["#f97316", "#eab308", "#22c55e", "#94a3b8"];

const areaData = [
  { day: "Mon", value: 4 }, { day: "Tue", value: 7 }, { day: "Wed", value: 5 },
  { day: "Thu", value: 9 }, { day: "Fri", value: 6 }, { day: "Sat", value: 3 }, { day: "Sun", value: 2 },
];

const recentComplaints = [
  { id: "GP-2024-089", citizen: "Rahul Patil", cat: "Water", date: "18 Aug", status: "In Progress", statusColor: "bg-yellow-100 text-yellow-700" },
  { id: "GP-2024-090", citizen: "Suresh Kumar", cat: "Road", date: "18 Aug", status: "Pending", statusColor: "bg-orange-100 text-orange-700" },
  { id: "GP-2024-091", citizen: "Meena Devi", cat: "Garbage", date: "17 Aug", status: "Pending", statusColor: "bg-orange-100 text-orange-700" },
  { id: "GP-2024-088", citizen: "Anil Shinde", cat: "Electricity", date: "17 Aug", status: "Resolved", statusColor: "bg-green-100 text-green-700" },
  { id: "GP-2024-087", citizen: "Priya Jadhav", cat: "Streetlight", date: "16 Aug", status: "Closed", statusColor: "bg-gray-100 text-gray-600" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-xs">
        <div className="font-semibold text-gray-700 mb-1">{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ color: p.color }} className="font-medium">{p.name}: {p.value}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Rahatgaon Gram Panchayat · 20 August 2024</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate("admin-complaints")} className="bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm">
            📋 Complaints
          </button>
          <button onClick={() => onNavigate("admin-news")} className="bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            📰 News
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`${s.light} rounded-2xl p-4 border border-opacity-50 card-hover cursor-pointer relative overflow-hidden`} style={{ borderColor: "transparent" }}>
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl ${s.bg} opacity-10`} />
            <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center text-sm mb-3 shadow-sm`}>
              <span>{s.icon}</span>
            </div>
            <div className={`text-2xl font-extrabold font-mono-data ${s.text}`}>
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs font-medium text-gray-600 mt-1">{s.label}</div>
            {s.sub && <div className="text-[10px] text-gray-400">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Monthly Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>Monthly Complaints vs Resolved</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData} barSize={10} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="complaints" name="Complaints" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded bg-blue-500 inline-block" />Complaints</div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded bg-green-500 inline-block" />Resolved</div>
          </div>
        </div>

        {/* Status Pie */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Poppins" }}>By Status</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {statusData.map((_, i) => <Cell key={i} fill={STATUS_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [v, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {statusData.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: STATUS_COLORS[i] }} />
                  <span className="text-gray-600">{s.name}</span>
                </div>
                <span className="font-mono-data font-semibold text-gray-700">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Category Pie */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Poppins" }}>By Category</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={70} dataKey="value" paddingAngle={2}>
                {categoryData.map((_, i) => <Cell key={i} fill={CAT_COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-3">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CAT_COLORS[i] }} />
                {c.name} <span className="ml-auto font-mono-data text-gray-400">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* This week area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>Daily Complaints — This Week</h2>
            <div className="text-2xl font-bold text-blue-700 font-mono-data">36</div>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Complaints" stroke="#3b82f6" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: "#3b82f6", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>Recent Complaints</h2>
          <button onClick={() => onNavigate("admin-complaints")} className="text-xs text-blue-700 font-medium hover:underline">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {["Complaint ID", "Citizen", "Category", "Date", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentComplaints.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono-data text-xs text-gray-500">{c.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{c.citizen}</td>
                  <td className="px-5 py-3.5 text-gray-600">{c.cat}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{c.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`status-badge px-2.5 py-1 rounded-lg ${c.statusColor}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => onNavigate("admin-complaints")} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors">View</button>
                      <button className="text-xs bg-yellow-50 text-yellow-700 hover:bg-yellow-100 px-2.5 py-1 rounded-lg font-medium transition-colors">Assign</button>
                      <button className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-2.5 py-1 rounded-lg font-medium transition-colors">Resolve</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing 5 of 54 complaints</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 11].map((p, i) => (
              <button key={i} className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${p === 1 ? "bg-blue-700 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
