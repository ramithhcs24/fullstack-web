import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Placements() {
  return (
    <div>
      <PageHero
        title="Placements"
        subtitle="Career outcomes powered by training, mentoring, and recruiter partnerships."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 lg:px-6">
        <SectionCard title="Top Recruiters" description="Infosys, TCS, Zoho, Bosch, Amazon, and many high-growth startups." />
        <SectionCard title="Preparation" description="Mock interviews, coding practice, aptitude coaching, and profile building." />
        <SectionCard title="Internships" description="Industry internships integrated into curriculum for final-year placement readiness." />
      </section>
    </div>
  );
}

export default Placements;
