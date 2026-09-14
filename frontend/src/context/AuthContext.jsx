import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  const persistUser = (userPayload) => {
    setUser(userPayload);
    localStorage.setItem('userInfo', JSON.stringify(userPayload));
  };

  const refreshProfile = async (sessionUser = user) => {
    if (!sessionUser?.token) return { success: false, error: 'No active session.' };
    setProfileLoading(true);
    setProfileError('');
    try {
      const { data } = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${sessionUser.token}` },
      });
      persistUser({ ...sessionUser, ...data, token: sessionUser.token, avatar: data.avatar || data.profileImage || '' });
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.message || 'Could not load your profile.';
      setProfileError(message);
      return { success: false, error: message };
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const sessionUser = userInfo ? JSON.parse(userInfo) : null;
    if (!sessionUser) {
      setLoading(false);
      return;
    }
    setUser(sessionUser);
    refreshProfile(sessionUser).finally(() => setLoading(false));
  }, []);

  const login = async (email, password, avatar = '') => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        avatar,
        profileImage: avatar,
      });
      const userPayload = { ...data, avatar: data.avatar || data.profileImage || avatar || '' };
      persistUser(userPayload);
      // Redirect based on role
      const redirectTo = data.role === 'admin' ? '/admin' : '/dashboard';
      return { success: true, redirectTo };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials',
      };
    }
  };

  const register = async (name, email, password, avatar = '', bio = '') => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        avatar,
        profileImage: avatar,
        bio,
      });
      return {
        success: true,
        redirectTo: `/login?registered=1&email=${encodeURIComponent(data.email || email.trim().toLowerCase())}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const updateProfile = async (avatar, bio) => {
    try {
      if (!user?.token) return { success: false, error: 'Your session has expired. Please sign in again.' };
      setProfileError('');
      const { data } = await axios.put(`${API_URL}/profile`, { avatar, profileImage: avatar, bio }, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const userPayload = { ...user, ...data, avatar: data.avatar || data.profileImage || '' };
      persistUser(userPayload);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed.';
      setProfileError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, profileLoading, profileError, login, register, refreshProfile, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
