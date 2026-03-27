function getEventImage(event) {
  const seed = encodeURIComponent(`${event.club || "campus"}-${event.title || "event"}`);
  return `https://picsum.photos/seed/${seed}/720/400`;
}

function EventCard({ event, interactive = true }) {
  const isMarquee = event.category === "marquee";

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={getEventImage(event)}
          alt={event.title || "Campus event"}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        
        {/* TAGS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
            {event.club || "Campus Club"}
          </span>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-slate-300">
            {event.type}
          </span>

          {isMarquee && (
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
              Featured
            </span>
          )}
        </div>

        {/* TITLE */}
        <h3 className="mt-4 text-xl font-semibold text-white group-hover:text-indigo-400 transition">
          {event.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {event.description}
        </p>

        {/* ACTIONS */}
        {interactive ? (
          <div className="mt-6 flex flex-wrap gap-3">
            
            {(event.type === "volunteer" || event.type === "both") && event.volunteerLink && (
              <a
                href={event.volunteerLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Volunteer
              </a>
            )}

            {(event.type === "register" || event.type === "both") && event.registerLink && (
              <a
                href={event.registerLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-400"
              >
                Register
              </a>
            )}

          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-500">Exhibition only</p>
        )}
      </div>
    </article>
  );
}

export default EventCard;