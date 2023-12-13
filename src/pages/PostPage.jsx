import styles from "../styles/prueba.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import Post from "../components/Post";
import RequireAuth from "../providers/RequireAuth";
import { Sidebar } from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <Header />
          <Sidebar />
          <h2>Posteos</h2>
          <main className={styles.section}>
            <Post getPost={getPost} posts={posts} />
          </main>
          <Footer />
        </div>
      }
    />
  );
}
export default PostPage;
