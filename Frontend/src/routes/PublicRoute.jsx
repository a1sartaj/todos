import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
    
    const { user, loading } = useContext(AuthContext)
    
    // Wait for backend auth verification, otherwise it may redirect to /login even if user is logged in
    if (loading) return null
    
    if (user && location.pathname === "/login" ) {
        return <Navigate to='/' replace />
    }

    return children
}

export default PublicRoute
