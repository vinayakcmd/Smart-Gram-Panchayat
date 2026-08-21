interface QRCodeProps {
  lang: "en" | "mr";
}

export default function QRCode({ lang }: QRCodeProps) {
  return (
    <div className="animate-fade-in max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center" style={{ fontFamily: "Poppins" }}>
        {lang === "mr" ? <span className="devanagari">माझा QR कोड</span> : "My QR Code"}
      </h1>
      <p className={`text-gray-500 text-sm text-center mb-8 ${lang === "mr" ? "devanagari" : ""}`}>
        {lang === "mr"
          ? "ग्राम पंचायत सेवांसाठी तुमचे घर ओळखण्यासाठी हा QR कोड वापरा."
          : "Use this QR code to identify your household for Gram Panchayat services."}
      </p>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center">
        {/* QR Code SVG */}
        <div className="inline-block p-4 bg-white border-4 border-green-700 rounded-2xl mb-6 shadow-inner">
          <svg viewBox="0 0 200 200" className="w-48 h-48" xmlns="http://www.w3.org/2000/svg">
            {/* QR Pattern - simplified visual representation */}
            <rect width="200" height="200" fill="white"/>
            {/* Corner squares */}
            <rect x="10" y="10" width="60" height="60" fill="#15803d"/>
            <rect x="18" y="18" width="44" height="44" fill="white"/>
            <rect x="26" y="26" width="28" height="28" fill="#15803d"/>
            <rect x="130" y="10" width="60" height="60" fill="#15803d"/>
            <rect x="138" y="18" width="44" height="44" fill="white"/>
            <rect x="146" y="26" width="28" height="28" fill="#15803d"/>
            <rect x="10" y="130" width="60" height="60" fill="#15803d"/>
            <rect x="18" y="138" width="44" height="44" fill="white"/>
            <rect x="26" y="146" width="28" height="28" fill="#15803d"/>
            {/* Data cells */}
            {[
              [80,10],[90,10],[100,10],[110,10],
              [80,20],[100,20],[110,20],
              [80,30],[90,30],[110,30],
              [80,40],[90,40],[100,40],
              [80,50],[100,50],[110,50],
              [80,60],[90,60],[100,60],[110,60],
              [10,80],[20,80],[40,80],[50,80],[60,80],[70,80],[90,80],[110,80],[130,80],[140,80],[160,80],[170,80],[180,80],[190,80],
              [10,90],[30,90],[50,90],[70,90],[90,90],[110,90],[130,90],[150,90],[170,90],[190,90],
              [10,100],[20,100],[40,100],[60,100],[80,100],[100,100],[120,100],[140,100],[160,100],[180,100],
              [10,110],[30,110],[50,110],[80,110],[100,110],[130,110],[150,110],[170,110],[190,110],
              [10,120],[20,120],[50,120],[70,120],[90,120],[110,120],[140,120],[160,120],[180,120],
              [80,130],[90,130],[100,130],[120,130],[140,130],[160,130],[180,130],
              [80,140],[100,140],[110,140],[130,140],[150,140],[170,140],[190,140],
              [80,150],[90,150],[110,150],[130,150],[150,150],[170,150],
              [80,160],[100,160],[120,160],[140,160],[160,160],[180,160],[190,160],
              [80,170],[90,170],[110,170],[130,170],[150,170],[170,170],
              [80,180],[90,180],[100,180],[110,180],[130,180],[150,180],[170,180],[190,180],
              [80,190],[100,190],[120,190],[140,190],[160,190],[180,190],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="8" height="8" fill="#15803d"/>
            ))}
          </svg>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">Household ID</span>
            <span className="font-mono-data font-bold text-green-700 text-lg">HH-2024-0142</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">House No.</span>
            <span className="font-semibold text-gray-800">142, Shivaji Nagar</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">Village</span>
            <span className="font-semibold text-gray-800">Rahatgaon</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-400">Registered</span>
            <span className="font-mono-data text-sm text-gray-600">15 Jan 2024</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors text-sm">
            <span>⬇️</span>
            <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "डाउनलोड QR" : "Download QR"}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            <span>🖨️</span>
            <span className={lang === "mr" ? "devanagari" : ""}>{lang === "mr" ? "प्रिंट QR" : "Print QR"}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
        <div className="text-blue-700 text-sm">
          <span className="font-semibold">ℹ️ How to use: </span>
          {lang === "mr" ? (
            <span className="devanagari">हा QR कोड ग्राम पंचायत कार्यालयात स्कॅन करा जेणेकरून तुमचे घर त्वरित ओळखले जाईल.</span>
          ) : (
            "Show this QR code at the Gram Panchayat office to instantly identify your household for any service."
          )}
        </div>
      </div>
    </div>
  );
}
