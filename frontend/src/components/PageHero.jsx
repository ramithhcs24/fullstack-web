function PageHero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-ink text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-28 right-[-8rem] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      </div>

      <div className="container-app relative py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Aurora Institute of Technology
        </p>
        <h1 className="mt-4 font-['Poppins'] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default PageHero;
