import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import styles from "../styles/Notfound.css";
//import AlertLink from "../components/Alert";

function NotFoundPage() {
  return (
    <div className="container notfound">
      <Sidebar />
      <Header />
      {/* <AlertLink /> */}
      <img src="../img/imagen404.png" alt="Imagen Pagina No Encontrada" />
      <Link to="/">Volver</Link>
      <Footer />
    </div>
  );
}
export default NotFoundPage;
