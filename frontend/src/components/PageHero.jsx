function PageHero({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-50 sm:text-base">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHero;
