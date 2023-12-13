import { useEffect, useState } from "react";
import PlayItem from "./PlayItem";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Post.module.css";

const Post = ({ posts, getPost }) => {
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((post) => {
      const searchTerm = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm)
      );
    });

    setFilterPosts(filtered);
  }, [search, posts]);

  return (
    <div className={styles.postcontainer}>
      <div>
        <input
          type="search"
          className={styles.postinput}
          placeholder=" Busqueda automatica por nombre posteo"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <span className="material-symbols-outlined">search</span>
      </div>
      <article>
        <Link to="/post/new">Crear Post Nuevo</Link>
      </article>

      <>
        {filterPosts.map((post) => {
          return (
            <PlayItem
              getPost={getPost}
              key={post._id}
              post={post}
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Post;
