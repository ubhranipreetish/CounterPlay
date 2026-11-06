"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBackendPulse } from "@/components/system/BackendPulseProvider";

const NAV_ITEMS = [
  { href: "/matches", label: "Match archives" },
  { href: "/historic", label: "Historic" },
  { href: "/arena", label: "Arena" },
];

/**
 * Persistent, mobile-first top navigation shared across the browsing pages
 * (landing, match browser, historic moments). Immersive flows (simulation,
 * arena) render their own purpose-built chrome instead — see SiteChrome.
 */
export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const { status } = useBackendPulse();
  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="cp-header sticky top-0 z-50 pt-safe">
      <nav className="mx-auto flex h-16 max-w-[1340px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label="CounterPlay home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="brand-pulse" aria-hidden="true" />
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-white sm:text-base">
            Counterplay
          </span>
          <svg className="hidden text-[#46b485] sm:block" width="42" height="18" viewBox="0 0 46 20" fill="none" aria-hidden="true">
            <path d="M0 10H14L18 3L23 17L27 10H46" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="48" className="ecg-line" />
          </svg>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-lg border px-3.5 font-mono text-[12px] tracking-[0.03em] transition-all ${
                  active
                    ? "border-white/10 bg-white/[0.05] text-white"
                    : "border-transparent text-[#9aa3b2] hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <span className={`engine-status engine-status--${status} cp-header__mobile-status`} role="status" aria-live="polite">
          <span className="engine-status__dot" />
          {status === "ready" ? "Online" : status === "waking" ? "Waking" : "Offline"}
        </span>
      </nav>

      <nav className="mobile-dock flex md:hidden" aria-label="Primary navigation">
        {[{ href: "/", label: "Home" }, ...NAV_ITEMS].map((item) => {
          const active = item.href === "/" ? pathname === "/" : isActive(item.href);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={active ? "is-active" : ""}>
              <span className="mobile-dock__mark" aria-hidden="true" />
              {item.label === "Match archives" ? "Matches" : item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
