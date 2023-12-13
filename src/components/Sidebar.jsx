import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaList, FaEnvelope, FaCog } from "react-icons/fa";
import "../styles/styles.css";

const navItems = [
  { name: "Inicio", icon: <FaHome />, path: "/" },
  { name: "Posteos", icon: <FaList />, path: "/post" },
  { name: "Correo", icon: <FaEnvelope />, path: "/email" },
  { name: "Configuración", icon: <FaCog />, path: "/settings" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-inner">
        <header className="sidebar-header">
          <button
            type="button"
            className="sidebar-burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </header>
        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="sidebar-button"
              activeclassname="active"
            >
              <span className="material-symbols-outlined icono">
                {item.icon}
              </span>
              <p className="texto-sidebar">{item.name}</p>
            </NavLink>
          ))}
        </nav>
      </div>
    </nav>
  );
};
