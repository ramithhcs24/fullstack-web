function PageHero({ title, subtitle }) {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 lg:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-indigo-100">{subtitle}</p>
      </div>
    </section>
  );
}

export default PageHero;
