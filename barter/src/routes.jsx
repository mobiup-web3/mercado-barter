import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding';
import { Validate } from './pages/Validate';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="validate" element={<Validate />} />
      <Route path="account" element={<Profile />} />
      <Route path="*" element={<h1>ERRO 404</h1>} />
    </Routes>
  );
};
