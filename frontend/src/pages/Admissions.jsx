import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Admissions() {
  return (
    <div>
      <PageHero
        title="Admissions"
        subtitle="Simple, transparent admissions process with scholarships and merit pathways."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 lg:px-6">
        <SectionCard title="Eligibility" description="Entrance exam scores, academic record, and interview for selected programs." />
        <SectionCard title="Scholarships" description="Merit, need-based, and diversity scholarships available each cycle." />
        <SectionCard title="Application Timeline" description="Applications open in January; offers released in phased rounds." />
      </section>
    </div>
  );
}

export default Admissions;
