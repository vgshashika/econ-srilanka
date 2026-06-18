import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#F5F7FA" }}>
      <div className="text-center max-w-md px-4">
        <div className="text-8xl font-black mb-2" style={{ color: "#E8820C" }}>404</div>
        <div className="text-2xl font-black mb-3" style={{ color: "#0C1E35" }}>Page Not Found</div>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="px-6 py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: "#E8820C" }}>
            ← Back to Home
          </Link>
          <Link href="/products"
            className="px-6 py-3 rounded-xl font-bold text-sm border-2"
            style={{ borderColor: "#0C1E35", color: "#0C1E35" }}>
            Browse Products
          </Link>
        </div>
        <div className="mt-10 text-2xl font-black" style={{ color: "#0C1E35" }}>
          Ecom<span style={{ color: "#E8820C" }}>Lanka</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Sri Lanka's B2B Export Marketplace</p>
      </div>
    </div>
  );
}
