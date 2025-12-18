import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, logoutUser, subscribeToAuthChanges } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const login = async (email, password) => {
        return await loginUser(email, password)
    }

    const logout = async () => {
        return await logoutUser()
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
