function SectionCard({ title, description, children }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </article>
  );
}

export default SectionCard;
