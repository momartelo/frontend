import { useId, useRef } from "react";
import { API_URL } from "../utils/consts";

const DeletePostModel = ({ postId, getPost }) => {
  const labelId = useId();
  const ref = useRef(null);

  const handleDelete = () => {
    console.log("delete post", postId);
    fetch(`${API_URL}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status !== 200) return alert("Error al borrar el post");

      // refresh page
      ref.current.click();
      getPost();
    });
  };

  return (
    <div
      className="modal fade"
      id={"modal" + postId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Delete Post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Esta seguro que quiere borrar el posteo?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={ref}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModel;
