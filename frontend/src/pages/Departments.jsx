import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
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