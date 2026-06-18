import Link from "next/link";

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={s <= Math.round(rating) ? "#F59E0B" : "#E5E7EB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </span>
  );
}

export default function SupplierCard({ supplier }) {
  const isGold = supplier.badge === "Gold Supplier";

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border flex flex-col transition-all duration-200 hover:-translate-y-1"
      style={{
        borderColor: isGold ? "#F59E0B" : "#F3F4F6",
        boxShadow: isGold
          ? "0 4px 16px rgba(245,158,11,0.15)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top banner */}
      <div className={`${supplier.bg} h-20 flex items-center justify-center relative`}>
        <span className="text-5xl">{supplier.emoji}</span>
        <span
          className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
          style={
            isGold
              ? { background: "#F59E0B", color: "white" }
              : { background: "#0C1E35", color: "white" }
          }
        >
          {isGold ? "🥇" : "✅"} {supplier.badge}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-sm leading-tight mb-1" style={{ color: "#0C1E35" }}>
          {supplier.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {supplier.category} · Est. {supplier.established}
        </p>

        <p className="text-xs text-gray-600 line-clamp-2 mb-4">{supplier.description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Rating", value: supplier.rating },
            { label: "Response", value: supplier.responseTime },
            { label: "Countries", value: supplier.exportCountries + "+" },
          ].map((s) => (
            <div key={s.label} className="text-center p-2 rounded-xl" style={{ background: "#F9FAFB" }}>
              <div className="text-sm font-black" style={{ color: "#0C1E35" }}>{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={supplier.rating} />
          <span className="text-xs font-semibold" style={{ color: "#0C1E35" }}>
            {supplier.rating}
          </span>
          <span className="text-xs text-gray-400">({supplier.reviews} reviews)</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          </svg>
          {supplier.location}, Sri Lanka · {supplier.productCount} products
        </div>

        {/* Certs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {supplier.certifications.slice(0, 3).map((c) => (
            <span
              key={c}
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#FFF7ED", color: "#E8820C" }}
            >
              {c}
            </span>
          ))}
          {supplier.certifications.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F3F4F6", color: "#6B7280" }}>
              +{supplier.certifications.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/suppliers/${supplier.id}`}
          className="mt-auto block text-center py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: "#0C1E35", color: "white" }}
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
}
