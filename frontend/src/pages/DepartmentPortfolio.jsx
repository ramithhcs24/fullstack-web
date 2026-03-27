import PageHero from "../components/PageHero";
import { DEPARTMENTS } from "../data/universityData";
import { Link, useParams } from "react-router-dom";

function DepartmentPortfolio() {
  const { code } = useParams();
  const department = DEPARTMENTS.find((d) => d.code === code);

  if (!department) {
    return (
      <div>
        <PageHero title="Department Not Found" subtitle="Please select a valid department." />
        <section className="mx-auto max-w-7xl px-6 py-24">
          <Link to="/departments" className="text-blue-400 hover:text-blue-300 font-semibold">
            ← Back to Departments
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={`${department.code} — ${department.name}`}
        subtitle="Faculty portfolio: courses taught, degrees, and years of experience."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Department Overview
            </p>
            <p className="mt-2 text-slate-300">{department.about}</p>
          </div>

          <Link
            to="/departments"
            className="mt-4 inline-flex text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            ← Back to Departments
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {department.faculty.map((teacher) => (
            <article
              key={teacher.name}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition hover:bg-white/10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Faculty
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{teacher.name}</h3>

              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>
                  <span className="font-semibold text-white">Degree:</span> {teacher.degree}
                </p>
                <p>
                  <span className="font-semibold text-white">Experience:</span>{" "}
                  {teacher.experienceYears} years
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-white">Courses</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {teacher.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DepartmentPortfolio;

