import { Link } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ink">
      <div className="container-app grid gap-8 py-10 lg:grid-cols-3">
        <div>
          <h3 className="font-['Poppins'] text-lg font-bold tracking-tight text-slate-100">
            {UNIVERSITY.name}
          </h3>
          <p className="mt-2 text-sm text-slate-300">{UNIVERSITY.tagline}</p>
          <p className="mt-1 text-sm text-slate-400">
            {UNIVERSITY.location} | Est. {UNIVERSITY.established}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Quick Links
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {NAV_LINKS.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-slate-300 transition hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Connect
          </h4>
          <p className="mt-3 text-sm text-slate-300">
            admissions@aurorait.edu.in
            <br />
            +91 422 430 2200
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
