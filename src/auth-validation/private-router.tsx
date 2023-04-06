import { Navigate } from 'react-router-dom';
import { GetToken } from './get-token';

export function PrivateRouter({ children }: { children: JSX.Element }) {
  return GetToken !== null ? children : <Navigate to='/login' />;
}
