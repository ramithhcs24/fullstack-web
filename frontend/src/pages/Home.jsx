import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingState from "../components/LoadingState";
import SectionCard from "../components/SectionCard";
import { HIGHLIGHTS, UNIVERSITY } from "../data/universityData";

const API_BASE = "https://fullstack-web-mvpk.onrender.com";

function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarquee = async () => {
      try {
        const res = await fetch(`${API_BASE}/events?category=marquee`);
        const data = await res.json();
        setFeaturedEvents(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        setFeaturedEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadMarquee();
  }, []);

  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
        
        {/* Glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500 blur-3xl"></div>
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2">
          
          {/* LEFT */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
              {UNIVERSITY.shortName}
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight lg:text-6xl">
              {UNIVERSITY.name}
            </h1>

            <p className="mt-5 max-w-xl text-lg text-blue-100">
              {UNIVERSITY.tagline}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Apply Now
              </Link>

              <Link
                to="/campus-life"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Explore Campus Life
              </Link>
            </div>
          </div>

          {/* RIGHT (Highlights) */}
          <div className="grid gap-4 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-blue-100">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FEATURED EVENTS */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Featured Events
            </h2>
            <p className="mt-2 text-slate-300">
              The biggest experiences at {UNIVERSITY.shortName}
            </p>
          </div>

          <Link
            to="/campus-life"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <LoadingState label="Loading marquee events..." />
        ) : featuredEvents.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {featuredEvents.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No marquee events published yet"
            description="Club heads can add marquee events from Campus Life."
          />
        )}
      </section>

      {/* 🔥 HIGHLIGHTS SECTION */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Why Choose {UNIVERSITY.shortName}?
          </h2>
          <p className="mt-2 text-slate-300">
            Excellence across academics, research, and campus life
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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