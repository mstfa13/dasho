'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  useEffect(() => {
    // Initialize with demo user if no users exist
    const storedUsers = JSON.parse(localStorage.getItem('dasho-users') || '{}');
    if (Object.keys(storedUsers).length === 0) {
      // Create demo user
      const demoUser = {
        id: 'demo-user-1',
        email: 'demo@dasho.com',
        displayName: 'Demo User',
        password: 'demo123',
        createdAt: new Date().toISOString(),
      };
      storedUsers['demo@dasho.com'] = demoUser;
      localStorage.setItem('dasho-users', JSON.stringify(storedUsers));
    }
    
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('dasho-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('dasho-user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('dasho-users') || '{}');
    const userKey = email.toLowerCase();
      if (storedUsers[userKey] && storedUsers[userKey].password === password) {
      const userData = storedUsers[userKey];
      const user: User = {
        id: userData.id,
        email: userData.email,
        displayName: userData.displayName,
        createdAt: new Date(userData.createdAt),
      };
      setUser(user);
      localStorage.setItem('dasho-user', JSON.stringify(user));
    } else {
      throw new Error('Invalid email or password. Try demo@dasho.com / demo123 or sign up for a new account.');
    }
    
    setLoading(false);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('dasho-users') || '{}');
    const userKey = email.toLowerCase();
    
    if (storedUsers[userKey]) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      displayName,
      createdAt: new Date(),
    };
    
    // Store user data
    storedUsers[userKey] = {
      ...newUser,
      password,
      createdAt: newUser.createdAt.toISOString(),
    };
    
    localStorage.setItem('dasho-users', JSON.stringify(storedUsers));
    localStorage.setItem('dasho-user', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem('dasho-user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
