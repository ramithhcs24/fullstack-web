function getEventImage(event) {
  const seed = encodeURIComponent(`${event.club || "campus"}-${event.title || "event"}`);
  return `https://picsum.photos/seed/${seed}/720/400`;
}

function EventCard({ event, interactive = true }) {
  const isMarquee = event.category === "marquee";

  return (
    <article
      className={`overflow-hidden rounded-xl border border-gray-100 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
        isMarquee
          ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-white"
          : "bg-white text-slate-900"
      }`}
    >
      <img
        src={getEventImage(event)}
        alt={event.title || "Campus event"}
        className="h-44 w-full object-cover"
        loading="lazy"
      />
      <div className="p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isMarquee ? "bg-white/20 text-white" : "bg-blue-100 text-blue-700"
          }`}
        >
          {event.club || "Campus Club"}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            isMarquee ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          {event.type}
        </span>
      </div>

      <h3 className={`mt-4 text-xl font-bold ${isMarquee ? "text-white" : "text-slate-900"}`}>{event.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${isMarquee ? "text-blue-50" : "text-slate-500"}`}>
        {event.description}
      </p>

      {interactive ? <div className="mt-5 flex flex-wrap gap-2">
        {(event.type === "volunteer" || event.type === "both") && event.volunteerLink && (
          <a
            href={event.volunteerLink}
            target="_blank"
            rel="noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              isMarquee
                ? "border border-white/40 bg-white text-blue-600 hover:bg-blue-50"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
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
            className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 ${
              isMarquee
                ? "bg-white text-blue-600 hover:bg-blue-50"
                : ""
            }`}
          >
            Register
          </a>
        )}
      </div> : <p className={`mt-5 text-sm font-medium ${isMarquee ? "text-blue-50" : "text-slate-500"}`}>Exhibition only</p>}
      </div>
    </article>
  );
}

export default EventCard;
