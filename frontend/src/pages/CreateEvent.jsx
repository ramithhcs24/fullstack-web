import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import { CLUBS } from "../data/universityData";

const API_BASE = "https://fullstack-web-mvpk.onrender.com";

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

function CreateEvent() {
  const navigate = useNavigate();
  const isClubHead = localStorage.getItem("isClubHead") === "true";
  const [form, setForm] = useState({
    title: "",
    description: "",
    club: CLUBS[0],
    type: "register",
    category: "upcoming",
    volunteerLink: "",
    registerLink: "",
  });
  const [status, setStatus] = useState("");

  if (!isClubHead) {
    return <Navigate to="/club-head/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (form.category === "past") {
      setStatus("Past events cannot be created from this page.");
      return;
    }
    if (
      (form.type === "volunteer" || form.type === "both") &&
      !isGoogleFormsUrl(form.volunteerLink)
    ) {
      setStatus("Volunteer link must be a Google Form URL.");
      return;
    }
    if (
      (form.type === "register" || form.type === "both") &&
      !isGoogleFormsUrl(form.registerLink)
    ) {
      setStatus("Register link must be a Google Form URL.");
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
        setStatus(payload.message || "Unable to create event.");
        return;
      }
      setStatus("Event created successfully.");
      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        type: "register",
        category: "upcoming",
        volunteerLink: "",
        registerLink: "",
      }));
    } catch (error) {
      setStatus("Unable to create event right now.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isClubHead");
    navigate("/club-head/login");
  };

  return (
    <div>
      <PageHero
        title="Create Event"
        subtitle="Create current campus events. Past events are exhibition-only and cannot be added."
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-12 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2"
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
            rows={4}
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
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
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
              className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
              required
            />
          )}

          {status && <p className="text-sm text-indigo-700 md:col-span-2">{status}</p>}

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button className="rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700">
              Publish Event
            </button>
            <Link
              to="/campus-life"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Campus Life
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 font-semibold text-red-700 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateEvent;
