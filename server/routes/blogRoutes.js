import express from "express";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getDeletedBlogs,
  restoreBlog,
  permanentDeleteBlog,
} from "../controllers/blogController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// IMPORTANT:
// SPECIAL ROUTES FIRST

router.get(
  "/deleted",
  protect,
  getDeletedBlogs
);

router.put(
  "/restore/:id",
  protect,
  restoreBlog
);

router.delete(
  "/permanent/:id",
  protect,
  permanentDeleteBlog
);


// NORMAL ROUTES

router.post(
  "/",
  protect,
  createBlog
);

router.get(
  "/",
  getBlogs
);

router.get(
  "/:id",
  getSingleBlog
);

router.put(
  "/:id",
  protect,
  updateBlog
);

router.delete(
  "/:id",
  protect,
  deleteBlog
);

export default router;