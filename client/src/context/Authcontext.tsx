<<<<<<< HEAD
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { deleteUser as apiDeleteUser } from '../api/axios';
=======
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
import { User, AuthContextType as IAuthContext, OrganizerInfo } from '../assets/types';
import debounce from 'lodash.debounce';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const _checkAuthStatus = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser({
        ...res.data.user,
        organizerInfo: res.data.user.organizerInfo ? {
          ...res.data.user.organizerInfo,
          paypalAccountStatus: res.data.user.organizerInfo.paypalAccountStatus || 'not_connected',
          paypalMerchantId: res.data.user.organizerInfo.paypalMerchantId || null
        } : null
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const debouncedCheckAuthStatus = debounce(_checkAuthStatus, 500);

  const checkAuthStatus = async () => {
    return new Promise<void>((resolve) => {
      debouncedCheckAuthStatus();
      resolve();
    });
  };

  useEffect(() => {
    return () => {
      debouncedCheckAuthStatus.cancel();
    };
<<<<<<< HEAD
  }, [debouncedCheckAuthStatus]);
=======
  }, []);
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  
  useEffect(() => {
    checkAuthStatus();
  }, []);

<<<<<<< HEAD
 const login = async (email: string, password: string, rememberMe: boolean = false) => {
  try {
    const res = await API.post('/auth/login', { 
      email, 
      password, 
      rememberMe 
    }, { withCredentials: true });
    
    setUser(res.data.user);
    await _checkAuthStatus();
    setIsAuthenticated(true);
    setError(null);
    
    navigate('/profile');
  } catch (error: unknown) {
    const errorResponse = error as { response?: { data?: { msg?: string } } };
    setError(errorResponse.response?.data?.msg || 'Login failed');
    throw error;
  }
};
=======
  const login = async (email: string, password: string) => {
    try {
      const res = await API.post('/auth/login', { email, password }, { withCredentials: true });
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Login failed');
      throw error;
    }
  };
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authState');
      navigate('/login');
    }
  };

  const refreshToken = async () => {
    try {
      await API.post('/auth/refresh-token', {}, {
        withCredentials: true
      });
      await debouncedCheckAuthStatus();
    } catch (error) {
      logout();
    }
  };

  const upgradeToOrganizer = async (organizerData: Omit<OrganizerInfo, 'createdAt'>) => {
    try {
      const res = await API.post('/auth/upgrade-to-organizer', organizerData);
      setUser(prev => prev ? {
        ...prev,
        organizerInfo: {
          ...res.data.organizerInfo,
          verified: false,
          paypalAccountStatus: 'not_connected',
          paypalMerchantId: null
        }
      } : null);
      await debouncedCheckAuthStatus();
      return res.data;
<<<<<<< HEAD
    } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { msg?: string } } };
      setError(errorResponse.response?.data?.msg || 'Organization registration failed');
=======
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Organization registration failed');
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
      throw error;
    }
  };
  
  const isVerifiedOrganizer = (user?.role === 'organizer' && 
    user?.organizerInfo?.paypalAccountStatus === 'verified') || false;
    
  const verifyEmail = async () => {
    try {
      const res = await API.post('/auth/send-verification-email', {}, { withCredentials: true });
      return res.data;
<<<<<<< HEAD
    } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: { msg?: string } } };
      setError(errorResponse.response?.data?.msg || 'Failed to send verification email');
=======
    } catch (error: any) {
      setError(error.response?.data?.msg || 'Failed to send verification email');
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
      throw error;
    }
  };

  const confirmEmailVerification = async (token: string) => {
    try {
      const response = await API.post('/auth/verify-email', { token });
      if (response.data.success) {
        await checkAuthStatus();
        return true;
      }
      return false;
<<<<<<< HEAD
    } catch (error: unknown) {
      const errorResponse = error as { response?: { data?: any }; message?: string };
      console.error('Verification error:', errorResponse.response?.data || errorResponse.message);
=======
    } catch (error: any) {
      console.error('Verification error:', error.response?.data || error.message);
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
      throw error;
    }
  };
  
<<<<<<< HEAD
  const deleteAccount = async () => {
    try {
      await apiDeleteUser();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authState');
      navigate('/login');
    } catch (err) {
      setError('Failed to delete account');
      throw err;
    }
  };

=======
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      error,
      refreshToken,
      upgradeToOrganizer,
      verifyEmail,
      checkAuthStatus,
      confirmEmailVerification,
      isVerifiedOrganizer,
      updateUser: async (userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null);
<<<<<<< HEAD
      },
      deleteAccount
=======
      }
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};