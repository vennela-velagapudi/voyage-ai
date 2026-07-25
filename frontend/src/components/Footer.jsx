import { Link } from 'react-router-dom';
import { PlaneTakeoff, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 z-10 relative">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2" id="footer-logo-link">
              <PlaneTakeoff className="h-6 w-6 text-indigo-500" />
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                Voyage AI
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Making travel planning effortless. Craft personalized itineraries tailored to your
              unique interests and destination choices in seconds with advanced AI.
            </p>
            {/* Social icons */}
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-twitter"
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-github"
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-linkedin"
                className="text-slate-500 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/features"
                  id="footer-link-features"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  id="footer-link-pricing"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="#integrations"
                  id="footer-link-integrations"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#about"
                  id="footer-link-about"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  id="footer-link-privacy"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  id="footer-link-terms"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Voyage AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-600">Engineered for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
