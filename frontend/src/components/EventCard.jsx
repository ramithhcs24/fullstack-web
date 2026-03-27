<<<<<<< HEAD
function hashToInt(input) {
  const str = String(input || "");
  let hash = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickEventTheme(event) {
  const text = `${event.title || ""} ${event.description || ""} ${event.category || ""} ${event.type || ""}`.toLowerCase();

  if (text.includes("hackathon") || text.includes("ctf") || text.includes("capture the flag")) {
    return "bolt";
  }
  if (text.includes("browser") || text.includes("web") || text.includes("frontend") || text.includes("react")) {
    return "browser";
  }
  if (text.includes("code") || text.includes("coding") || text.includes("programming") || text.includes("dsa")) {
    return "code";
  }
  if (text.includes("ai") || text.includes("ml") || text.includes("machine learning") || text.includes("data")) {
    return "chip";
  }
  if (text.includes("cyber") || text.includes("security") || text.includes("forensics")) {
    return "shield";
  }
  if (text.includes("iot") || text.includes("embedded") || text.includes("arduino") || text.includes("raspberry")) {
    return "signal";
  }
  if (text.includes("workshop") || text.includes("bootcamp") || text.includes("training")) {
    return "tools";
  }
  if (text.includes("webinar") || text.includes("talk") || text.includes("seminar")) {
    return "mic";
  }

  return "spark";
}

function getEventImage(event) {
  const theme = pickEventTheme(event);
  const seedKey = `${event.club || ""}-${event.title || ""}-${event.type || ""}`;
  const seedInt = hashToInt(seedKey);
  const pickIndex = (seedInt >>> 8) % 6;

  // Real tech photos (stable, different per event). We keep them tech-related by theme.
  // Format: images.unsplash.com/{photoId}?auto=format&fit=crop&w=1200&q=80
  const PHOTO_POOLS = {
    bolt: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    ],
    browser: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
    code: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80",
    ],
    chip: [
      "https://images.unsplash.com/photo-1555617981-dac3880eac6b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    ],
    shield: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555066932-1e4189c7f0b8?auto=format&fit=crop&w=1200&q=80",
    ],
    signal: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
    ],
    tools: [
      "https://images.unsplash.com/photo-1581092921461-7031e4f5be3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581093458791-9d15482442f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    ],
    mic: [
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    ],
    spark: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6b?auto=format&fit=crop&w=1200&q=80",
    ],
  };

  const pool = PHOTO_POOLS[theme.icon] || PHOTO_POOLS.spark;
  return pool[pickIndex % pool.length];
=======
function getEventImage(event) {
  const seed = encodeURIComponent(`${event.club || "campus"}-${event.title || "event"}`);
  return `https://picsum.photos/seed/${seed}/720/400`;
>>>>>>> 165dce38ccd3b3a6c504d4663fa14275773fb2a6
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