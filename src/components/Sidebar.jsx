import { useState } from "react";
import "../styles/styles.css";

const navItems = ["home", "settings", "backup", "mail", "cloud", "layers"];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          {/* <img src={logo} className="sidebar-logo" alt="Logo" /> */}
        </header>
        <nav className="sidebar-menu">
          {navItems.map((item) => (
            <button key={item} type="button" className="sidebar-button">
              <span className="material-symbols-outlined icono">{item}</span>
              <p className="texto-sidebar">{item}</p>
            </button>
          ))}
        </nav>
      </div>
    </nav>
  );
};
