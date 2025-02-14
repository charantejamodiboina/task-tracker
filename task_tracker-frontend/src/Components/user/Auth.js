import {createContext, useContext, useState} from 'react'
const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext);
  };
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null)
    const [role, setRole] = useState(localStorage.getItem('role') || null)

    const login = (newToken, id, userRole) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('userId', id)
        localStorage.setItem('role', userRole)
        setToken(newToken)
        setUserId(id)
        setRole(userRole)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('role')
        setToken(null)
        setUserId(null)
        setRole(null)
    }
    return (
        <AuthContext.Provider value={{role, userId, token, login, logout}}>{children}</AuthContext.Provider>
    )

}
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
