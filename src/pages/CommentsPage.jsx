import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
//import styles from "../styles/AuthForm.module.css";

const CommentsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

  // const getPost = () => {
  //   fetch(`${API_URL}/post/${postId}`, {
  //     headers: {
  //       Authorization: auth.token,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         throw new Error(`Error ${res.status}: ${res.statusText}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data) {
  //         setPost(data);
  //       } else {
  //         console.warn("El post not found");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error al traer el posteo:", error.message);
  //       // Puedes mostrar un mensaje de error al usuario o manejarlo de otra manera
  //     });
  // };

  const getPost = async () => {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        headers: {
          Authorization: auth.token,
        },
      });

      if (response.status === 404) {
        console.warn("El post no fue encontrado.");
        navigate("/post");
        return;
      }

      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data) {
        setPost(data);
      } else {
        console.warn("El post ya no existe.");
        navigate("/post");
        return;
      }
    } catch (error) {
      console.error("Error al traer el posteo:", error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId, auth]);

  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Error deleting comment:", res.status, res.statusText);
          return alert("Error borrando el comentario");
        }
        getPost();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        alert("Error borrando el comentario");
      });
  };

  const handleCreateNewComment = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch(`${API_URL}/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: formData.get("comment"),
        //author: formData.get("author"),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Lógica después de la creación del comentario (si es necesario)
        getPost();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
        alert("error creando el nuevo comentario");
      });
    formRef.current.reset();
  };

  if (!post) return <h1>Loading...</h1>;

  return (
    <div>
      <Navbar />
      <h1>{post.title}</h1>
      <form onSubmit={handleCreateNewComment} ref={formRef}>
        <div>
          <label>Comentario:</label>
          <input type="text" name="comment" placeholder="comentario" />
        </div>
        {/* <div className={styles.inputGroup}>
        <input type="text" name="author" placeholder="author" />
        </div> */}
        <button>Crear Nuevo Comentario</button>
      </form>
      {post.comments.map((comment) => {
        return (
          <div key={comment.id} className="comment">
            <h2>{comment.name}</h2>
            {/* <p>
              <i>{comment.artist}</i> {music.year}
            </p> */}
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <HiOutlineTrash />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsPage;
