export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F7FA" }}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          {[0,1,2].map(i => (
            <div key={i} className="w-3 h-3 rounded-full"
              style={{ background: "#E8820C", animation: `bounce 0.8s ${i*0.15}s infinite alternate` }}/>
          ))}
        </div>
        <p className="text-sm font-medium" style={{ color: "#0C1E35" }}>Loading…</p>
        <style>{`@keyframes bounce { to { transform: translateY(-8px); opacity: 0.4; } }`}</style>
      </div>
    </div>
  );
}
