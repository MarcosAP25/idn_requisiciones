  import React from 'react';
  import { useAuth } from '../context/AuthContext';
  import Login from '../components/Auth/Login';

  interface PrivateRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!user) {
      return <Login />;
    }

    if (adminOnly && user.role !== 'admin') {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
            <p className="text-gray-600">No tiene permisos para acceder a esta página.</p>
          </div>
        </div>
      );
    }

    return <>{children}</>;
  };

  export default PrivateRoute;