import PageHero from "../components/PageHero";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import SectionCard from "../components/SectionCard";
>>>>>>> 165dce38ccd3b3a6c504d4663fa14275773fb2a6
import { DEPARTMENTS } from "../data/universityData";

function Departments() {
  return (
    <div>
      {/* HERO */}
      <PageHero
        title="Departments"
        subtitle="Explore our core schools with strong academic foundations and industry alignment."
      />

      {/* MAIN SECTION */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* HEADING */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white">
              Academic Departments
            </h2>
            <p className="mt-3 text-slate-400">
              Discover programs, faculty, and research across disciplines
            </p>
          </div>

          {/* GRID */}
<<<<<<< HEAD
          <div className="grid gap-6 md:grid-cols-2">
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.code}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
              >
                <div className="px-5 py-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                    {dept.code}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{dept.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{dept.about}</p>

                  <Link
                    to={`/departments/${dept.code}`}
                    className="mt-5 inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    View Faculty Portfolio →
                  </Link>
                </div>
              </div>
=======
          <div className="grid gap-10 md:grid-cols-2">
            {DEPARTMENTS.map((dept) => (
              <SectionCard
                key={dept.code}
                title={`${dept.code} — ${dept.name}`}
                description={dept.about}
              >
                <div className="space-y-4 text-sm text-slate-400">

                  <p>
                    <span className="font-semibold text-white">
                      Vision:
                    </span>{" "}
                    {dept.vision}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Programs:
                    </span>{" "}
                    {dept.programs.join(", ")}
                  </p>

                  <p>
                    <span className="font-semibold text-white">
                      Faculty:
                    </span>{" "}
                    {dept.faculty.join(", ")}
                  </p>

                </div>
              </SectionCard>
>>>>>>> 165dce38ccd3b3a6c504d4663fa14275773fb2a6
            ))}
          </div>

        </div>
      </section>

      {/* EXTRA DEPTH SECTION */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-16 text-2xl font-semibold text-white">
            Interdisciplinary Learning
          </h3>
          <p className="mt-4 text-slate-400">
            Our departments collaborate across domains to provide students with
            a holistic, future-ready education experience.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Departments;