import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
import { UNIVERSITY } from "../data/universityData";

function About() {
  return (
    <div>
      
      {/* HERO */}
      <PageHero
        title={`About ${UNIVERSITY.name}`}
        subtitle="A multidisciplinary institution committed to academic rigor, innovation, and social impact."
      />

      {/* SECTION WRAPPER */}
      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* HEADING */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white">
              Our Foundation
            </h2>
            <p className="mt-3 text-slate-400">
              Built on strong values, vision, and legacy
            </p>
          </div>

          {/* CARDS */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <SectionCard
              title="Our Mission"
              description="To nurture ethically grounded professionals who can build technology for humanity."
            />

            <SectionCard
              title="Our Vision"
              description="To be a globally respected center for engineering, science, and leadership education."
            />

            <SectionCard
              title="Our Legacy"
              description={`Since ${UNIVERSITY.established}, AIT has produced innovators, entrepreneurs, and scholars.`}
            />
          </div>

        </div>
      </section>

      {/* EXTRA SECTION (adds depth to page) */}
      <section className="bg-slate-900 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="mb-16 text-2xl font-semibold text-white">
            Driving Innovation Through Education
          </h3>
          <p className="mt-4 text-slate-400">
            At {UNIVERSITY.shortName}, we empower students with knowledge,
            creativity, and leadership to shape the future of technology and society.
          </p>
        </div>
      </section>

    </div>
  );
}

export default About;