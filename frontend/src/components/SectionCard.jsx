function getCardImage(title) {
  const text = String(title || "").toLowerCase();

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
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <img
          src={resolvedImage}
          alt={title}
          className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
        {description && <p className="text-sm leading-relaxed text-slate-500">{description}</p>}
        {children && <div className="pt-1">{children}</div>}
      </div>
    </article>
  );
}

export default SectionCard;
