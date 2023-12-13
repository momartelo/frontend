import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // Importa AuthContext
import UserAvatar from "./UserAvatar";
import styles from "../styles/header.module.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.headercomponent}>
      <img src="/src/img/avatar.jpg" alt="logo" />
      <div>
        <h3>Blog de viajes</h3>
      </div>
      <div>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;
