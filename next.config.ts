import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;
const supabaseOrigin = supabaseHostname ? `https://${supabaseHostname}` : "";

// Moderate, pragmatic CSP: blocks unrelated third-party scripts/frames/
// connections while allowing what this app actually needs (Next.js inline
// hydration scripts, Supabase for data/images, self-hosted next/font
// fonts). 'unsafe-inline' on script/style is a deliberate tradeoff — a
// strict nonce-based CSP would require reworking middleware and carries
// real risk of breaking hydration; this still meaningfully restricts
// object/frame embedding and third-party exfiltration targets.
// Next.js/React use eval() in development only (Fast Refresh, stack-trace
// reconstruction) — never in production, per React's own runtime warning.
// Without this, `npm run dev` breaks with a CSP eval error; production is
// unaffected either way, so keep it dev-only rather than weakening prod.
const scriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${supabaseOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin}`.trim(),
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
