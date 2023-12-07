import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
//import styles from "../styles/Notfound.css";
//import AlertLink from "../components/Alert";

function NotFoundPage() {
  return (
    <div className="container notfound">
      <Navbar />
      {/* <AlertLink /> */}
      <img src="../img/imagen404.png" alt="Imagen Pagina No Encontrada" />
      <Link to="/">Volver</Link>
    </div>
  );
}
export default NotFoundPage;
