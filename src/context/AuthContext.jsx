import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedRefreshToken && storedUser) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.login(email, password);

            if (response.success) {
                const { user: userData, token: accessToken, refreshToken: newRefreshToken } = response.data;

                setUser(userData);
                setToken(accessToken);
                setRefreshToken(newRefreshToken);

                // Store in localStorage
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                localStorage.setItem('user', JSON.stringify(userData));

                return { success: true };
            }

            return { success: false, message: response.data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.register(userData);

            if (response.success) {
                return { success: true, message: 'Registration successful! Please login.' };
            }

            return { success: false, message: response.data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    const refreshAccessToken = async () => {
        try {
            const response = await api.refreshToken(refreshToken);

            if (response.success) {
                const newToken = response.data.token;
                setToken(newToken);
                localStorage.setItem('token', newToken);
                return newToken;
            }

            // If refresh fails, logout user
            logout();
            return null;
        } catch (error) {
            logout();
            return null;
        }
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        refreshAccessToken,
        isAuthenticated: !!user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
