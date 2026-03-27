import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur">
      <div className="container-app flex items-center justify-between py-4">
        <Link to="/" className="group">
          <p className="font-['Poppins'] text-lg font-bold tracking-tight text-slate-100">
            {UNIVERSITY.shortName}
          </p>
          <p className="text-xs font-medium text-slate-300 transition group-hover:text-accent">
            {UNIVERSITY.tagline}
          </p>
        </Link>

        <button
          className="btn btn-secondary lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "bg-white/10 text-slate-50 ring-1 ring-white/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-slate-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="grid gap-2 border-t border-white/10 bg-ink/80 px-4 py-4 backdrop-blur lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "bg-white/10 text-slate-50 ring-1 ring-white/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-slate-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
