import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Auth state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()

    // Check logged-in user
    const fetchUser = async () => {

        try {
            const response = await axiosInstance.get("/api/auth/me");
            setUser(response.data.user);
        } catch (error) {
            // 401 is handled globally by axios interceptor
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    const logout = async () => {
        try {
            const response = await axiosInstance.post('/api/auth/logout')

            toast.success(response.data.message)
            setUser(null)
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to logged out'
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    useEffect(() => {
        const tokenExpiredLogout = () => {
            setUser(null)
        }

        // AxiosInstace me window.dispatchEver ke baad ye chalega auth-logout ke wajah se
        window.addEventListener('auth-logout', tokenExpiredLogout)

        return () => window.removeEventListener('auth-logout', tokenExpiredLogout)


    }, [navigate, location.pathname])

    return (
        <AuthContext.Provider value={{ user, loading, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
