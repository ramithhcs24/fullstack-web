import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import { HIGHLIGHTS, UNIVERSITY } from "../data/universityData";

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink text-slate-100">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute bottom-[-12rem] left-[-10rem] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
        </div>

        <div className="container-app relative grid gap-10 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {UNIVERSITY.shortName}
            </p>
            <h1 className="mt-4 font-['Poppins'] text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {UNIVERSITY.name}
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">{UNIVERSITY.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="btn btn-primary"
              >
                Apply Now
              </Link>
              <Link
                to="/campus-life"
                className="btn btn-secondary"
              >
                Explore Campus Life
              </Link>
              <a
                href="https://i.pinimg.com/474x/ba/c2/56/bac256c78bebafdfde6d0b1f288de7e3.jpg"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                College Layout
              </a>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="surface subtle-ring p-5 transition duration-300 hover:bg-white/10"
              >
                <p className="text-base font-semibold text-slate-100">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="container-app pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard
            title="Placements Excellence"
            description="Career readiness integrated with mentoring, mock interviews, and recruiter connects."
            imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
          />
          <SectionCard
            title="Research and Innovation"
            description="Interdisciplinary labs and funded projects in AI, energy, and intelligent systems."
            imageUrl="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80"
          />
          <SectionCard
            title="Vibrant Campus Life"
            description="Festivals, clubs, sports, volunteering, and leadership opportunities year-round."
            imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
