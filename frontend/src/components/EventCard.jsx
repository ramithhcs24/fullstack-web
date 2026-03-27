function getEventImage(event) {
  const seed = encodeURIComponent(`${event.club || "campus"}-${event.title || "event"}`);
  return `https://picsum.photos/seed/${seed}/720/400`;
}

function EventCard({ event, interactive = true }) {
  const isMarquee = event.category === "marquee";

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-soft transition duration-300 hover:scale-[1.01] hover:shadow-lift ${
        isMarquee ? "border-white/10 bg-white/5 text-slate-50" : "border-white/10 bg-surface/80 text-slate-100"
      }`}
    >
      <div className="relative">
        <img
          src={getEventImage(event)}
          alt={event.title || "Campus event"}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent" />
      </div>
      <div className="p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isMarquee ? "bg-white/10 text-slate-50 ring-1 ring-white/15" : "bg-white/5 text-slate-200 ring-1 ring-white/10"
          }`}
        >
          {event.club || "Campus Club"}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            isMarquee ? "bg-white/10 text-slate-50 ring-1 ring-white/15" : "bg-white/5 text-slate-200 ring-1 ring-white/10"
          }`}
        >
          {event.type}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-slate-100">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        {event.description}
      </p>

      {interactive ? <div className="mt-5 flex flex-wrap gap-2">
        {(event.type === "volunteer" || event.type === "both") && event.volunteerLink && (
          <a
            href={event.volunteerLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            Volunteer
          </a>
        )}
        {(event.type === "register" || event.type === "both") && event.registerLink && (
          <a
            href={event.registerLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Register
          </a>
        )}
      </div> : <p className="mt-5 text-sm font-medium text-slate-300">Exhibition only</p>}
      </div>
    </article>
  );
}

export default EventCard;
