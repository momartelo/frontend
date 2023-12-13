import styles from "../styles/prueba.module.css";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <div>
        <h1>Explora el Mundo a Través de Experiencias Únicas</h1>
        <br />
        <p>
          ¡Bienvenido a nuestra plataforma de posteos de viajes! Explora las
          experiencias únicas de viajeros de todo el mundo. Descubre destinos
          fascinantes, consejos prácticos y aventuras emocionantes que te
          inspirarán a planificar tu próxima travesía.
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default HomePage;
