import { Routes, Route } from 'react-router-dom';
import { PrivateRouter } from './auth-validation/private-router';
import { Dashboard } from './pages/dashboard';
import { Home } from './pages/home';
import { Login } from './pages/login';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        }
      />
    </Routes>
  );
}
