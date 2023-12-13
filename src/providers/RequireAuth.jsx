import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (!auth || !auth.isAuthenticated) {
    console.log(
      "Usuario no autenticado. Redirige a la página de inicio de sesión"
    );
    return <Navigate to="/login" />;
  }

  return element;
};

export default RequireAuth;
