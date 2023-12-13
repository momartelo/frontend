import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import NotFoundPage from "./pages/404Page";
import PostPage from "./pages/PostPage";
import PrivateRoutes from "./components/PrivateRoutes";
import NewPost from "./pages/NewPost";
import CommentPage from "./pages/CommentsPage";
import EditPostPage from "./components/EditPostPage";


function AppRouter() {
  return (
    <Routes>
      {/* Rutas Protegidas */}
      <Route element={<PrivateRoutes />}>
        <Route path="/post/new" element={<NewPost />} />
        <Route path="/post/:postId" element={<CommentPage />} />
        <Route path="/post/:postId/edit" element={<EditPostPage />} />
      </Route>

      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/about" element={<NotFoundPage />} />
      <Route path="/contact" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default AppRouter;
