'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isParentAuthenticated: boolean;
  verifyParentPin: (success: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true, 
  isAdmin: false,
  isParentAuthenticated: false,
  verifyParentPin: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isParentAuthenticated, setIsParentAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const path = `accounts/${user.uid}`;
        try {
          const userRef = doc(db, 'accounts', user.uid);
          const userDoc = await getDoc(userRef);
          const isAdminInDb = userDoc.data()?.role === 'admin';
          const isWhitelisted = user.email === 'fanfeklab@gmail.com';
          setIsAdmin(isAdminInDb || isWhitelisted);
        } catch (error) {
          console.warn("Failed to fetch user role, defaulting to user permissions:", error);
          setIsAdmin(user.email === 'fanfeklab@gmail.com');
        }
      } else {
        setIsAdmin(false);
        setIsParentAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const verifyParentPin = (success: boolean) => {
    setIsParentAuthenticated(success);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, isParentAuthenticated, verifyParentPin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
