import { Link } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#020617]">
      
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 lg:grid-cols-3 lg:px-6">
        
        {/* University Info */}
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {UNIVERSITY.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {UNIVERSITY.tagline}
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {UNIVERSITY.location} • Est. {UNIVERSITY.established}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Quick Links
          </h4>

            <div className="mt-4 grid grid-cols-2 gap-3">
            {NAV_LINKS.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-slate-300 transition duration-300 hover:translate-x-1 hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            Connect
          </h4>

          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            admissions@aurorait.edu.in
            <br />
            +91 422 430 2200
          </p>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-slate-200 bg-white/5 py-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} {UNIVERSITY.shortName}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;