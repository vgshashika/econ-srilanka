import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const UPCOMING = [
  { id:1, name:"Lanka Export Expo 2025",        date:"Sep 15–18, 2025", location:"BMICH, Colombo",    cat:"Multi-Industry",  emoji:"🏛️", spots:120, badge:"Flagship" },
  { id:2, name:"Ceylon Tea & Spice World",      date:"Oct 4–6, 2025",   location:"Kandy, Sri Lanka",  cat:"Food & Beverage", emoji:"🫖", spots:60,  badge:"Popular" },
  { id:3, name:"Sri Lanka Gem & Jewellery Fair",date:"Oct 22–24, 2025", location:"Ratnapura",         cat:"Gems & Jewelry",  emoji:"💎", spots:80,  badge:"Upcoming" },
  { id:4, name:"Lanka Textile & Apparel Expo",  date:"Nov 7–9, 2025",   location:"Colombo",           cat:"Apparel",         emoji:"👗", spots:45,  badge:"Upcoming" },
  { id:5, name:"EcomLanka Digital Trade Forum", date:"Nov 21, 2025",    location:"Virtual + Colombo", cat:"B2B / Tech",      emoji:"💻", spots:200, badge:"Virtual" },
  { id:6, name:"Handicraft & Arts of Lanka",    date:"Dec 3–5, 2025",   location:"Galle Fort",        cat:"Handicrafts",     emoji:"🏺", spots:35,  badge:"Upcoming" },
];

const PAST = [
  { name:"Lanka Export Expo 2024", date:"Sep 2024", attendees:"3,400+", emoji:"🏛️" },
  { name:"Ceylon Tea World 2024",  date:"Oct 2024", attendees:"1,200+", emoji:"🫖" },
  { name:"Gem Fair 2024",          date:"Nov 2024", attendees:"800+",   emoji:"💎" },
];

const BADGE_COLORS = {
  Flagship: { bg:"#FFF7ED", color:"#E8820C" },
  Popular:  { bg:"#DCFCE7", color:"#16A34A" },
  Virtual:  { bg:"#EFF6FF", color:"#2563EB" },
  Upcoming: { bg:"#F3F4F6", color:"#6B7280" },
};

export default function TradeShowsPage() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <div className="py-14 text-center px-4 text-white"
        style={{ background: "linear-gradient(135deg,#0C1E35,#1E3A5F)" }}>
        <div className="text-4xl mb-3">🏛️</div>
        <h1 className="text-3xl font-black mb-3">Trade Shows & Export Events</h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
          Meet verified Sri Lankan exporters face-to-face at industry events.
          Register early — spots fill fast.
        </p>
      </div>

      {/* Upcoming events */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black mb-8" style={{ color: "#0C1E35" }}>
          Upcoming Events 2025
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {UPCOMING.map(({ id, name, date, location, cat, emoji, spots, badge }) => {
            const bc = BADGE_COLORS[badge] || BADGE_COLORS.Upcoming;
            return (
              <div key={id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-4 p-5">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ background: "#F5F7FA" }}>
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded"
                        style={{ background: bc.bg, color: bc.color }}>
                        {badge}
                      </span>
                      <span className="text-[11px] text-gray-400">{cat}</span>
                    </div>
                    <h3 className="font-bold text-sm leading-tight" style={{ color: "#0C1E35" }}>{name}</h3>
                    <div className="text-xs text-gray-500 mt-1">📅 {date}</div>
                    <div className="text-xs text-gray-500">📍 {location}</div>
                  </div>
                </div>
                <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{spots} exhibitor spots</span>
                  <Link href={`/contact?topic=Trade+Shows&event=${name}`}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white"
                    style={{ background: "#E8820C" }}>
                    Register Interest
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past events */}
      <div className="py-12" style={{ background: "#F5F7FA" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-black mb-6" style={{ color: "#0C1E35" }}>Past Events</h2>
          <div className="grid grid-cols-3 gap-5">
            {PAST.map(({ name, date, attendees, emoji }) => (
              <div key={name} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
                <div className="text-4xl mb-3">{emoji}</div>
                <div className="font-bold text-sm" style={{ color: "#0C1E35" }}>{name}</div>
                <div className="text-xs text-gray-400 mt-1">{date}</div>
                <div className="text-sm font-black mt-2" style={{ color: "#E8820C" }}>{attendees} attendees</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 text-center px-4 text-white" style={{ background: "#0C1E35" }}>
        <h2 className="text-xl font-black mb-2">Want to Exhibit at Our Events?</h2>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
          Showcase your products to hundreds of international buyers. Limited booths available.
        </p>
        <Link href="/contact?topic=Trade+Shows"
          className="inline-block px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: "#E8820C", color: "white" }}>
          Apply to Exhibit →
        </Link>
      </div>

      <Footer />
    </>
  );
}
