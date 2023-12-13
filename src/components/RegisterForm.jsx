import styles from "../styles/AuthForm.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";

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
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
        <div className={styles.inputGroup}>
          <input type="url" placeholder="www.my-avatar.com" name="avatar" />
        </div>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="my-email@email.com" name="email" />
        </div>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="nombre" name="username" />
        </div>
        <div className={styles.inputGroup}>
          <input type="password" placeholder="*******" name="password" />
        </div>
        <button>Registrar</button>
      </form>
    </div>
  );
}

export default RegisterForm;
