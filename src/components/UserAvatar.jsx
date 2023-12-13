import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import styles from "../styles/prueba.module.css"; 

const UserAvatar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    navigate("/post/");
    return null;
  }

  return (
    <div className={styles.userAvatar}>
      <Link to="/profile">
        <img src={auth.user.avatar} alt="Avatar" />
        <span>{auth.user.name}</span>
      </Link>
      <button onClick={() => logout(navigate)} className={styles.logoutButton}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default UserAvatar;
