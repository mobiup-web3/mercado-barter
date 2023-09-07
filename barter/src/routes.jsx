import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Onboarding } from './pages/Onboarding';
import { Register } from './pages/Register';
import { Item } from './pages/Item';
import { Error404 } from './pages/Error404';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="register" element={<Register />} />
      <Route path="p/:profile" element={<Marketplace />} />
      <Route path="item/:item" element={<Item />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
