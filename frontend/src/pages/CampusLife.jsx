import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingState from "../components/LoadingState";
import PageHero from "../components/PageHero";
import { CLUBS } from "../data/universityData";

const API_BASE = "https://fullstack-web-mvpk.onrender.com/";

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

function CampusLife() {
  const [eventsByCategory, setEventsByCategory] = useState({
    upcoming: [],
    past: [],
    marquee: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isClubHead, setIsClubHead] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [form, setForm] = useState({
    title: "",
    description: "",
    club: CLUBS[0],
    type: "register",
    category: "upcoming",
    volunteerLink: "",
    registerLink: "",
  });
  const [actionMessage, setActionMessage] = useState("");
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.username === "clubhead" && login.password === "password123") {
      setIsClubHead(true);
      setActionMessage("Club head mode enabled.");
      return;
    }
    setActionMessage("Invalid club head credentials.");
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setActionMessage("");

    if (
      (form.type === "volunteer" || form.type === "both") &&
      !isGoogleFormsUrl(form.volunteerLink)
    ) {
      setActionMessage("Volunteer link must be a Google Form URL.");
      return;
    }
    if (
      (form.type === "register" || form.type === "both") &&
      !isGoogleFormsUrl(form.registerLink)
    ) {
      setActionMessage("Register link must be a Google Form URL.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) {
        setActionMessage(payload.message || "Unable to create event.");
        return;
      }
      setActionMessage("Event created successfully.");
      setForm({
        title: "",
        description: "",
        club: CLUBS[0],
        type: "register",
        category: "upcoming",
        volunteerLink: "",
        registerLink: "",
      });
      await loadEvents();
    } catch (postError) {
      setActionMessage("Unable to create event right now.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setActionMessage("Unable to delete event.");
        return;
      }
      setActionMessage("Event deleted.");
      await loadEvents();
    } catch (deleteError) {
      setActionMessage("Unable to delete event.");
    }
  };

  return (
    <div>
      <PageHero
        title="Campus Life"
        subtitle="Explore student clubs, flagship festivals, volunteering drives, and events that shape the AIT experience."
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Events Hub</h2>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Filter
          </button>
        </div>

        {showFilters && (
          <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2">
            <select
              value={filters.role}
              onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="all">All Roles</option>
              <option value="volunteer">Volunteer</option>
              <option value="register">Register</option>
              <option value="both">Both</option>
            </select>
            <select
              value={filters.club}
              onChange={(e) => setFilters((prev) => ({ ...prev, club: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
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

        {!isClubHead ? (
          <form
            onSubmit={handleLogin}
            className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3"
          >
            <input
              type="text"
              placeholder="Club Head Username"
              value={login.username}
              onChange={(e) => setLogin((prev) => ({ ...prev, username: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            />
            <button className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-black">
              Club Head Login
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleCreateEvent}
            className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2"
          >
            <input
              type="text"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
              required
            />
            <select
              value={form.club}
              onChange={(e) => setForm((prev) => ({ ...prev, club: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              {CLUBS.map((club) => (
                <option key={club} value={club}>
                  {club}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="volunteer">Volunteer</option>
              <option value="register">Register</option>
              <option value="both">Both</option>
            </select>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="marquee">Marquee</option>
            </select>
            {(form.type === "volunteer" || form.type === "both") && (
              <input
                type="url"
                placeholder="Volunteer Google Form link"
                value={form.volunteerLink}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, volunteerLink: e.target.value }))
                }
                className="rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            )}
            {(form.type === "register" || form.type === "both") && (
              <input
                type="url"
                placeholder="Register Google Form link"
                value={form.registerLink}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, registerLink: e.target.value }))
                }
                className="rounded-lg border border-slate-300 px-3 py-2"
                required
              />
            )}
            <button className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 md:col-span-2">
              Add Event
            </button>
          </form>
        )}

        {actionMessage && <p className="mb-6 text-sm text-indigo-700">{actionMessage}</p>}
        {error && <p className="mb-6 text-sm text-red-600">{error}</p>}

        <div className="space-y-12">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Marquee Events</h3>
            {loading ? (
              <LoadingState label="Loading marquee events..." />
            ) : filtered.marquee.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.marquee.map((event) => (
                  <div key={event._id || event.id}>
                    <EventCard event={event} />
                    {isClubHead && (
                      <button
                        className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(event._id || event.id)}
                      >
                        Remove event
                      </button>
                    )}
                  </div>
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
            <h3 className="mb-4 text-2xl font-bold">Upcoming Events</h3>
            {loading ? (
              <LoadingState label="Loading upcoming events..." />
            ) : filtered.upcoming.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.upcoming.map((event) => (
                  <div key={event._id || event.id}>
                    <EventCard event={event} />
                    {isClubHead && (
                      <button
                        className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(event._id || event.id)}
                      >
                        Remove event
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming events"
                description="Check again later for new club activities."
              />
            )}
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-bold">Past Events</h3>
            {loading ? (
              <LoadingState label="Loading past events..." />
            ) : filtered.past.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.past.map((event) => (
                  <div key={event._id || event.id}>
                    <EventCard event={event} />
                    {isClubHead && (
                      <button
                        className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(event._id || event.id)}
                      >
                        Remove event
                      </button>
                    )}
                  </div>
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
      </section>
    </div>
  );
}

export default CampusLife;
