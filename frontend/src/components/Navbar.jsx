import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlaneTakeoff, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  const scrollToPlanner = () => {
    setIsOpen(false);
    const element = document.getElementById('trip-planner-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group" id="nav-logo-link">
              <div className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
                <PlaneTakeoff className="h-6 w-6" />
              </div>
              <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                Voyage AI
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors duration-200 py-2 ${
                    isActive(link.path)
                      ? 'text-indigo-400 font-bold drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <button
              onClick={scrollToPlanner}
              id="nav-cta-btn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 glow-effect shadow-md hover:scale-103 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Plan a Trip</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none border border-slate-800"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-400 bg-indigo-500/15 border border-indigo-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-800/80">
              <button
                onClick={scrollToPlanner}
                id="mobile-nav-cta-btn"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-bold px-4 py-3 rounded-xl shadow-lg transition-all duration-200"
              >
                <Sparkles className="h-4 w-4" />
                <span>Plan a Trip Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
