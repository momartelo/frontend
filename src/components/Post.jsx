import { useEffect, useState } from "react";
import PlayItem from "./PlayItem";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ posts, getPost }) => {
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });

    setFilterPosts(filtered);
  }, [search, posts]);

  return (
    <div style={{ minWidth: "300px" }}>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Link to="/post/new" className="btn btn-success">
        Crear
      </Link>
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
