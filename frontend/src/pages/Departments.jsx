import PageHero from "../components/PageHero";
import { Link } from "react-router-dom";
import { DEPARTMENTS } from "../data/universityData";

function Departments() {
  return (
    <div>
      <PageHero
        title="Departments"
        subtitle="Explore our core schools with strong academic foundations and industry alignment."
      />
      <section className="container-app grid gap-4 py-12">
        {DEPARTMENTS.map((dept) => (
          <article key={dept.code} className="surface surface-hover p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {dept.code}
                </p>
                <h2 className="mt-2 font-['Poppins'] text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
                  {dept.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {dept.about}
                </p>
              </div>

              <Link
                to={`/departments/${dept.code}/faculty`}
                className="btn btn-primary shrink-0"
              >
                View Faculty Portfolio
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Vision
                </p>
                <p className="mt-2 text-sm text-slate-200">{dept.vision}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Programs
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {dept.programs.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Departments;
