import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";
import { API_URL } from "../utils/consts";

const EditPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/post/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleEditSuccess = () => {
    navigate(`/post/${postId}`);
  };

  if (!post) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <EditPostForm post={post} onSuccess={handleEditSuccess} />
    </div>
  );
};

export default EditPostPage;
