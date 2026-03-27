import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
import { DEPARTMENTS } from "../data/universityData";

function Departments() {
  return (
    <div>
      <PageHero
        title="Departments"
        subtitle="Explore our core schools with strong academic foundations and industry alignment."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 lg:px-6">
        {DEPARTMENTS.map((dept) => (
          <SectionCard
            key={dept.code}
            title={`${dept.code} - ${dept.name}`}
            description={dept.about}
          >
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Vision:</span> {dept.vision}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Programs:</span>{" "}
                {dept.programs.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Faculty:</span>{" "}
                {dept.faculty.join(", ")}
              </p>
            </div>
          </SectionCard>
        ))}
      </section>
    </div>
  );
}

export default Departments;
