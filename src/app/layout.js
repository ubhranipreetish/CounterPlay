import "./globals.css";
import SiteChrome from "@/components/nav/SiteChrome";
import BackendPulseProvider from "@/components/system/BackendPulseProvider";

export const metadata = {
  title: "Counterplay — Rewrite Cricket History",
  description:
    "Change one delivery in an IPL classic and simulate the alternate result with Counterplay's Monte Carlo cricket engine.",
};

// Next.js viewport config. `viewportFit: "cover"` lets the UI extend under the
// notch/home-indicator so our `env(safe-area-inset-*)` paddings can take over.
// We intentionally do NOT disable user scaling (no maximumScale/userScalable) —
// pinch-zoom must stay available for accessibility.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-dvh">
        <BackendPulseProvider>
          <SiteChrome />
          {children}
        </BackendPulseProvider>
      </body>
    </html>
  );
}
