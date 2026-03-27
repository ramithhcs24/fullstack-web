import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS, UNIVERSITY } from "../data/universityData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
        
        {/* Logo */}
        <Link to="/" className="group">
          <p className="text-lg font-bold tracking-tight text-white">
            {UNIVERSITY.shortName}
          </p>
          <p className="text-xs font-medium text-blue-600 transition group-hover:text-blue-700">
            {UNIVERSITY.tagline}
          </p>
        </Link>

        {/* Mobile Button */}
        <button
          className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
<<<<<<< HEAD
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
=======
                    : "text-slate-600 hover:bg-slate-100 hover:text-white"
>>>>>>> 165dce38ccd3b3a6c504d4663fa14275773fb2a6
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-4 mb-4 mt-2 grid gap-2 rounded-2xl border border-slate-200 bg-white/5 p-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
<<<<<<< HEAD
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
=======
                    : "text-slate-600 hover:bg-slate-100 hover:text-white"
>>>>>>> 165dce38ccd3b3a6c504d4663fa14275773fb2a6
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;