function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
      <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />
        {label}
      </div>
    </div>
  );
}

export default LoadingState;
