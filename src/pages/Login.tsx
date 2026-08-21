import { useState } from "react";

interface LoginProps {
  onNavigate: (page: string) => void;
  lang: "en" | "mr";
}

export default function Login({ onNavigate, lang }: LoginProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate(isAdmin ? "admin" : "dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Left Panel */}
        <div className="hero-gradient p-10 flex flex-col justify-between hidden md:flex">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🌾</div>
              <div>
                <div className="text-white font-bold text-lg" style={{ fontFamily: "Poppins" }}>Smart Gram Panchayat</div>
                <div className="text-green-300 text-sm devanagari">राहटगाव, महाराष्ट्र</div>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-snug" style={{ fontFamily: "Poppins" }}>
              Digital Governance<br />for Every Citizen
            </h2>
            <p className="text-blue-200 text-sm leading-relaxed">
              Access Gram Panchayat services, report village issues, and track your complaints — all from your phone.
            </p>
          </div>
          <div className="space-y-3 mt-8">
            {[
              { icon: "📋", text: "Report & track village complaints" },
              { icon: "📄", text: "Apply for certificates online" },
              { icon: "🏠", text: "Manage household information" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="text-lg">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <img
              src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=200&fit=crop&auto=format"
              alt="Village digital services"
              className="rounded-2xl w-full h-36 object-cover opacity-70"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6 md:hidden">
            <div className="w-10 h-10 rounded-xl gov-gradient flex items-center justify-center text-white">🌾</div>
            <div className="font-bold text-gray-900" style={{ fontFamily: "Poppins" }}>Smart Gram Panchayat</div>
          </div>

          {/* Tab Switch */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsAdmin(false)}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${!isAdmin ? "bg-white shadow text-green-700" : "text-gray-500"}`}
            >
              🏘️ Citizen Login
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              className={`flex-1 text-sm font-semibold py-2 rounded-lg transition-all ${isAdmin ? "bg-white shadow text-blue-700" : "text-gray-500"}`}
            >
              🛡️ Admin Login
            </button>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "Poppins" }}>
            {isAdmin ? "Admin Portal" : "Welcome Back"}
          </h3>
          <p className="text-gray-500 text-sm mb-7">
            {isAdmin ? "Panchayat staff & officials only" : "Login with your registered mobile number"}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {isAdmin ? "Admin ID / Email" : "Mobile Number / User ID"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  {isAdmin ? "👤" : "📱"}
                </span>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={isAdmin ? "admin@rahatgaon.gov.in" : "+91 98765 43210"}
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-green-600 rounded"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-green-700 hover:underline font-medium">Forgot Password?</button>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white text-sm transition-all shadow-md ${isAdmin ? "bg-blue-700 hover:bg-blue-800" : "bg-green-700 hover:bg-green-800"} disabled:opacity-70`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Logging in...
                </span>
              ) : (
                `Login as ${isAdmin ? "Admin" : "Citizen"}`
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">Don&apos;t have an account? </span>
            <button className="text-sm text-green-700 font-semibold hover:underline">Register here</button>
          </div>

          <div className="mt-4 text-center">
            <button onClick={() => onNavigate("landing")} className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 mx-auto">
              ← Back to homepage
            </button>
          </div>

          {/* Demo hint */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
            <strong>Demo:</strong> Click login to enter the {isAdmin ? "Admin Dashboard" : "Citizen Dashboard"} directly.
          </div>
        </div>
      </div>
    </div>
  );
}
