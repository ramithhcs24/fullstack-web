function PageHero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      
      {/* Background Glow Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 lg:px-6">
        
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            {title}
          </h1>

          <p className="mt-5 text-base text-blue-100 sm:text-lg">
            {subtitle}
          </p>
        </div>

      </div>
    </section>
  );
}

export default PageHero;