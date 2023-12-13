import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";

const EditPostForm = ({ post }) => {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState(post.title);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newImage, setNewImage] = useState(post.image);

  const handleEdit = async () => {
    const response = await fetch(`${API_URL}/post/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        image: newImage,
      }),
    })
      .then(async (data) => {
        console.log("Response data:", data);
        if (data.status !== 200) {
          alert(`Error al editar el post. Detalles: ${JSON.stringify(data)}`);
        } else {
          navigate("/");
        }
      })
      .catch(async (error) => {
        console.error("Error during edit:", error);
        alert(
          "Error al editar el post. Consulta la consola para más detalles."
        );
      });
  };

  return (
    <div>
      <label htmlFor="newTitle">Nuevo Titulo:</label>
      <input
        type="text"
        id="newTitle"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <label htmlFor="newDescription">Nueva Descripcion:</label>
      <input
        type="text"
        id="newDescription"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <label htmlFor="newImage">Nueva URL Imagen:</label>
      <input
        type="text"
        id="newImage"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
      />
      <button onClick={handleEdit}>Aplicar Cambios</button>
    </div>
  );
};

export default EditPostForm;
