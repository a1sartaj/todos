import axios from "axios";

// If I use it, we don't need to write everywhere this axios.post(backendURL/api/auth, data, {withCredentials : true}). I can use only this axiosInstance('/api/auth', data) it will automatically take backend URL and withCredentials.

// Without this I have to write this everywhere axios.post(backendURL/api/auth, data, {withCredentials}).
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
})

// Globel 401 handler
axiosInstance.interceptors.response.use(
    (response) => response, // Do nothing if success status code 2XX

    (error) => {
        if (error.response?.status === 401) {
            // Cookies Expired
            // window.location.href = '/login';
            window.dispatchEvent(new Event('auth-logout'))
        }

        return Promise.reject(error) // Without this catch block will not run in my code that'why I couldn't run toast notificaiton that's why I need to write this.
    }

)




export default axiosInstance;