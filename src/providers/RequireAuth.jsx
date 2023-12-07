import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const RequireAuth = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (!auth || !auth.isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    console.log(
      "User not authenticated. Redirige a la página de inicio de sesión"
    );
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el elemento original
  return element;
};

export default RequireAuth;
