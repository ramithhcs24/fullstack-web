function svgToDataUri(svg) {
  // Use UTF-8 encoding so this works across browsers.
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function makeTechCardSvg({ title, accentA, accentB, icon }) {
  const safeTitle = String(title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const iconSvg = (() => {
    switch (icon) {
      case "rocket":
        return `<path d="M215 115c55-25 120-25 165 0-10 25-28 54-52 78-24 24-53 42-78 52-25-45-25-110 0-165Z" fill="rgba(255,255,255,0.85)"/><circle cx="290" cy="175" r="18" fill="rgba(17,24,39,0.65)"/>`;
      case "future":
        return `<path d="M170 250h260l-70-70 30-30-20-20-30 30-70-70-100 100 20 20Z" fill="rgba(255,255,255,0.85)"/><rect x="185" y="250" width="230" height="22" rx="11" fill="rgba(17,24,39,0.55)"/>`;
      case "legacy":
        return `<path d="M270 120c-60 0-110 50-110 110s50 110 110 110 110-50 110-110-50-110-110-110Z" fill="rgba(255,255,255,0.12)"/><path d="M270 150v75l55 30" stroke="rgba(255,255,255,0.9)" stroke-width="12" stroke-linecap="round"/><path d="M185 245h170" stroke="rgba(17,24,39,0.55)" stroke-width="14" stroke-linecap="round"/>`;
      case "blocks":
        return `<rect x="175" y="140" width="95" height="95" rx="18" fill="rgba(255,255,255,0.18)"/><rect x="270" y="140" width="95" height="95" rx="18" fill="rgba(255,255,255,0.28)"/><rect x="175" y="235" width="190" height="120" rx="22" fill="rgba(255,255,255,0.18)"/><path d="M200 285h140" stroke="rgba(17,24,39,0.55)" stroke-width="14" stroke-linecap="round"/>`;
      case "book":
        return `<path d="M195 145c55-20 120-20 175 0v210c-55-20-120-20-175 0V145Z" fill="rgba(255,255,255,0.18)"/><path d="M240 185h70M240 220h70M240 255h70" stroke="rgba(255,255,255,0.75)" stroke-width="10" stroke-linecap="round"/>`;
      case "calendar":
        return `<rect x="200" y="150" width="200" height="230" rx="26" fill="rgba(255,255,255,0.16)"/><rect x="200" y="180" width="200" height="22" rx="11" fill="rgba(17,24,39,0.55)"/><path d="M240 235h120M240 275h90" stroke="rgba(255,255,255,0.75)" stroke-width="12" stroke-linecap="round"/>`;
      case "shield":
        return `<path d="M290 130 200 165v80c0 70 45 110 90 125 45-15 90-55 90-125v-80l-90-35Z" fill="rgba(255,255,255,0.18)"/><path d="M262 260l20 20 48-58" stroke="rgba(255,255,255,0.9)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
      case "cap":
        return `<path d="M200 195 290 150l90 45-90 45-90-45Z" fill="rgba(255,255,255,0.22)"/><path d="M240 215v90c0 15 100 15 100 0v-90" fill="rgba(255,255,255,0.12)"/><path d="M250 225c20 12 70 12 90 0" stroke="rgba(255,255,255,0.75)" stroke-width="10" stroke-linecap="round"/>`;
      case "timeline":
        return `<path d="M220 290c70-120 90-140 200-150" stroke="rgba(255,255,255,0.85)" stroke-width="14" stroke-linecap="round"/><circle cx="220" cy="290" r="18" fill="rgba(17,24,39,0.6)"/><circle cx="290" cy="205" r="14" fill="rgba(255,255,255,0.75)"/><circle cx="420" cy="140" r="18" fill="rgba(17,24,39,0.6)"/>`;
      case "recruit":
        return `<path d="M210 320c10-55 55-95 110-95s100 40 110 95" fill="rgba(255,255,255,0.12)"/><circle cx="320" cy="230" r="38" fill="rgba(255,255,255,0.22)"/><rect x="235" y="165" width="160" height="40" rx="20" fill="rgba(17,24,39,0.55)"/>`;
      case "code":
        return `<path d="M220 185 180 225l40 40" stroke="rgba(255,255,255,0.85)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="M320 185 360 225l-40 40" stroke="rgba(255,255,255,0.85)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><rect x="260" y="200" width="90" height="50" rx="18" fill="rgba(17,24,39,0.55)"/>`;
      case "briefcase":
        return `<path d="M240 200c0-25 20-45 45-45h70c25 0 45 20 45 45v170c0 20-15 35-35 35H275c-20 0-35-15-35-35V200Z" fill="rgba(255,255,255,0.16)"/><path d="M290 155v45h60v-45" fill="rgba(17,24,39,0.45)"/><path d="M245 255h150" stroke="rgba(255,255,255,0.75)" stroke-width="12" stroke-linecap="round"/>`;
      case "network":
        return `<circle cx="240" cy="210" r="18" fill="rgba(255,255,255,0.75)"/><circle cx="320" cy="150" r="18" fill="rgba(17,24,39,0.6)"/><circle cx="400" cy="210" r="18" fill="rgba(255,255,255,0.75)"/><circle cx="320" cy="310" r="18" fill="rgba(17,24,39,0.6)"/><path d="M255 220 305 168M335 168 385 220M255 220 305 292M385 220 335 292" stroke="rgba(255,255,255,0.85)" stroke-width="10" stroke-linecap="round"/>`;
      case "award":
        return `<path d="M290 150c-55 0-100 45-100 100s45 100 100 100 100-45 100-100-45-100-100-100Z" fill="rgba(255,255,255,0.12)"/><path d="M290 215l18 40 44 6-32 30 8 44-38-20-38 20 8-44-32-30 44-6 18-40Z" fill="rgba(255,255,255,0.65)"/><rect x="235" y="320" width="110" height="18" rx="9" fill="rgba(17,24,39,0.55)"/>`;
      case "community":
        return `<path d="M250 305c-10-60 40-120 70-120 30 0 80 60 70 120-10 55-50 80-70 80s-60-25-70-80Z" fill="rgba(255,255,255,0.16)"/><path d="M315 305c0 18-10 34-25 40" stroke="rgba(255,255,255,0.85)" stroke-width="10" stroke-linecap="round"/><path d="M200 270c25-10 45-10 65 0" stroke="rgba(17,24,39,0.55)" stroke-width="14" stroke-linecap="round"/><path d="M380 270c-25-10-45-10-65 0" stroke="rgba(17,24,39,0.55)" stroke-width="14" stroke-linecap="round"/>`;
      case "pin":
        return `<path d="M320 150c-55 0-100 45-100 100 0 70 100 200 100 200s100-130 100-200c0-55-45-100-100-100Z" fill="rgba(255,255,255,0.16)"/><circle cx="320" cy="250" r="30" fill="rgba(255,255,255,0.75)"/><rect x="255" y="330" width="130" height="18" rx="9" fill="rgba(17,24,39,0.55)"/>`;
      case "office":
        return `<rect x="220" y="170" width="200" height="230" rx="26" fill="rgba(255,255,255,0.16)"/><rect x="245" y="195" width="90" height="90" rx="18" fill="rgba(17,24,39,0.55)"/><path d="M355 205h65M355 245h65M355 285h65" stroke="rgba(255,255,255,0.75)" stroke-width="12" stroke-linecap="round"/>`;
      case "support":
        return `<path d="M245 290c10-55 45-95 95-95s85 40 95 95c5 30-15 55-45 55h-100c-30 0-50-25-45-55Z" fill="rgba(255,255,255,0.16)"/><circle cx="340" cy="235" r="26" fill="rgba(17,24,39,0.6)"/><path d="M275 320c25 20 95 20 120 0" stroke="rgba(255,255,255,0.85)" stroke-width="12" stroke-linecap="round"/>`;
      default:
        return `<rect x="240" y="180" width="120" height="160" rx="28" fill="rgba(255,255,255,0.2)"/>`;
    }
  })();

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 700 400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accentA}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${accentB}" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accentB}" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="${accentA}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>

  <rect width="700" height="400" rx="26" fill="url(#bg)"/>

  <!-- soft glow corners -->
  <circle cx="120" cy="80" r="80" fill="url(#glow)" opacity="0.9"/>
  <circle cx="610" cy="340" r="95" fill="url(#glow)" opacity="0.75"/>

  <!-- circuit lines -->
  <g opacity="0.35" stroke="white" stroke-width="3" stroke-linecap="round">
    <path d="M70 120h130l30-35h90l25 25h120"/>
    <path d="M80 250h160l20 20h140l40-40h120"/>
    <path d="M120 330h160l30-30h130"/>
  </g>

  <!-- icon -->
  <g transform="translate(0,0)">
    ${iconSvg}
  </g>

  <!-- title -->
  <g>
    <text x="50" y="70" font-size="22" fill="rgba(255,255,255,0.92)" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
      TECH @ ${safeTitle.toUpperCase()}
    </text>
    <text x="50" y="100" font-size="14" fill="rgba(255,255,255,0.75)" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial">
      Built for clarity • fast learning • real outcomes
    </text>
  </g>
</svg>
  `.trim();

  return svgToDataUri(svg);
}

function getCardImage(title) {
  const text = String(title || "").trim().toLowerCase();

  // Deterministic tech-themed images for your requested card titles.
  // Using inline SVG avoids external-image failures and guarantees images render.
  const CARD_IMAGES = {
    "our mission": { accentA: "#4f46e5", accentB: "#22c55e", icon: "rocket" },
    "our vision": { accentA: "#7c3aed", accentB: "#06b6d4", icon: "future" },
    "our legacy": { accentA: "#f97316", accentB: "#ef4444", icon: "legacy" },
    "programs": { accentA: "#2563eb", accentB: "#3b82f6", icon: "blocks" },
    "curriculum": { accentA: "#10b981", accentB: "#3b82f6", icon: "book" },
    "academic calendar": { accentA: "#0ea5e9", accentB: "#8b5cf6", icon: "calendar" },
    "eligibility": { accentA: "#84cc16", accentB: "#22c55e", icon: "shield" },
    "scholarships": { accentA: "#a855f7", accentB: "#ec4899", icon: "cap" },
    "application timeline": { accentA: "#f59e0b", accentB: "#ef4444", icon: "timeline" },
    "top recruiters": { accentA: "#06b6d4", accentB: "#3b82f6", icon: "recruit" },
    "preparation": { accentA: "#6366f1", accentB: "#22c55e", icon: "code" },
    "internships": { accentA: "#3b82f6", accentB: "#14b8a6", icon: "briefcase" },
    "alumni network": { accentA: "#22c55e", accentB: "#06b6d4", icon: "network" },
    "distinguished alumni": { accentA: "#f43f5e", accentB: "#f59e0b", icon: "award" },
    "give back": { accentA: "#10b981", accentB: "#60a5fa", icon: "community" },
    "address": { accentA: "#3b82f6", accentB: "#22c55e", icon: "pin" },
    "admission office": { accentA: "#8b5cf6", accentB: "#3b82f6", icon: "office" },
    "student affairs": { accentA: "#06b6d4", accentB: "#22c55e", icon: "support" },
  };

  const matched = CARD_IMAGES[text];
  if (matched) {
    return makeTechCardSvg({ title, accentA: matched.accentA, accentB: matched.accentB, icon: matched.icon });
  }

  if (text.includes("placement") || text.includes("recruit")) {
    return "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80";
  }
  if (text.includes("research") || text.includes("innovation") || text.includes("lab")) {
    return "https://images.unsplash.com/photo-1581093458791-9d15482442f5?auto=format&fit=crop&w=1400&q=80";
  }
  if (text.includes("campus") || text.includes("student") || text.includes("club")) {
    return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80";
  }
  return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80";
}

function SectionCard({ title, description, children, imageUrl }) {
  const resolvedImage = imageUrl || getCardImage(title);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Gradient Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-10 blur"></div>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={resolvedImage}
          alt={title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative space-y-3 p-6">
        <h3 className="text-xl font-semibold tracking-tight text-white transition group-hover:text-blue-400">
          {title}
        </h3>

        {description && (
          <p className="text-sm leading-relaxed text-slate-300">
            {description}
          </p>
        )}

        {children && <div className="pt-2">{children}</div>}
      </div>
    </article>
  );
}

export default SectionCard;