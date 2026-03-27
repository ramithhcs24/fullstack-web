import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
import { UNIVERSITY } from "../data/universityData";

function Contact() {
  return (
    <div>
      <PageHero
        title="Contact"
        subtitle="Get in touch for admissions, academics, events, or general support."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3 lg:px-6">
        <SectionCard
          title="Address"
          description={`${UNIVERSITY.name}, Innovation Valley Road, ${UNIVERSITY.location}`}
        />
        <SectionCard
          title="Admissions Office"
          description="admissions@aurorait.edu.in | +91 422 430 2200"
        />
        <SectionCard
          title="Student Affairs"
          description="studentaffairs@aurorait.edu.in | +91 422 430 2244"
        />
      </section>
    </div>
  );
}

export default Contact;
