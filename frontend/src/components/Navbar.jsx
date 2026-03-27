import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        <Link to="/" className="group">
          <p className="text-lg font-bold text-slate-900">{UNIVERSITY.shortName}</p>
          <p className="text-xs font-medium text-blue-600 group-hover:text-blue-700">
            {UNIVERSITY.tagline}
          </p>
        </Link>

        <button
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100 lg:hidden"
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
                `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="grid gap-2 border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
