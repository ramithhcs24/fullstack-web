import { Link } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3 lg:px-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{UNIVERSITY.name}</h3>
          <p className="mt-2 text-sm text-slate-600">{UNIVERSITY.tagline}</p>
          <p className="mt-1 text-sm text-slate-500">
            {UNIVERSITY.location} | Est. {UNIVERSITY.established}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Quick Links
          </h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {NAV_LINKS.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-slate-600 hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Connect
          </h4>
          <p className="mt-3 text-sm text-slate-600">
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
