import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string; avatar: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthState["user"]>(null);

  const demoUser = { name: "Alex Rivera", email: "alex@salesflow.ai", avatar: "AR", role: "Admin" };

  const login = useCallback(async (_email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 1200));
    setUser(demoUser);
    setIsAuthenticated(true);
  }, []);

  const demoLogin = useCallback(async () => {
    await new Promise(r => setTimeout(r, 800));
    setUser(demoUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
