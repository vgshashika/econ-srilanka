"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const TOKEN_KEY = "ecomlanka_auth_token";
const USER_KEY = "ecomlanka_auth_user";
const LEGACY_TOKEN_KEY = "auth_token";
const LEGACY_USER_KEY = "auth_user";

function getStorage(remember = true) {
  return remember ? localStorage : sessionStorage;
}

function setCookie(name, value, maxAge) {
  if (typeof document === "undefined") return;
  const parts = [`${name}=${value}`, "path=/", "SameSite=Lax"];
  if (maxAge) parts.push(`max-age=${maxAge}`);
  document.cookie = parts.join("; ");
}

function deleteCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}

function readStoredValue(key) {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key) ?? sessionStorage.getItem(key) ?? null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const persistedToken =
      readStoredValue(TOKEN_KEY) ||
      readStoredValue(LEGACY_TOKEN_KEY);
    const persistedUser =
      readStoredValue(USER_KEY) ||
      readStoredValue(LEGACY_USER_KEY);

    if (persistedToken && persistedUser) {
      setToken(persistedToken);
      try {
        setUser(JSON.parse(persistedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  function signIn(tokenValue, userData, remember = true) {
    const storage = getStorage(remember);
    storage.setItem(TOKEN_KEY, tokenValue);
    storage.setItem(USER_KEY, JSON.stringify(userData));

    // Backward-compatible legacy keys for existing consumers.
    localStorage.setItem(LEGACY_TOKEN_KEY, tokenValue);
    localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(userData));
    sessionStorage.setItem(LEGACY_TOKEN_KEY, tokenValue);
    sessionStorage.setItem(LEGACY_USER_KEY, JSON.stringify(userData));

    const maxAge = remember ? 60 * 60 * 24 * 30 : 0;
    setCookie("auth_token", tokenValue, maxAge);

    setToken(tokenValue);
    setUser(userData);
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(LEGACY_TOKEN_KEY);
    sessionStorage.removeItem(LEGACY_USER_KEY);
    deleteCookie("auth_token");
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
