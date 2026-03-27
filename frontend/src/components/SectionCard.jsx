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