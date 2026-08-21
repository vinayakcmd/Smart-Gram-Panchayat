import { useState } from "react";
import { useEffect } from "react";
import { api } from "../lib/api";

interface ProfileProps {
  lang: "en" | "mr";
}

export default function Profile({ lang }: ProfileProps) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Rahul Patil",
    name_mr: "राहुल पाटील",
    mobile: "+91 98765 43210",
    email: "rahul.patil@gmail.com",
    dob: "1986-03-15",
    gender: "Male",
    aadhaar: "XXXX-XXXX-4521",
    occupation: "Farmer",
  });

  useEffect(() => {
    api.me().then((user) => setForm((current) => ({ ...current, name: user.name || current.name, name_mr: user.nameMr || current.name_mr, mobile: user.mobile || current.mobile, email: user.email || current.email }))).catch(() => undefined);
  }, []);

  const handleSave = async () => {
    try {
      await api.updateMe({ name: form.name, email: form.email, mobile: form.mobile });
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaved(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">माझी प्रोफाइल</span> : "My Profile"}
      </h1>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
          <span className="text-green-600 text-xl">✅</span>
          <span className="text-green-700 font-medium text-sm">Profile updated successfully!</span>
        </div>
      )}

      {/* Avatar + Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-green-700 text-white flex items-center justify-center text-3xl font-bold devanagari shadow-lg">रा</div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center text-sm hover:bg-gray-50">✏️</button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
              {lang === "mr" ? <span className="devanagari">{form.name_mr}</span> : form.name}
            </h2>
            <div className="text-sm text-gray-500 mt-0.5">{form.mobile}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">✅ Verified Citizen</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">🏠 HH-2024-0142</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{form.occupation}</span>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${editing ? "bg-gray-100 text-gray-600" : "bg-green-700 text-white hover:bg-green-800"}`}
          >
            {editing ? "Cancel" : "✏️ Edit"}
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-5" style={{ fontFamily: "Poppins" }}>
          {lang === "mr" ? <span className="devanagari">वैयक्तिक माहिती</span> : "Personal Information"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", label_mr: "पूर्ण नाव", field: "name", value: form.name },
            { label: "Mobile Number", label_mr: "मोबाइल नंबर", field: "mobile", value: form.mobile },
            { label: "Email", label_mr: "ईमेल", field: "email", value: form.email },
            { label: "Date of Birth", label_mr: "जन्मतारीख", field: "dob", value: form.dob, type: "date" },
            { label: "Gender", label_mr: "लिंग", field: "gender", value: form.gender, type: "select", options: ["Male", "Female", "Other"] },
            { label: "Occupation", label_mr: "व्यवसाय", field: "occupation", value: form.occupation },
          ].map((f, i) => (
            <div key={i}>
              <label className={`text-xs font-semibold text-gray-500 mb-1.5 block ${lang === "mr" ? "devanagari" : ""}`}>
                {lang === "mr" ? f.label_mr : f.label}
              </label>
              {editing ? (
                f.type === "select" ? (
                  <select
                    value={(form as any)[f.field]}
                    onChange={(e) => setForm(fm => ({ ...fm, [f.field]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {f.options!.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type || "text"}
                    value={(form as any)[f.field]}
                    onChange={(e) => setForm(fm => ({ ...fm, [f.field]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                )
              ) : (
                <div className="px-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-800 border border-gray-100">{f.value}</div>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={handleSave} className="mt-5 bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-green-800 transition-colors">
            Save Changes
          </button>
        )}
      </div>

      {/* Aadhaar & Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-5" style={{ fontFamily: "Poppins" }}>Identity & Documents</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm shadow">🪪</div>
            <div>
              <div className="text-xs text-blue-700 font-semibold">Aadhaar Card</div>
              <div className="font-mono-data text-sm font-bold text-gray-800">{form.aadhaar}</div>
              <div className="text-xs text-green-600 mt-0.5">✅ Verified</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-400 flex items-center justify-center text-white text-sm shadow">📋</div>
            <div>
              <div className="text-xs text-gray-500 font-semibold">Ration Card</div>
              <div className="font-mono-data text-sm font-bold text-gray-800">MH-RHT-0142</div>
              <div className="text-xs text-green-600 mt-0.5">✅ Linked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Household Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Poppins" }}>Household Summary</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Household ID", value: "HH-2024-0142", icon: "🏠" },
            { label: "House No.", value: "142", icon: "🔢" },
            { label: "Family Members", value: "5", icon: "👨‍👩‍👧‍👦" },
          ].map((s, i) => (
            <div key={i} className="text-center bg-green-50 rounded-2xl p-4">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-bold text-gray-900 font-mono-data text-sm">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Poppins" }}>Account Security</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Change Password</div>
                <div className="text-xs text-gray-400">Last changed 3 months ago</div>
              </div>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">📱</span>
              <div>
                <div className="text-sm font-semibold text-gray-800">Change Mobile Number</div>
                <div className="text-xs text-gray-400">+91 98765 43210 (verified)</div>
              </div>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
