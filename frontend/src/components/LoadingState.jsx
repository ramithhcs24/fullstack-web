function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 animate-pulse rounded-full bg-indigo-600" />
        {label}
      </div>
    </div>
  );
}

export default LoadingState;
