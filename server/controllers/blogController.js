import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {

        const {
            title,
            content,
            image,
            category,
        } = req.body;

        const blog = await Blog.create({
            title,
            content,
            image,
            category,
            author: req.user,
        });

        res.status(201).json({
            message: "Blog created successfully",
            blog,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getBlogs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const author = req.query.author || "";
    const sort = req.query.sort || "newest";

    let query = {
      isDeleted: false,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (author) {
      query.author = author;
    }

    const blogs = await Blog.find(query)
      .populate("author", "_id name") // ✅ FIX HERE
      .sort(
        sort === "oldest"
          ? { createdAt: 1 }
          : { createdAt: -1 }
      );

    res.status(200).json(blogs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "_id name");

        if (!blog) {
            return res.status(404).json({
                mesage: "Blog not found",
            });
        }

        res.status(200).json(blog);
    }

    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const {
            title,
            content,
            image,
            category,
        } = req.body;

        const blog = await Blog.findById(
            req.params.id
        );

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        if (blog.author.toString() !== req.user) {

            return res.status(401).json({
                message: "Not authorized",
            });
        }

        blog.title = title || blog.title;

        blog.content = content || blog.content;

        blog.image = image || blog.image;

        blog.category =
            category || blog.category;

        const updatedBlog = await blog.save();

        res.status(200).json({
            message: "Blog updated successfully",
            updatedBlog,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteBlog = async (
  req,
  res
) => {

  try {

    console.log("DELETE ROUTE HIT");

    console.log("Blog ID:",
      req.params.id
    );

    console.log("User:",
      req.user
    );

    const blog = await Blog.findById(
      req.params.id
    );

    console.log("Found Blog:",
      blog);

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });
    }

    console.log(
      "Blog Author:",
      blog.author.toString()
    );

    console.log(
      "Req User:",
      req.user
    );

    if (
      blog.author._id.toString() !==
      req.user
    ) {

      return res.status(401).json({
        message:
          "Not authorized",
      });
    }

    blog.isDeleted = true;

    await blog.save();

    res.json({
      message:
        "Blog moved to recycle bin",
    });

  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDeletedBlogs = async (
  req,
  res
) => {

  try {

    const blogs = await Blog.find({
      isDeleted: true,
      author: req.user,
    });

    res.json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

export const restoreBlog = async (
  req,
  res
) => {

  try {

    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {

      return res.status(404).json({
        message: "Blog not found",
      });
    }

    blog.isDeleted = false;

    await blog.save();

    res.json({
      message:
        "Blog restored successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

export const permanentDeleteBlog =
  async (req, res) => {

    try {

      const blog =
        await Blog.findById(
          req.params.id
        );

      if (!blog) {

        return res.status(404).json({
          message:
            "Blog not found",
        });
      }

      await blog.deleteOne();

      res.json({
        message:
          "Blog permanently deleted",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
};