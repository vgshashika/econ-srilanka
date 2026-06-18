"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);   // { name, email, role, company }
  const [token,   setToken]   = useState(null);
  const [loading, setLoading] = useState(true);

  function getStorage(remember = true) {
    return remember ? localStorage : sessionStorage;
  }

  useEffect(() => {
    const persistedToken =
      localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    const persistedUser =
      localStorage.getItem("auth_user") || sessionStorage.getItem("auth_user");

    if (persistedToken && persistedUser) {
      setToken(persistedToken);
      try { setUser(JSON.parse(persistedUser)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  function signIn(tokenValue, userData, remember = true) {
    const storage = getStorage(remember);
    storage.setItem("auth_token", tokenValue);
    storage.setItem("auth_user", JSON.stringify(userData));
    setToken(tokenValue);
    setUser(userData);
  }

  function signOut() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
