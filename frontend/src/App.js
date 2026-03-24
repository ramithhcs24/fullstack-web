import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000";
const pageStyles = "min-h-screen bg-slate-100 text-slate-900";
const cardStyles =
  "rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md";

function normalizeEvent(event) {
  const tags = Array.isArray(event.tags) ? event.tags : [];
  const legacyType = String(event.type || "").toLowerCase();
  const typeFromLegacyTag = String(tags[1] || "").toLowerCase();
  const normalizedType = ["volunteer", "register", "both"].includes(legacyType)
    ? legacyType
    : ["volunteer", "register", "both"].includes(typeFromLegacyTag)
    ? typeFromLegacyTag
    : "register";

  return {
    id: event.id,
    title: event.title || "Untitled Event",
    description: event.description || "",
    club: event.club || tags[0] || "General Club",
    type: normalizedType,
    volunteerLink: event.volunteerLink || "",
    registerLink: event.registerLink || event.formLink || "",
  };
}

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

function LandingPage() {
  return (
    <div className={`${pageStyles} flex items-center justify-center p-6`}>
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl ring-1 ring-slate-200">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Campus Connect
        </p>
        <h1 className="mb-3 text-3xl font-bold text-slate-900">
          Welcome to the Event Portal
        </h1>
        <p className="mb-8 text-slate-600">
          Explore campus events as a student or manage events as a club head.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/student"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Student
          </Link>
          <Link
            to="/club-login"
            className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-black"
          >
            Club Head
          </Link>
        </div>
      </div>
    </div>
  );
}

function StudentPage({ events, canManage }) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");

  const clubOptions = [...new Set(events.map((event) => event.club))].sort();
  const filteredEvents = events.filter((event) => {
    const roleMatch = selectedRole === "all" || event.type === selectedRole;
    const clubMatch = selectedClub === "all" || event.club === selectedClub;
    return roleMatch && clubMatch;
  });

  return (
    <div className={`${pageStyles} p-6`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Student Events</h2>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Back
            </Link>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              title="Filter by role and club"
            >
              <span aria-hidden="true">⚲</span>
              Filter
            </button>
          </div>
        </div>
        {showFilters && (
          <div className={`${cardStyles} mb-4 p-4`}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                >
                  <option value="all">All</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="register">Register</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Club
                </label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                >
                  <option value="all">All</option>
                  {clubOptions.map((club) => (
                    <option key={club} value={club}>
                      {club}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`${cardStyles} p-5`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {event.title}
                  </h3>
                  <p className="text-slate-600">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {event.club}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 md:w-auto">
                  {(event.type === "volunteer" || event.type === "both") && (
                    <a
                      href={event.volunteerLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                    >
                      Volunteer
                    </a>
                  )}
                  {(event.type === "register" || event.type === "both") && (
                    <a
                      href={event.registerLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
                    >
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!filteredEvents.length && (
            <div className={`${cardStyles} p-5 text-slate-600`}>
              No events match the selected filters.
            </div>
          )}
        </div>
      </div>
      {canManage && (
        <Link
          to="/dashboard"
          className="fixed bottom-6 right-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-3xl text-white shadow-lg hover:bg-indigo-700"
          title="Add new event"
        >
          +
        </Link>
      )}
    </div>
  );
}

function ClubHeadLoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.username === "clubhead" && form.password === "password123") {
      setError("");
      onLogin();
      navigate("/dashboard");
      return;
    }
    setError("Invalid credentials. Use clubhead / password123");
  };

  return (
    <div className={`${pageStyles} flex items-center justify-center p-6`}>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Club Head Login</h2>
          <Link
            to="/"
            className="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
          >
            Back
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:bg-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardPage({ onLogout, onAddEvent, notice }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    club: "",
    type: "register",
    volunteerLink: "",
    registerLink: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (formData.type === "volunteer" || formData.type === "both") &&
      !isGoogleFormsUrl(formData.volunteerLink)
    ) {
      setMessage("Volunteer link must be a Google Form URL.");
      return;
    }
    if (
      (formData.type === "register" || formData.type === "both") &&
      !isGoogleFormsUrl(formData.registerLink)
    ) {
      setMessage("Register link must be a Google Form URL.");
      return;
    }

    const created = await onAddEvent(formData);
    if (created) {
      navigate("/student");
    } else {
      setMessage("Could not add event. Use valid Google Form links.");
    }
  };

  return (
    <div className={`${pageStyles} p-6`}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Club Head Dashboard</h2>
          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Home
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Logout
            </button>
          </div>
        </div>
        {notice && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {notice}
          </div>
        )}
        <div className={`${cardStyles} p-6`}>
          <h3 className="mb-4 text-lg font-semibold">Add New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              placeholder="Event title"
              required
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-28 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              placeholder="Event description"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={formData.club}
                onChange={(e) =>
                  setFormData({ ...formData, club: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                placeholder="Club name"
                required
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                required
              >
                <option value="volunteer">Volunteer</option>
                <option value="register">Register</option>
                <option value="both">Both</option>
              </select>
            </div>
            {(formData.type === "volunteer" || formData.type === "both") && (
              <input
                type="url"
                value={formData.volunteerLink}
                onChange={(e) =>
                  setFormData({ ...formData, volunteerLink: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                placeholder="Volunteer Google Form link"
                required
              />
            )}
            {(formData.type === "register" || formData.type === "both") && (
              <input
                type="url"
                value={formData.registerLink}
                onChange={(e) =>
                  setFormData({ ...formData, registerLink: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
                placeholder="Register Google Form link"
                required
              />
            )}
            <p className="text-xs text-slate-500">
              Allowed links: <code>forms.gle</code> or <code>docs.google.com/forms</code>
            </p>
            {message && <p className="text-sm text-red-600">{message}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/events`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data.map(normalizeEvent) : []);
      } catch (error) {
        setNotice("Backend is not reachable. Start backend on port 5000.");
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async (eventData) => {
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventData.title,
          description: eventData.description,
          club: eventData.club,
          type: eventData.type,
          volunteerLink:
            eventData.type === "volunteer" || eventData.type === "both"
              ? eventData.volunteerLink
              : "",
          registerLink:
            eventData.type === "register" || eventData.type === "both"
              ? eventData.registerLink
              : "",
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setNotice(err.message || "Unable to add event.");
        return false;
      }
      const created = await res.json();
      setEvents((prev) => [normalizeEvent(created), ...prev]);
      setNotice("");
      return true;
    } catch (error) {
      setNotice("Backend is not reachable. Start backend on port 5000.");
      return false;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/student"
        element={<StudentPage events={events} canManage={isLoggedIn} />}
      />
      <Route
        path="/club-login"
        element={<ClubHeadLoginPage onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <DashboardPage
              onLogout={() => setIsLoggedIn(false)}
              onAddEvent={handleAddEvent}
              notice={notice}
            />
          ) : (
            <Navigate to="/club-login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;