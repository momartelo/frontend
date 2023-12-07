import styles from "../styles/prueba.module.css";
import { Link } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

function HomePage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <h1>Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        labore placeat repellendus earum eum obcaecati tempora ipsum ab magnam
        impedit, quod dolores eos soluta voluptatum eveniet fuga eius. Laborum,
        quasi?
      </p>
      <Link to="/post">Ir a los Posteos</Link>
    </div>
  );
}
export default HomePage;
