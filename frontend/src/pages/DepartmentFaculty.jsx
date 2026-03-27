import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { DEPARTMENTS } from "../data/universityData";

function initials(name) {
  const parts = String(name || "")
    .split(" ")
    .filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function DepartmentFaculty() {
  const { code } = useParams();
  const department = DEPARTMENTS.find((d) => d.code.toLowerCase() === String(code || "").toLowerCase());

  if (!department) {
    return (
      <div className="container-app py-12">
        <div className="surface p-6">
          <p className="text-lg font-semibold text-slate-100">Department not found</p>
          <p className="mt-2 text-sm text-slate-300">
            Please go back to Departments and choose a valid department.
          </p>
          <Link to="/departments" className="btn btn-secondary mt-5">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={`${department.code} Faculty Portfolio`}
        subtitle={`Meet the faculty team of ${department.name}.`}
      />

      <section className="container-app py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-['Poppins'] text-2xl font-bold tracking-tight text-slate-100">
              Faculty Profiles
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Department: {department.name}
            </p>
          </div>
          <Link to="/departments" className="btn btn-secondary">
            View all departments
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {department.faculty.map((name) => (
            <article key={name} className="surface surface-hover p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <span className="text-sm font-bold text-accent">{initials(name)}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-slate-100">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">Faculty Member</p>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Expertise
                  </dt>
                  <dd className="mt-1 text-slate-200">
                    Teaching, mentoring, and research guidance
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Contact
                  </dt>
                  <dd className="mt-1 text-slate-200">
                    {`${name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "")}@aurorait.edu.in`}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DepartmentFaculty;

