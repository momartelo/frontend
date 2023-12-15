import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Comments.module.css";
//import styles from "../styles/AuthForm.module.css";

const CommentsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

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
    console.log("Fetching post. postId:", postId, "auth:", auth);
    getPost();
  }, [postId, auth]);

  const handleDeleteComment = (commentId) => {
    console.log("Deleting comment. postId:", postId, "commentId:", commentId);
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
    const commnetText = formData.get("comment");

    if (!commnetText.trim()) {
      alert("No se puede crear un comentario vacio");
      return;
    }
    console.log(
      "Creating new comment. postId:",
      postId,
      "commentText:",
      commnetText
    );

    fetch(`${API_URL}/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        comment: commnetText,
        //comment: formData.get("comment"),
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
      <Header />
      <Sidebar />

      {post && (
        <div className={styles.divcomments}>
          <h1>{post.title}</h1>
          <h2>{post.description}</h2>
          <img src={post.image} alt="" />
        </div>
      )}

      <form onSubmit={handleCreateNewComment} ref={formRef}>
        <div>
          <label>Comentarios:</label>
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
            {
              <p>
                <i>{comment.comment}</i> {comment.date}
              </p>
            }
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <HiOutlineTrash />
            </button>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default CommentsPage;
