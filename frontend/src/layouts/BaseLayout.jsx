import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-grow pt-20" id="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
