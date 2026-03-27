import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingState from "../components/LoadingState";
import PageHero from "../components/PageHero";

const API_BASE = "https://fullstack-web-mvpk.onrender.com";

function CampusLife() {
  const [eventsByCategory, setEventsByCategory] = useState({
    upcoming: [],
    past: [],
    marquee: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ role: "all", club: "all" });
  const [showFilters, setShowFilters] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const [upcomingRes, pastRes, marqueeRes] = await Promise.all([
        fetch(`${API_BASE}/events?category=upcoming`),
        fetch(`${API_BASE}/events?category=past`),
        fetch(`${API_BASE}/events?category=marquee`),
      ]);
      const [upcoming, past, marquee] = await Promise.all([
        upcomingRes.json(),
        pastRes.json(),
        marqueeRes.json(),
      ]);
      setEventsByCategory({
        upcoming: Array.isArray(upcoming) ? upcoming : [],
        past: Array.isArray(past) ? past : [],
        marquee: Array.isArray(marquee) ? marquee : [],
      });
    } catch {
      setError("Unable to load events right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const allClubs = useMemo(() => {
    const clubs = [
      ...eventsByCategory.upcoming,
      ...eventsByCategory.past,
      ...eventsByCategory.marquee,
    ].map((e) => e.club);
    return [...new Set(clubs.filter(Boolean))].sort();
  }, [eventsByCategory]);

  const applyFilters = (events) =>
    events.filter((event) => {
      const roleMatch = filters.role === "all" || event.type === filters.role;
      const clubMatch = filters.club === "all" || event.club === filters.club;
      return roleMatch && clubMatch;
    });

  const filtered = {
    upcoming: applyFilters(eventsByCategory.upcoming),
    past: applyFilters(eventsByCategory.past),
    marquee: applyFilters(eventsByCategory.marquee),
  };

  return (
    <div>
      <PageHero
        title="Campus Life"
        subtitle="Explore, participate, and experience campus events."
      />

      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* HEADER BLOCK */}
          <div className="mb-16 grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Events Hub
              </h2>
              <p className="mt-3 text-slate-400">
                Discover events, register, volunteer, and explore campus activity.
              </p>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowFilters((prev) => !prev)}
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Toggle Filters
              </button>
            </div>
          </div>

          {/* FILTERS */}
          {showFilters && (
            <div className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-2">
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, role: e.target.value }))
                }
                className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
              >
                <option value="all">All Roles</option>
                <option value="volunteer">Volunteer</option>
                <option value="register">Register</option>
                <option value="both">Both</option>
              </select>

              <select
                value={filters.club}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, club: e.target.value }))
                }
                className="rounded-lg bg-white/10 px-3 py-2 text-white outline-none"
              >
                <option value="all">All Clubs</option>
                {allClubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          {/* SECTIONS */}
          <div className="space-y-20">

            {/* MARQUEE */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Featured Events
              </h3>
              {loading ? (
                <LoadingState label="Loading..." />
              ) : filtered.marquee.length ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filtered.marquee.map((event) => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState title="No featured events" />
              )}
            </div>

            {/* UPCOMING */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Upcoming Events
              </h3>
              {loading ? (
                <LoadingState label="Loading..." />
              ) : filtered.upcoming.length ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filtered.upcoming.map((event) => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState title="No upcoming events" />
              )}
            </div>

            {/* PAST */}
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-white">
                Past Events
              </h3>
              {loading ? (
                <LoadingState label="Loading..." />
              ) : filtered.past.length ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filtered.past.map((event) => (
                    <EventCard
                      key={event._id || event.id}
                      event={event}
                      interactive={false}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState title="No past events" />
              )}
            </div>

          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-semibold text-white">
              Are you a Club Head?
            </h3>
            <p className="mt-3 text-slate-400">
              Manage and publish events through your dashboard.
            </p>

            <Link
              to="/club-head/login"
              className="mt-6 inline-block rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
            >
              Go to Dashboard
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

export default CampusLife;