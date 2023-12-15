import styles from "../styles/Register.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";

function RegisterForm() {
  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const avatar = formData.get("avatar");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      avatar,
      email,
      username,
      password,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) return alert("Error al registrar usuario");
    ref.current.reset();

    navigate("/login");
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} ref={ref} className={styles.formregister}>
        <div className={styles.inputregister}>
          <label>URL Imagen Avatar</label>
          <input type="url" placeholder="URL imagen" name="avatar" />
        </div>
        <div className={styles.inputregister}>
          <label>Email</label>
          <input type="email" placeholder="my-email@email.com" name="email" />
        </div>
        <div className={styles.inputregister}>
          <label>Username</label>
          <input type="text" placeholder="nombre" name="username" />
        </div>
        <div className={styles.inputregister}>
          <label>Password</label>
          <input type="password" placeholder="*******" name="password" />
        </div>
        <button>Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
