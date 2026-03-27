import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

const PLACEMENT_TRENDS = [
  { year: "2021-22", rate: 86, highestLpa: 18.5, averageLpa: 4.8 },
  { year: "2022-23", rate: 89, highestLpa: 21.0, averageLpa: 5.3 },
  { year: "2023-24", rate: 92, highestLpa: 24.6, averageLpa: 5.9 },
  { year: "2024-25", rate: 95, highestLpa: 27.4, averageLpa: 6.4 },
  { year: "2025-26", rate: 97, highestLpa: 30.2, averageLpa: 6.9 },
];

function Placements() {
  return (
    <div>
      <PageHero
        title="Placements"
        subtitle="Career outcomes powered by training, mentoring, and recruiter partnerships."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-24 md:grid-cols-3">
        <SectionCard
          title="Top Recruiters"
          description="Infosys, TCS, Zoho, Bosch, Amazon, and many high-growth startups."
        />
        <SectionCard
          title="Preparation"
          description="Mock interviews, coding practice, aptitude coaching, and profile building."
        />
        <SectionCard
          title="Internships"
          description="Industry internships integrated into curriculum for final-year placement readiness."
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-md md:p-8">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white">Placement Performance (Past 5 Years)</h2>
            <p className="mt-1 text-sm text-slate-300">
              Year-wise placement rate with highest and average package trends.
            </p>
          </div>

          <div className="space-y-8">
            {PLACEMENT_TRENDS.map((item) => (
              <div key={item.year}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-300">{item.year}</span>
                  <span className="font-semibold text-blue-600">{item.rate}% placed</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-300">
                  <span>Highest: {item.highestLpa} LPA</span>
                  <span>Average: {item.averageLpa} LPA</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase text-slate-300">Latest Placement Rate</p>
              <p className="mt-1 text-2xl font-bold text-white">97%</p>
            </div>
            <div className="rounded-xl bg-slate-50/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase text-slate-300">Highest Package (2025-26)</p>
              <p className="mt-1 text-2xl font-bold text-white">30.2 LPA</p>
            </div>
            <div className="rounded-xl bg-slate-50/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase text-slate-300">Average Package (2025-26)</p>
              <p className="mt-1 text-2xl font-bold text-white">6.9 LPA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Placements;
