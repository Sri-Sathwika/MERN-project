import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BlogDetails from "../pages/BlogDetails.jsx";
import CreateBlog from "../pages/CreateBlog.jsx";
import EditBlog from "../pages/EditBlog.jsx";
import MyBlogs from "../pages/MyBlogs.jsx";
import RecycleBin from "../pages/RecycleBin.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path="/edit-blog/:id" element={<EditBlog/>}/>
        <Route path="/my-blogs" element={<MyBlogs/>}/>
        <Route
  path="/recycle-bin"
  element={<RecycleBin />}
/>
      </Routes>
    </BrowserRouter>
  );
}