import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.css";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Tu Sitio de Viajes. Todos los derechos reservados.</p>
        <div className={styles.socialLinks}>
          <Link
            to="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1877f2", fontSize: "25px" }}
          >
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link
            to="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1DA1F2", fontSize: "25px" }}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link
            to="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#405DE6", fontSize: "25px" }}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
