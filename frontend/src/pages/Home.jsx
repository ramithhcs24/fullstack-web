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
      <section className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-20 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
              {UNIVERSITY.shortName}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {UNIVERSITY.name}
            </h1>
            <p className="mt-4 max-w-xl text-blue-100">{UNIVERSITY.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admissions"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
              >
                Apply Now
              </Link>
              <Link
                to="/campus-life"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
              >
                Explore Campus Life
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-xl bg-white/15 p-4 ring-1 ring-white/30 backdrop-blur-sm">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="mt-1 text-sm text-blue-100">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-events" className="mx-auto w-full max-w-7xl px-4 py-14 lg:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Marquee Events</h2>
            <p className="mt-1 text-slate-500">The largest flagship experiences at AIT.</p>
          </div>
          <Link to="/campus-life" className="text-sm font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700">
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
