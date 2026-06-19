"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS } from "@/lib/data";

const NAV_ITEMS = [
  { key: "overview",   label: "Overview",          icon: "📊" },
  { key: "rfqs",       label: "My RFQs",           icon: "📋" },
  { key: "inquiries",  label: "Inquiries",          icon: "💬" },
  { key: "wishlist",   label: "Saved Products",     icon: "❤️" },
  { key: "profile",    label: "Profile Settings",   icon: "👤" },
];

const MOCK_RFQS = [
  { id: "RFQ-001", product: "Organic Ceylon Cinnamon", qty: "500 kg", date: "Jun 12, 2025", status: "Active",    responses: 4 },
  { id: "RFQ-002", product: "Blue Sapphire Gemstone",  qty: "10 ct", date: "Jun 08, 2025", status: "Closed",    responses: 7 },
  { id: "RFQ-003", product: "Batik Fabric Rolls",      qty: "300 m", date: "May 29, 2025", status: "Pending",   responses: 1 },
  { id: "RFQ-004", product: "Virgin Coconut Oil",      qty: "1000 L",date: "May 20, 2025", status: "Completed", responses: 9 },
];

const MOCK_INQUIRIES = [
  { id: "INQ-001", product: "Premium BOP Tea",         supplier: "Dilmah Exports",       date: "Jun 15, 2025", status: "Replied",  unread: false },
  { id: "INQ-002", product: "Moonstone Pendant",       supplier: "Moonstone Jewellers",  date: "Jun 13, 2025", status: "Pending",  unread: true  },
  { id: "INQ-003", product: "Dumbara Woven Mats",      supplier: "Village Craft Collective",date:"Jun 10, 2025",status: "Replied",  unread: false },
  { id: "INQ-004", product: "Dried Maldive Fish",      supplier: "Lanka Marine Exports", date: "Jun 07, 2025", status: "Replied",  unread: false },
];

