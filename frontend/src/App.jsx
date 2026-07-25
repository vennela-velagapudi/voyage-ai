import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Features from './pages/Features';
import Pricing from './pages/Pricing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
