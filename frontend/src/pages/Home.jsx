import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingState from "../components/LoadingState";
import SectionCard from "../components/SectionCard";
import { HIGHLIGHTS, UNIVERSITY } from "../data/universityData";

const API_BASE = "https://fullstack-web-mvpk.onrender.com/";

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
      <section className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-sky-600 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-200">
              {UNIVERSITY.shortName}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {UNIVERSITY.name}
            </h1>
            <p className="mt-4 max-w-xl text-indigo-100">{UNIVERSITY.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
              >
                Apply Now
              </Link>
              <Link
                to="/campus-life"
                className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Explore Campus Life
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-indigo-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-events" className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Featured Marquee Events</h2>
            <p className="mt-1 text-slate-600">The largest flagship experiences at AIT.</p>
          </div>
          <Link to="/campus-life" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            View all events
          </Link>
        </div>
        {loading ? (
          <LoadingState label="Loading marquee events..." />
        ) : featuredEvents.length ? (
          <div className="grid gap-4 md:grid-cols-2">
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

      <section id="highlights" className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SectionCard
            title="Placements Excellence"
            description="Career readiness integrated with mentoring, mock interviews, and recruiter connects."
          />
          <SectionCard
            title="Research and Innovation"
            description="Interdisciplinary labs and funded projects in AI, energy, and intelligent systems."
          />
          <SectionCard
            title="Vibrant Campus Life"
            description="Festivals, clubs, sports, volunteering, and leadership opportunities year-round."
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
