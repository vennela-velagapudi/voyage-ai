import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlaneTakeoff } from 'lucide-react';

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" id="nav-logo-link">
              <PlaneTakeoff className="h-7 w-7 text-indigo-500" />
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                Voyage AI
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-indigo-400 font-semibold'
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
              id="nav-cta-btn"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all-custom glow-effect shadow-md hover:scale-102"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 pt-4 pb-2 border-t border-slate-800">
              <button
                id="mobile-nav-cta-btn"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
