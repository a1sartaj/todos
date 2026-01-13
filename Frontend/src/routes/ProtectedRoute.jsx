import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    // Wait for backend auth verification, otherwise it may redirect to /login even if user is logged in
    if (loading) return null;

    // If not logged in, redirect safely
    if (!user) {
        return (<Navigate
            to="/login"
            replace
            state={{ from: location.pathname }}
        />)
    }

    return children;
};

export default ProtectedRoute;

