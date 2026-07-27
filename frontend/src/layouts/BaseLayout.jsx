import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BaseLayout() {
  const { pathname, search } = useLocation();

  // Guarantee every navigation lands at the very top of the page (scroll position 0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-surface-base text-text-main font-sans">
      {/* Background glowing gradients contained inside viewport bounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'var(--ambient-indigo)' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'var(--ambient-sky)' }}
        />
      </div>

      <Navbar />

      <main className="flex-grow pt-20" id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
