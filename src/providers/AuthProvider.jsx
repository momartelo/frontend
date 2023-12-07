import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(undefined);

  const login = ({ user, token }) => {
    setAuth({ user, token, isAuthenticated: true });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
  };

  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      // si no tenemos alguno de los dos campos en el localStorage borramos todo
      if (!user || !token) {
        console.log("No hay usuario o token");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setAuth(null);
        return;
      }

      console.log("Usuario authenticated", user);
      setAuth({ user, token });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
