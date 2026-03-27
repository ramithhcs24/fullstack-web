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

      <section className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-10 grid gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Campus Events Desk
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Current events are open for registration</h2>
            <p className="mt-3 text-slate-500">
              Upcoming and marquee events include active registration and volunteer links. Past events are shown as a gallery to showcase how campus activities were conducted.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900 p-5 text-white">
            <p className="text-sm text-slate-200">Need to revisit completed events?</p>
            <a
              href="#past-events"
              className="mt-3 inline-flex rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
            >
              Check Past Events
            </a>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Events Hub</h2>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
          >
            Filter
          </button>
        </div>

        {showFilters && (
          <div className="mb-6 grid gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-md md:grid-cols-2">
            <select
              value={filters.role}
              onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="volunteer">Volunteer</option>
              <option value="register">Register</option>
              <option value="both">Both</option>
            </select>
            <select
              value={filters.club}
              onChange={(e) => setFilters((prev) => ({ ...prev, club: e.target.value }))}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-slate-700"
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
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 shadow-sm">
            {error}
          </div>
        )}

        <div className="space-y-12">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-slate-900">Marquee Events</h3>
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
            <h3 className="mb-4 text-2xl font-bold text-slate-900">Upcoming Events</h3>
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
            <h3 className="mb-4 text-2xl font-bold text-slate-900">Past Events</h3>
            <p className="mb-4 text-sm text-slate-500">
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

        <div className="mt-14 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 p-8 text-center text-white shadow-md">
          <h3 className="text-2xl font-bold">If you are a club head click here</h3>
          <p className="mx-auto mt-2 max-w-2xl text-blue-100">
            You will be redirected to login and then to the event creation page.
          </p>
          <Link
            to="/club-head/login"
            className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50"
          >
            Club Head Access
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CampusLife;
