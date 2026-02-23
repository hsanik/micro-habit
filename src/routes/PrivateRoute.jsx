import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router';
import AuthContext from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;
