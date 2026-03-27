function EventCard({ event }) {
  const isMarquee = event.category === "marquee";

  return (
    <article
      className={`rounded-2xl p-6 ring-1 transition hover:shadow-lg ${
        isMarquee
          ? "bg-gradient-to-r from-indigo-700 to-sky-600 text-white ring-indigo-400"
          : "bg-white text-slate-900 ring-slate-200 hover:-translate-y-0.5"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isMarquee ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {event.club || "Campus Club"}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            isMarquee ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {event.type}
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold">{event.title}</h3>
      <p className={`mt-2 ${isMarquee ? "text-indigo-100" : "text-slate-600"}`}>
        {event.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(event.type === "volunteer" || event.type === "both") && event.volunteerLink && (
          <a
            href={event.volunteerLink}
            target="_blank"
            rel="noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              isMarquee
                ? "bg-white text-indigo-700 hover:bg-slate-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Volunteer
          </a>
        )}
        {(event.type === "register" || event.type === "both") && event.registerLink && (
          <a
            href={event.registerLink}
            target="_blank"
            rel="noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              isMarquee
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Register
          </a>
        )}
      </div>
    </article>
  );
}

export default EventCard;
