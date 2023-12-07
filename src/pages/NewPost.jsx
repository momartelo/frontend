import { useContext, useId, useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NewPost = () => {
  const titleId = useId();
  const descriptionId = useId();
  const imageId = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !image.trim()) {
      return alert("Por favor, complete todos los campos");
    }
    console.log({ auth: auth.token });
    if (!title.trim()) return;

    fetch(`${API_URL}/post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
      }),
    }).then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error ${res.status}: ${errorData.error}`);
      }

      setTitle("");
      setDescription("");
      setImage("");

      navigate("/post");
    });
  };

  return (
    <div>
      <Navbar />
      <h2>Crear un nuevo Post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={titleId}>Title:</label>
          <input
            type="text"
            id={titleId}
            placeholder="Mi nuevo Post"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={descriptionId}>Descripcion:</label>
          <textarea
            id={descriptionId}
            placeholder="Descripcion del post"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={imageId}>Imagen URL:</label>
          <input
            type="text"
            id={imageId}
            placeholder="URL de la imagen"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewPost;
