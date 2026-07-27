import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PlaneTakeoff } from 'lucide-react';
import ThemeToggle from './common/ThemeToggle';

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border-theme backdrop-blur-xl bg-surface-base/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Clickable and navigates to Home (/) */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 group min-h-[44px] min-w-[44px]"
              id="nav-logo-link"
            >
              <div className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform">
                <PlaneTakeoff className="h-6 w-6" />
              </div>
              <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-text-main via-text-body to-indigo-400 bg-clip-text text-transparent">
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
                      ? 'text-indigo-500 dark:text-indigo-400 font-bold drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Theme Toggle Controls */}
          <div className="hidden md:flex items-center w-32 justify-end">
            <ThemeToggle />
          </div>

          {/* Mobile menu toggle & Theme switch */}
          <div className="md:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-btn"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-surface-hover/80 focus:outline-none border border-border-theme transition-colors"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border-theme bg-surface-card/98 backdrop-blur-2xl shadow-2xl">
          <div className="px-4 pt-3 pb-6 space-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center min-h-[44px] px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/15 border border-indigo-500/20 font-bold shadow-sm'
                    : 'text-text-muted hover:text-text-main hover:bg-surface-hover/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
