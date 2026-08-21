import { useState } from "react";

interface VillageNewsProps {
  lang: "en" | "mr";
}

const categories = [
  { en: "All", mr: "सर्व" },
  { en: "Announcement", mr: "घोषणा" },
  { en: "Government Scheme", mr: "सरकारी योजना" },
  { en: "Event", mr: "कार्यक्रम" },
  { en: "Water Supply", mr: "पाणीपुरवठा" },
  { en: "Road Work", mr: "रस्ता काम" },
  { en: "Emergency", mr: "आपत्कालीन" },
];

const newsItems = [
  { cat: "Announcement", cat_mr: "घोषणा", catColor: "bg-blue-100 text-blue-700", title: "Free Health Camp – 25 August 2024", title_mr: "मोफत आरोग्य शिबिर – 25 ऑगस्ट 2024", desc: "A free health camp will be organized at the Gram Panchayat office on 25 August. Blood sugar, BP, and eye checkups will be done free of charge for all residents.", desc_mr: "25 ऑगस्ट रोजी ग्राम पंचायत कार्यालयात मोफत आरोग्य शिबिर आयोजित केले जाईल. सर्व रहिवाशांसाठी रक्त शर्करा, रक्तदाब आणि नेत्रतपासणी मोफत केली जाईल.", date: "20 Aug 2024", img: "photo-1559523161-0fc0d8b12cfd" },
  { cat: "Government Scheme", cat_mr: "सरकारी योजना", catColor: "bg-purple-100 text-purple-700", title: "PM Awas Yojana Applications Now Open", title_mr: "PM आवास योजना अर्ज सुरू", desc: "Applications for PM Awas Yojana 2024-25 are now open. Eligible families can apply at the Panchayat office before 15 September 2024.", desc_mr: "PM आवास योजना 2024-25 साठी अर्ज सुरू झाले आहेत. पात्र कुटुंबे 15 सप्टेंबर 2024 पूर्वी पंचायत कार्यालयात अर्ज करू शकतात.", date: "18 Aug 2024", img: "photo-1504711434969-e33886168f5c" },
  { cat: "Road Work", cat_mr: "रस्ता काम", catColor: "bg-orange-100 text-orange-700", title: "Main Road Repair Starting Next Week", title_mr: "मुख्य रस्ता दुरुस्ती पुढच्या आठवड्यापासून", desc: "Road repair work on the Rahatgaon-Shirdi main road will commence from 26 August. Residents are advised to use alternate routes during this period.", desc_mr: "राहटगाव-शिर्डी मुख्य रस्त्यावर 26 ऑगस्टपासून दुरुस्ती काम सुरू होईल. या काळात पर्यायी मार्ग वापरण्याची विनंती आहे.", date: "15 Aug 2024", img: "photo-1449824913935-59a10b8d2000" },
  { cat: "Water Supply", cat_mr: "पाणीपुरवठा", catColor: "bg-cyan-100 text-cyan-700", title: "Water Supply Schedule – September 2024", title_mr: "पाणीपुरवठा वेळापत्रक – सप्टेंबर 2024", desc: "Water supply will be available every morning from 6 AM to 9 AM and evening from 5 PM to 7 PM during September 2024.", desc_mr: "सप्टेंबर 2024 मध्ये दररोज सकाळी 6 ते 9 आणि संध्याकाळी 5 ते 7 वाजेपर्यंत पाणी पुरवठा होईल.", date: "12 Aug 2024", img: "photo-1504711434969-e33886168f5c" },
  { cat: "Event", cat_mr: "कार्यक्रम", catColor: "bg-green-100 text-green-700", title: "Independence Day Celebration – 15 August", title_mr: "स्वातंत्र्य दिन उत्सव – 15 ऑगस्ट", desc: "The annual Independence Day celebration will be held at the village ground. Flag hoisting at 8 AM followed by cultural programs.", desc_mr: "वार्षिक स्वातंत्र्य दिन उत्सव गावाच्या मैदानावर होईल. सकाळी 8 वाजता ध्वजारोहण आणि त्यानंतर सांस्कृतिक कार्यक्रम.", date: "10 Aug 2024", img: "photo-1559523161-0fc0d8b12cfd" },
  { cat: "Emergency", cat_mr: "आपत्कालीन", catColor: "bg-red-100 text-red-700", title: "Heavy Rain Alert – Stay Safe", title_mr: "मुसळधार पाऊस इशारा – सावध राहा", desc: "IMD has issued a yellow alert for heavy rainfall in Ahmednagar district. Citizens are advised to stay indoors and avoid flood-prone areas.", desc_mr: "हवामान विभागाने अहमदनगर जिल्ह्यात मुसळधार पावसाचा पिवळा इशारा जारी केला आहे. नागरिकांनी घरात राहण्याचे आवाहन.", date: "8 Aug 2024", img: "photo-1449824913935-59a10b8d2000" },
];

export default function VillageNews({ lang }: VillageNewsProps) {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = newsItems.filter((n) => {
    const matchCat = selectedCat === "All" || n.cat === selectedCat;
    const q = search.toLowerCase();
    const matchSearch = !q || n.title.toLowerCase().includes(q) || n.title_mr.includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>
          {lang === "mr" ? <span className="devanagari">गाव बातम्या</span> : "Village News"}
        </h1>
        <div className="relative max-w-xs w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.en}
            onClick={() => setSelectedCat(cat.en)}
            className={`flex-shrink-0 text-xs font-medium px-4 py-2 rounded-xl border transition-all ${
              selectedCat === cat.en
                ? "bg-green-700 text-white border-green-700"
                : "bg-white border-gray-200 text-gray-600 hover:border-green-400"
            }`}
          >
            <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? cat.mr : cat.en}</span>
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((n, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer">
            <div className="relative">
              <img src={`https://images.unsplash.com/${n.img}?w=400&h=200&fit=crop&auto=format`} alt={n.title} className="w-full h-44 object-cover bg-green-50" />
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${n.catColor}`}>
                {lang === "mr" ? n.cat_mr : n.cat}
              </span>
            </div>
            <div className="p-5">
              <h3 className={`font-semibold text-gray-900 mb-2 leading-snug ${lang === "mr" ? "devanagari" : ""}`} style={{ fontFamily: "Poppins" }}>
                {lang === "mr" ? n.title_mr : n.title}
              </h3>
              <p className={`text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3 ${lang === "mr" ? "devanagari" : ""}`}>
                {lang === "mr" ? n.desc_mr : n.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">📅 {n.date}</span>
                <button className="text-xs text-green-700 font-semibold hover:underline">
                  {lang === "mr" ? <span className="devanagari">अधिक वाचा →</span> : "Read More →"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📰</div>
          <div className="font-medium">No news found</div>
        </div>
      )}
    </div>
  );
}
