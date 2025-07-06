import LocalStorageService from '../../shared/utils/localStorageService/localStorageService.ts';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!LocalStorageService.getAccessToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div style={{ padding: '10px 10px 0' }}>{children}</div>;
};
