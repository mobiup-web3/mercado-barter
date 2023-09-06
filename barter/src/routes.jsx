import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="account" element={<Profile />} />
      <Route path="*" element={<h1>ERRO 404</h1>} />
    </Routes>
  );
};
