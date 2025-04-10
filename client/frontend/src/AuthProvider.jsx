import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loginUser = async () => {
      const response = await fetch(apiUrl + "/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        setUser(null);
        throw new Error("Not authenticated");
      }

      const data = await response.json();
      setUser(data);
    };

    loginUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
