function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center shadow-md">
      <p className="text-lg font-semibold text-slate-900">{title || "No events available"}</p>
      <p className="mt-2 text-sm text-slate-500">
        {description || "No events available"}
      </p>
    </div>
  );
}

export default EmptyState;
