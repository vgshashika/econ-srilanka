import Link from "next/link";

// crumbs = [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: "Current Page" }]
export default function Breadcrumb({ crumbs = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#9CA3AF" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLast ? (
              <span className="font-medium truncate max-w-xs" style={{ color: "#0C1E35" }}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:underline transition-colors duration-150"
                style={{ color: "#E8820C" }}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
