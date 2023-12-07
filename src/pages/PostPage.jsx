import styles from "../styles/prueba.module.css";

import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import RequireAuth from "../providers/RequireAuth";

function PostPage() {
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  const getPost = useCallback(() => {
    console.log("Token de authentication:", auth.token);
    fetch(`${API_URL}/post`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, [auth.token]);

  useEffect(() => {
    getPost();
  }, [auth, getPost]);

  return (
    <RequireAuth
      element={
        <div className={styles.container}>
          <Navbar />
          <h1>Mis Posteos</h1>
          <main className={styles.section}>
            <Post getPost={getPost} posts={posts} />
          </main>
        </div>
      }
    />
  );
}
export default PostPage;
