import { Link } from "react-router-dom";
import styles from "../styles/prueba.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useId } from "react";
import DeletePostModel from "./DeletePostModel";
import React from "react";

const PlayItem = ({ post, getPost, onClick }) => {
  const modalId = useId();
  return (
    <div className={styles.playdiv} onClick={(e) => onClick()}>
      <article>
        <section>
          <h2>{post.title}</h2>
          <picture>
            <img src={post.author.avatar} alt={post.author.username} />
            <p>
              Autor: <b>{post.author.username}</b>
            </p>
          </picture>
        </section>
      </article>
      <div className={styles.divdelte}>
        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
        <Link to={`/post/${post._id}/edit`}>Editar Post</Link>
      </div>
    </div>
  );
};

export default PlayItem;

//  {/* <Link
//       style={{ fontSize: "30px", color: "green" }}
//       className="font-warning"
//     >
//       <HiOutlinePencilAlt />
//     </Link>
//     <Link
//       onClick={(e) => {
//         e.stopPropagation();
//       }}
//       data-bs-toggle="modal"
//       data-bs-target={"#modal" + post._id}
//       style={{ fontSize: "30px", color: "red" }}
//     >
//       <HiOutlineTrash />
//     </Link> */}