const STATUS_COLORS = {
  Active:     { bg: "#DCFCE7", color: "#16A34A" },
  Closed:     { bg: "#F3F4F6", color: "#6B7280" },
  Pending:    { bg: "#FEF3C7", color: "#D97706" },
  Completed:  { bg: "#EFF6FF", color: "#2563EB" },
  Replied:    { bg: "#DCFCE7", color: "#16A34A" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [wishlistIds, setWishlistIds] = useState([]);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const displayName = user?.firstName || user?.name || "there";
  const userRole = user?.role || "Buyer";
  const userCity = user?.city || user?.location || "Colombo";
  const userInitial = (user?.firstName || user?.name || "A").charAt(0).toUpperCase();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("ecom_wishlist") || "[]");
      setWishlistIds(Array.isArray(stored) ? stored : []);
    } catch {}
  }, []);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  function handleSignOut() { signOut(); router.push("/"); }
  function handleViewRFQ(id) { router.push(`/rfq/${id}`); }

  const unreadCount = MOCK_INQUIRIES.filter((i) => i.unread).length;

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
        {/* Top bar */}
        <div style={{ background: "#0C1E35" }} className="py-6">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-black text-white">My Dashboard</h1>
              <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Welcome back, {displayName} 👋
              </p>
            </div>
            <Link
              href="/rfq"
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#E8820C", color: "white" }}
            >
              + New RFQ
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar nav */}
            <aside className="hidden lg:flex flex-col w-56 flex-shrink-0">
              <div
                className="bg-white rounded-2xl p-3 sticky top-24"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                {/* User info */}
                <div className="flex items-center gap-3 p-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg"
                    style={{ background: "#E8820C" }}
                  >
                    {userInitial}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "#0C1E35" }}>{user?.name || user?.firstName || "My Account"}</p>
                    <p className="text-xs text-gray-400 truncate">{userRole} · {userCity}</p>
                  </div>
                </div>

                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 text-left"
                    style={activeTab === item.key
                      ? { background: "#FFF7ED", color: "#E8820C" }
                      : { color: "#6B7280" }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    {item.key === "inquiries" && unreadCount > 0 && (
                      <span className="ml-auto text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ background: "#E8820C" }}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Active RFQs",   value: 2,  icon: "📋", color: "#E8820C" },
                      { label: "Pending Replies",value: 3, icon: "💬", color: "#3B82F6" },
                      { label: "Saved Products", value: 8, icon: "❤️", color: "#EF4444" },
                      { label: "Orders Placed",  value: 1, icon: "📦", color: "#10B981" },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-2xl p-5"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        <div className="text-2xl mb-2">{s.icon}</div>
                        <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent RFQs */}
                  <div className="bg-white rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                      <h3 className="font-bold" style={{ color: "#0C1E35" }}>Recent RFQs</h3>
                      <button onClick={() => setActiveTab("rfqs")}
                        className="text-xs font-semibold" style={{ color: "#E8820C" }}>
                        View All →
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead style={{ background: "#F9FAFB" }}>
                          <tr>
                            {["RFQ ID", "Product", "Quantity", "Date", "Responses", "Status"].map((h) => (
                              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {MOCK_RFQS.slice(0, 3).map((rfq) => (
                            <tr key={rfq.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-xs font-mono text-gray-500">{rfq.id}</td>
                              <td className="px-4 py-3 font-medium" style={{ color: "#0C1E35" }}>{rfq.product}</td>
                              <td className="px-4 py-3 text-gray-600">{rfq.qty}</td>
                              <td className="px-4 py-3 text-gray-500">{rfq.date}</td>
                              <td className="px-4 py-3">
                                <span className="font-bold" style={{ color: "#E8820C" }}>{rfq.responses}</span>
                                <span className="text-gray-400 text-xs"> quotes</span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                  style={STATUS_COLORS[rfq.status]}>
                                  {rfq.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Post New RFQ",    href: "/rfq",       icon: "📋", desc: "Get quotes from suppliers" },
                      { label: "Browse Products", href: "/products",   icon: "🛍️", desc: "Source from Sri Lanka" },
                      { label: "Find Suppliers",  href: "/suppliers",  icon: "🏢", desc: "Explore verified exporters" },
                    ].map((a) => (
                      <Link key={a.label} href={a.href}
                        className="bg-white rounded-2xl p-5 flex flex-col gap-2 hover:-translate-y-1 transition-transform"
                        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        <span className="text-2xl">{a.icon}</span>
                        <span className="font-bold text-sm" style={{ color: "#0C1E35" }}>{a.label}</span>
                        <span className="text-xs text-gray-500">{a.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* RFQs tab */}
              {activeTab === "rfqs" && (
                <div className="bg-white rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
                    <h3 className="font-bold text-lg" style={{ color: "#0C1E35" }}>My RFQs</h3>
                    <Link href="/rfq"
                      className="px-4 py-2 rounded-xl text-xs font-bold"
                      style={{ background: "#E8820C", color: "white" }}>
                      + New RFQ
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead style={{ background: "#F9FAFB" }}>
                        <tr>
                          {["RFQ ID", "Product", "Quantity", "Date", "Responses", "Status", ""].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {MOCK_RFQS.map((rfq) => (
                          <tr key={rfq.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 text-xs font-mono text-gray-500">{rfq.id}</td>
                            <td className="px-4 py-4 font-medium" style={{ color: "#0C1E35" }}>{rfq.product}</td>
                            <td className="px-4 py-4 text-gray-600">{rfq.qty}</td>
                            <td className="px-4 py-4 text-gray-500">{rfq.date}</td>
                            <td className="px-4 py-4 font-bold" style={{ color: "#E8820C" }}>{rfq.responses}</td>
                            <td className="px-4 py-4">
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                style={STATUS_COLORS[rfq.status]}>{rfq.status}</span>
                            </td>
                            <td className="px-4 py-4">
                              <button
                                onClick={() => handleViewRFQ(rfq.id)}
                                className="text-xs font-semibold" style={{ color: "#E8820C" }}>
                                View →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Inquiries tab */}
              {activeTab === "inquiries" && (
                <div className="space-y-3">
                  {MOCK_INQUIRIES.map((inq) => (
                    <div key={inq.id}
                      className="bg-white rounded-2xl p-5 flex items-center gap-4"
                      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: inq.unread ? "3px solid #E8820C" : "3px solid transparent" }}>
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-lg flex-shrink-0">
                        💬
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-sm truncate" style={{ color: "#0C1E35" }}>{inq.product}</p>
                          {inq.unread && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                              style={{ background: "#E8820C" }}>New</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{inq.supplier} · {inq.date}</p>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                        style={STATUS_COLORS[inq.status]}>{inq.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Wishlist tab */}
              {activeTab === "wishlist" && (
                wishlistProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-5xl mb-4">❤️</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#0C1E35" }}>Your Saved Products</h3>
                    <p className="text-sm text-gray-500 mb-5">Start saving products from the marketplace</p>
                    <Link href="/products"
                      className="inline-block px-6 py-3 rounded-xl text-sm font-bold"
                      style={{ background: "#E8820C", color: "white" }}>
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {wishlistProducts.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        <p className="text-xs text-gray-500">{p.category}</p>
                        <h4 className="font-bold mt-1" style={{ color: "#0C1E35" }}>{p.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{p.price} {p.unit}</p>
                        <Link href={`/products/${p.id}`} className="inline-block mt-3 text-sm font-semibold" style={{ color: "#E8820C" }}>
                          View Product →
                        </Link>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* Profile tab */}
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <h3 className="text-lg font-black mb-6" style={{ color: "#0C1E35" }}>Profile Settings</h3>
                  <div className="space-y-5 max-w-lg">
                    {[
                      { label: "First Name", value: user?.firstName || "", type: "text" },
                      { label: "Last Name",  value: user?.lastName || user?.name?.split(" ").slice(1).join(" ") || "", type: "text" },
                      { label: "Email",      value: user?.email || "", type: "email" },
                      { label: "Company",    value: user?.company || "", type: "text" },
                      { label: "Phone",      value: user?.phone || "", type: "tel" },
                      { label: "Country",    value: user?.country || user?.city || "", type: "text" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="block text-xs font-semibold mb-1.5 text-gray-700">{f.label}</label>
                        <input type={f.type} value={f.value}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"/>
                      </div>
                    ))}
                    <button
                      className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                      style={{ background: "#E8820C", color: "white" }}>
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
