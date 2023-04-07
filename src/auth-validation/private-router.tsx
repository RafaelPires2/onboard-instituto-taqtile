import { Navigate } from 'react-router-dom';

export function PrivateRouter({ children }: { children: JSX.Element }) {
  const Token = localStorage.getItem('token');

  return Token !== null ? children : <Navigate to='/login' />;
}
