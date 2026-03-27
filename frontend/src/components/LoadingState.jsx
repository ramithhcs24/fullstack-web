function LoadingState({ label = "Loading..." }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-center justify-center gap-3 text-sm text-slate-300">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />
        {label}
      </div>
    </div>
  );
}

export default LoadingState;
