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
    } catch (fetchError) {
      setError("Unable to load events right now. Please try again shortly.");
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
    ].map((event) => event.club);
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
        subtitle="Join ongoing campus events and explore our event history gallery."
      />

      <section className="container-app py-12">
        <div className="surface mb-10 grid gap-6 p-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Campus Events Desk
            </p>
            <h2 className="mt-2 font-['Poppins'] text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              Current events are open for registration
            </h2>
            <p className="mt-3 text-slate-300">
              Upcoming and marquee events include active registration and volunteer links. Past events are shown as a gallery to showcase how campus activities were conducted.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
            <p className="text-sm text-slate-300">Need to revisit completed events?</p>
            <a
              href="#past-events"
              className="btn btn-secondary mt-3"
            >
              Check Past Events
            </a>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-['Poppins'] text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
            Events Hub
          </h2>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="btn btn-secondary"
          >
            Filter
          </button>
        </div>

        {showFilters && (
          <div className="surface mb-6 grid gap-3 p-4 md:grid-cols-2">
            <select
              value={filters.role}
              onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
              className="select"
            >
              <option value="all">All Roles</option>
              <option value="volunteer">Volunteer</option>
              <option value="register">Register</option>
              <option value="both">Both</option>
            </select>
            <select
              value={filters.club}
              onChange={(e) => setFilters((prev) => ({ ...prev, club: e.target.value }))}
              className="select"
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
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-medium text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-12">
          <div>
            <h3 className="mb-4 font-['Poppins'] text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              Marquee Events
            </h3>
            {loading ? (
              <LoadingState label="Loading marquee events..." />
            ) : filtered.marquee.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.marquee.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No marquee events yet"
                description="Add featured events to showcase major campus activities."
              />
            )}
          </div>

          <div>
            <h3 className="mb-4 font-['Poppins'] text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              Upcoming Events
            </h3>
            {loading ? (
              <LoadingState label="Loading upcoming events..." />
            ) : filtered.upcoming.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.upcoming.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming events"
                description="Check again later for new club activities."
              />
            )}
          </div>

          <div id="past-events">
            <h3 className="mb-4 font-['Poppins'] text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              Past Events
            </h3>
            <p className="mb-4 text-sm text-slate-300">
              Past events are displayed for exhibition only. Registration is not available.
            </p>
            {loading ? (
              <LoadingState label="Loading past events..." />
            ) : filtered.past.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.past.map((event) => (
                  <EventCard key={event._id || event.id} event={event} interactive={false} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No past events"
                description="Completed events will be archived here."
              />
            )}
          </div>
        </div>

        <div className="surface mt-14 p-8 text-center">
          <h3 className="font-['Poppins'] text-2xl font-bold tracking-tight text-slate-100">
            Club Head access
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-slate-300">
            You will be redirected to login and then to the event creation page.
          </p>
          <Link
            to="/club-head/login"
            className="btn btn-primary mt-5"
          >
            Club Head Access
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CampusLife;
