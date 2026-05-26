"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';

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
    const supabase = createClient();

    // Initialize user session from localStorage
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
            const { data: users, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('email', email)
                .eq('password', password);

            if (error) {
                return { success: false, message: error.message };
            }

            const matchedUser = users && users.length > 0 ? users[0] : null;

            if (matchedUser) {
                const { password: _, ...userWithoutPassword } = matchedUser;
                const mockToken = `mock-token-${matchedUser.id}-${Date.now()}`;
                const mockRefreshToken = `mock-refresh-${matchedUser.id}-${Date.now()}`;

                setUser(userWithoutPassword);
                setToken(mockToken);
                setRefreshToken(mockRefreshToken);

                // Store in localStorage
                localStorage.setItem('token', mockToken);
                localStorage.setItem('refreshToken', mockRefreshToken);
                localStorage.setItem('user', JSON.stringify(userWithoutPassword));

                return { success: true };
            }

            return { success: false, message: 'Invalid email or password.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const register = async (newUserForm) => {
        try {
            // Check if email exists
            const { data: existingUser } = await supabase
                .from('profiles')
                .select('id')
                .eq('email', newUserForm.email);

            if (existingUser && existingUser.length > 0) {
                return { success: false, message: 'User with this email already exists.' };
            }

            // Generate UUID natively in Postgres via gen_random_uuid(), so we omit 'id'
            // But we can't easily omit 'id' if the client needs to know it immediately unless we fetch it back.
            // Using supabase insert with select() returns the inserted row.
            const newUserId = crypto.randomUUID();
            const { data: newUser, error } = await supabase
                .from('profiles')
                .insert([{
                    id: newUserId,
                    name: newUserForm.fullname,
                    email: newUserForm.email,
                    phone: newUserForm.phone_number || null,
                    password: newUserForm.password,
                    type: 'user',
                    joined_date: new Date().toISOString().split('T')[0]
                }])
                .select();

            if (error) {
                return { success: false, message: error.message };
            }

            return { success: true, message: 'Registration successful! Please login.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    const refreshAccessToken = async () => {
        if (refreshToken) {
            const newToken = `mock-token-refreshed-${Date.now()}`;
            setToken(newToken);
            localStorage.setItem('token', newToken);
            return newToken;
        }
        logout();
        return null;
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


