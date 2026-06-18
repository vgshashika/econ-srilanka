"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { signIn }   = useAuth();
  const defaultTab   = searchParams.get("tab") === "register" ? "register" : "login";

  const [tab, setTab]       = useState(defaultTab);
  const [role, setRole]     = useState("buyer");    // "buyer" | "seller"
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  /* ── Login state ── */
  const [login, setLogin] = useState({ email: "", password: "", remember: false });

  /* ── Register state ── */
  const [reg, setReg] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "",
    company: "", phone: "", country: "Sri Lanka",
    agree: false,
  });

  function setL(k, v) { setLogin((f) => ({ ...f, [k]: v })); }
  function setR(k, v) { setReg((f) => ({ ...f, [k]: v })); }

  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      // TODO (Laravel): const data = await login(loginForm);
      // For now: mock a successful login with demo user
      await new Promise((r) => setTimeout(r, 800));
      signIn(
        "demo_token_123",
        {
          name: "John Silva",
          firstName: "John",
          email: login.email,
          role: "buyer",
          company: "Demo Buyer Co."
        },
        login.remember
      );
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally { setLoading(false); }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    if (reg.password !== reg.confirmPassword) {
      return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      // TODO (Laravel): const data = await register({ ...reg, role });
      await new Promise((r) => setTimeout(r, 900));
      signIn(
        "demo_token_123",
        {
          name: `${reg.firstName} ${reg.lastName}`,
          firstName: reg.firstName,
          email: reg.email,
          role,
          company: reg.company,
        },
        login.remember
      );
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally { setLoading(false); }
  }

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F7FA" }}>
      {/* Top bar */}
      <div style={{ background: "#0C1E35" }} className="py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-black"
            style={{ background: "#E8820C" }}>🇱🇰</div>
          <span className="text-white font-bold text-lg">
            <span style={{ color: "#E8820C" }}>Ecom</span>Lanka
          </span>
        </Link>
        <Link href="/" className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
            {/* Tab row */}
            <div className="flex border-b border-gray-100">
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(""); }}
                  className="flex-1 py-4 text-sm font-bold capitalize border-b-2 transition-all"
                  style={
                    tab === t
                      ? { borderColor: "#E8820C", color: "#E8820C" }
                      : { borderColor: "transparent", color: "#9CA3AF" }
                  }
                >
                  {t === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            <div className="p-8">
              {/* Login */}
              {tab === "login" && (
                <>
                  <h2 className="text-xl font-black mb-1" style={{ color: "#0C1E35" }}>Welcome back</h2>
                  <p className="text-sm text-gray-500 mb-6">Sign in to your EcomLanka account</p>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl text-sm font-medium text-red-700"
                      style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                        Email Address
                      </label>
                      <input
                        type="email" required
                        placeholder="you@company.com"
                        value={login.email}
                        onChange={(e) => setL("email", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold" style={{ color: "#374151" }}>Password</label>
                        <Link href="/forgot-password" className="text-xs" style={{ color: "#E8820C" }}>
                          Forgot password?
                        </Link>
                      </div>
                      <input
                        type="password" required
                        placeholder="••••••••"
                        value={login.password}
                        onChange={(e) => setL("password", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={login.remember}
                        onChange={(e) => setL("remember", e.target.checked)}
                        className="w-4 h-4 rounded accent-orange-500"
                      />
                      <span className="text-sm text-gray-600">Remember me for 30 days</span>
                    </label>

                    <button
                      type="submit" disabled={loading}
                      className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                      style={{ background: "#E8820C", color: "white" }}
                    >
                      {loading ? "Signing in…" : "Sign In →"}
                    </button>
                  </form>

                  <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-100"/>
                    <span className="text-xs text-gray-400">or continue with</span>
                    <div className="flex-1 h-px bg-gray-100"/>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {["🔵 Google", "🔷 LinkedIn"].map((s) => (
                      <button key={s}
                        className="py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                        style={{ color: "#374151" }}>
                        {s}
                      </button>
                    ))}
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-6">
                    New to EcomLanka?{" "}
                    <button onClick={() => setTab("register")} className="font-bold" style={{ color: "#E8820C" }}>
                      Create account
                    </button>
                  </p>
                </>
              )}

              {/* Register */}
              {tab === "register" && (
                <>
                  <h2 className="text-xl font-black mb-1" style={{ color: "#0C1E35" }}>Create your account</h2>
                  <p className="text-sm text-gray-500 mb-5">Join Sri Lanka's leading B2B marketplace</p>

                  {/* Role select */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { key: "buyer",  label: "I'm a Buyer",  desc: "Source from Sri Lanka", icon: "🛍️" },
                      { key: "seller", label: "I'm a Seller", desc: "Export my products",    icon: "🏭" },
                    ].map((r) => (
                      <button
                        key={r.key}
                        onClick={() => setRole(r.key)}
                        className="p-3 rounded-xl border-2 text-left transition-all"
                        style={role === r.key
                          ? { borderColor: "#E8820C", background: "#FFF7ED" }
                          : { borderColor: "#E5E7EB", background: "white" }}
                      >
                        <div className="text-xl mb-1">{r.icon}</div>
                        <div className="text-sm font-bold" style={{ color: "#0C1E35" }}>{r.label}</div>
                        <div className="text-xs text-gray-500">{r.desc}</div>
                      </button>
                    ))}
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl text-sm font-medium text-red-700"
                      style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>First Name *</label>
                        <input type="text" required placeholder="John" value={reg.firstName}
                          onChange={(e) => setR("firstName", e.target.value)} className={inputCls}/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>Last Name *</label>
                        <input type="text" required placeholder="Silva" value={reg.lastName}
                          onChange={(e) => setR("lastName", e.target.value)} className={inputCls}/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>Email *</label>
                      <input type="email" required placeholder="you@company.com" value={reg.email}
                        onChange={(e) => setR("email", e.target.value)} className={inputCls}/>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>
                        {role === "seller" ? "Company Name *" : "Company (optional)"}
                      </label>
                      <input type="text" required={role === "seller"} placeholder="Your Company Ltd."
                        value={reg.company} onChange={(e) => setR("company", e.target.value)} className={inputCls}/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>Password *</label>
                        <input type="password" required placeholder="Min 8 chars" value={reg.password}
                          onChange={(e) => setR("password", e.target.value)} className={inputCls}/>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1" style={{ color: "#374151" }}>Confirm *</label>
                        <input type="password" required placeholder="Repeat" value={reg.confirmPassword}
                          onChange={(e) => setR("confirmPassword", e.target.value)} className={inputCls}/>
                      </div>
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer pt-1">
                      <input type="checkbox" required checked={reg.agree}
                        onChange={(e) => setR("agree", e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded accent-orange-500"/>
                      <span className="text-xs text-gray-600">
                        I agree to the{" "}
                        <Link href="/terms" className="font-semibold" style={{ color: "#E8820C" }}>Terms of Service</Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="font-semibold" style={{ color: "#E8820C" }}>Privacy Policy</Link>
                      </span>
                    </label>

                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                      style={{ background: "#E8820C", color: "white" }}>
                      {loading ? "Creating account…" : `Create ${role === "seller" ? "Seller" : "Buyer"} Account →`}
                    </button>
                  </form>

                  <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?{" "}
                    <button onClick={() => setTab("login")} className="font-bold" style={{ color: "#E8820C" }}>
                      Sign in
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {["🔒 SSL Secured", "🇱🇰 Sri Lanka EDB", "✅ Verified Platform"].map((b) => (
              <span key={b} className="text-xs text-gray-500 font-medium">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
