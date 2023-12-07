import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/consts";

const DeletePostModel = ({ postId, getPost }) => {
  const navigate = useNavigate();
  const [postDeleted, setPostDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    fetch(`${API_URL}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        if (data.status !== 200) {
          alert(`Error al borrar el post. Detalles: ${JSON.stringify(data)}`);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error during delete:", error);
        alert(
          "Error al borrar el post. Consulta la consola para más detalles."
        );
      });
  };

  return (
    <div>
      {/* Botón para mostrar el modal */}
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleDelete()}
      >
        Delete Post
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1">
          {/* Resto del modal... */}
        </div>
      )}
    </div>
  );
};

export default DeletePostModel;
