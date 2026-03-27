function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <p className="text-lg font-semibold text-white">{title || "No events available"}</p>
      <p className="mt-2 text-sm text-slate-300">
        {description || "No events available"}
      </p>
    </div>
  );
}

export default EmptyState;
