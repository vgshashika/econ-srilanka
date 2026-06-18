"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F7FA" }}>
      <div className="text-center max-w-md px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-black mb-2" style={{ color: "#0C1E35" }}>Something went wrong</h2>
        <p className="text-sm text-gray-500 mb-6">{error?.message || "An unexpected error occurred."}</p>
        <button onClick={reset}
          className="px-6 py-3 rounded-xl text-white font-bold text-sm"
          style={{ background: "#E8820C" }}>
          Try Again
        </button>
      </div>
    </div>
  );
}
