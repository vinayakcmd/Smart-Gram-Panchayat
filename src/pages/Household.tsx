import { useState } from "react";

interface HouseholdProps {
  lang: "en" | "mr";
}

const members = [
  { name: "Rahul Patil", name_mr: "राहुल पाटील", age: 38, gender: "Male", relation: "Head of Family", relation_mr: "कुटुंब प्रमुख", avatar: "रा" },
  { name: "Sunita Patil", name_mr: "सुनिता पाटील", age: 34, gender: "Female", relation: "Spouse", relation_mr: "पत्नी", avatar: "सु" },
  { name: "Arjun Patil", name_mr: "अर्जुन पाटील", age: 16, gender: "Male", relation: "Son", relation_mr: "मुलगा", avatar: "अ" },
  { name: "Priya Patil", name_mr: "प्रिया पाटील", age: 12, gender: "Female", relation: "Daughter", relation_mr: "मुलगी", avatar: "प्र" },
  { name: "Ramabai Patil", name_mr: "रमाबाई पाटील", age: 68, gender: "Female", relation: "Mother", relation_mr: "आई", avatar: "र" },
];

export default function Household({ lang }: HouseholdProps) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">माझे कुटुंब</span> : "My Household"}
      </h1>

      {/* Household Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gov-gradient flex items-center justify-center text-white text-2xl shadow">🏠</div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg" style={{ fontFamily: "Poppins" }}>Patil Residence</h2>
              <div className="text-sm text-gray-500">House No. 142, Shivaji Nagar</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Household ID</div>
            <div className="font-mono-data font-bold text-green-700 text-lg">HH-2024-0142</div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "House Number", label_mr: "घर क्रमांक", value: "142" },
            { label: "Village", label_mr: "गाव", value: "Rahatgaon" },
            { label: "Ward", label_mr: "वॉर्ड", value: "Ward 3" },
            { label: "Members", label_mr: "सदस्य", value: "5" },
          ].map((info, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3">
              <div className={`text-xs text-gray-400 mb-1 ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? info.label_mr : info.label}</div>
              <div className="font-semibold text-gray-800">{info.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Family Members */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins" }}>
            {lang === "mr" ? <span className="devanagari">कुटुंब सदस्य ({members.length})</span> : `Family Members (${members.length})`}
          </h2>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-green-800 transition-colors">
            + {lang === "mr" ? <span className="devanagari">सदस्य जोडा</span> : "Add Member"}
          </button>
        </div>

        {showAdd && (
          <div className="p-6 bg-green-50 border-b border-green-100 animate-fade-in">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">Add New Family Member</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Full Name" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              <input placeholder="Age" type="number" className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
              <select className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                <option>Relationship</option>
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Parent</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="bg-green-700 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:bg-green-800 transition-colors">Save</button>
              <button onClick={() => setShowAdd(false)} className="text-gray-500 font-semibold px-5 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {members.map((m, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 card-hover">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-700 text-white flex items-center justify-center font-bold text-base devanagari">{m.avatar}</div>
                <div>
                  <div className={`font-semibold text-gray-900 ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? m.name_mr : m.name}</div>
                  <div className={`text-xs text-green-700 font-medium ${lang === "mr" ? "devanagari" : ""}`}>{lang === "mr" ? m.relation_mr : m.relation}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">Age {m.age}</span>
                <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium">{m.gender}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
