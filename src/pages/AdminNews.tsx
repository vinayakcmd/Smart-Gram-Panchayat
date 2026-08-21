import { useState } from "react";

interface AdminNewsProps {}

type NewsStatus = "Published" | "Draft";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  status: NewsStatus;
  img: string;
  body: string;
}

const initialNews: NewsItem[] = [
  { id: 1, title: "Free Health Camp – 25 August 2024", category: "Announcement", date: "20 Aug 2024", status: "Published", img: "photo-1559523161-0fc0d8b12cfd", body: "A free health camp will be organized at the Gram Panchayat office on 25 August. Blood sugar, BP, and eye checkups will be done free of charge." },
  { id: 2, title: "PM Awas Yojana Applications Now Open", category: "Government Scheme", date: "18 Aug 2024", status: "Published", img: "photo-1504711434969-e33886168f5c", body: "Applications for PM Awas Yojana 2024-25 are now open. Eligible families can apply at the Panchayat office before 15 September 2024." },
  { id: 3, title: "Main Road Repair Starting Next Week", category: "Road Work", date: "15 Aug 2024", status: "Draft", img: "photo-1449824913935-59a10b8d2000", body: "Road repair work on the Rahatgaon-Shirdi main road will commence from 26 August." },
  { id: 4, title: "Heavy Rain Alert – Stay Safe", category: "Emergency", date: "8 Aug 2024", status: "Published", img: "photo-1559523161-0fc0d8b12cfd", body: "IMD has issued a yellow alert for heavy rainfall in Ahmednagar district." },
];

const categories = ["Announcement", "Government Scheme", "Event", "Water Supply", "Road Work", "Emergency"];

const statusStyle: Record<NewsStatus, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-gray-100 text-gray-600",
};

export default function AdminNews({}: AdminNewsProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [form, setForm] = useState({ title: "", category: categories[0], body: "" });

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", category: categories[0], body: "" });
    setShowEditor(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setForm({ title: item.title, category: item.category, body: item.body });
    setShowEditor(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setNews(n => n.map(item => item.id === editing.id ? { ...item, ...form } : item));
    } else {
      const newItem: NewsItem = {
        id: Date.now(),
        title: form.title,
        category: form.category,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        status: "Draft",
        img: "photo-1504711434969-e33886168f5c",
        body: form.body,
      };
      setNews(n => [newItem, ...n]);
    }
    setShowEditor(false);
  };

  const toggleStatus = (id: number) => {
    setNews(n => n.map(item => item.id === id ? { ...item, status: item.status === "Published" ? "Draft" : "Published" } : item));
  };

  const handleDelete = (id: number) => {
    setNews(n => n.filter(item => item.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>News Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{news.filter(n => n.status === "Published").length} published · {news.filter(n => n.status === "Draft").length} drafts</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm">
          + Add News
        </button>
      </div>

      {/* Editor Panel */}
      {showEditor && (
        <div className="bg-white rounded-2xl border border-blue-200 p-6 animate-fade-in shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>{editing ? "Edit News" : "Add New Article"}</h2>
            <button onClick={() => setShowEditor(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Article title..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cover Image (URL or upload)</label>
              <div className="flex gap-2">
                <input placeholder="Image URL or leave blank" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50">📎</button>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Article Body *</label>
              <textarea
                rows={5}
                value={form.body}
                onChange={(e) => setForm(f => ({ ...f, body: e.target.value }))}
                placeholder="Write the full article content here..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-800 transition-colors">
              {editing ? "Save Changes" : "Save as Draft"}
            </button>
            {!editing && (
              <button onClick={() => { handleSave(); /* publish */ }} className="bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-green-800 transition-colors">
                Publish Now
              </button>
            )}
            <button onClick={() => setShowEditor(false)} className="border border-gray-200 text-gray-600 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* News List */}
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-start gap-4 p-5">
              <img
                src={`https://images.unsplash.com/${item.img}?w=96&h=72&fit=crop&auto=format`}
                alt={item.title}
                className="w-24 h-18 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                style={{ height: 72 }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{item.category}</span>
                    <span className={`status-badge px-2.5 py-0.5 rounded-full font-medium ${statusStyle[item.status]}`}>{item.status}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm" style={{ fontFamily: "Poppins" }}>{item.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{item.body}</p>
              </div>
            </div>
            <div className="px-5 pb-4 flex gap-2 border-t border-gray-50 pt-3">
              <button onClick={() => openEdit(item)} className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">
                ✏️ Edit
              </button>
              <button
                onClick={() => toggleStatus(item.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${item.status === "Published" ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
              >
                {item.status === "Published" ? "📤 Unpublish" : "✅ Publish"}
              </button>
              {deleteConfirm === item.id ? (
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-red-600">Sure?</span>
                  <button onClick={() => handleDelete(item.id)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-red-700 transition-colors">Delete</button>
                  <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 hover:text-gray-700 px-2">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(item.id)} className="ml-auto text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-medium transition-colors">
                  🗑️ Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
