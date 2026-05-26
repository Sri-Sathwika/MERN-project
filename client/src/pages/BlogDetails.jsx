import {
  Container,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Chip,
  Box,
  Button,
} from "@mui/material";

import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function BlogDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const fetchBlog = async () => {

      try {

        const response = await API.get(
          `/blogs/${id}`
        );

        setBlog(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchBlog();

  }, [id]);

  const handleDelete = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this blog?"
  );

  if (!confirmDelete) return;

  try {

    const token =
      localStorage.getItem("token");

    console.log(token);

    console.log(id);

    await API.delete(`/blogs/${id}`);

    alert("Blog deleted successfully");

    navigate("/");

  } catch (error) {

    console.log(error.response);

    alert(
      error.response?.data?.message
    );
  }
};

  if (loading) {

    return (
      <Container
        sx={{
          py: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!blog) {

    return (
      <Container sx={{ py: 5 }}>

        <Typography variant="h5">

          Blog not found!

        </Typography>

      </Container>
    );
  }

  return (

    <Container
      maxWidth="md"
      sx={{ py: 5 }}
    >

      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: 4,
        }}
      >

        <CardMedia
          component="img"
          height="400"
          image={blog.image}
          alt={blog.title}
        />

        <Box sx={{ p: 4 }}>

          <Chip
            label={blog.category}
            color="primary"
            sx={{ mb: 2 }}
          />

          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{
    lineHeight: 1.2,
  }}
          >
            {blog.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            By {blog.author?.name || "Unknown"}
          </Typography>

          <Typography
            variant="body1"
            sx={{
  lineHeight: 2.1,
  fontSize: "1.1rem",
  color: "#444",
}}
          >
            {blog.content}
          </Typography>

          <Typography
  variant="body2"
  color="text.secondary"
  sx={{ mb: 3 }}
>
  Written by
  {" "}
  <strong>
    {blog.author?.name}
  </strong>
</Typography>

          {user?._id === blog?.author?._id && (

            <Box sx={{ mt: 4 }}>

              <Button
                component={Link}
                to={`/edit-blog/${blog._id}`}
                variant="contained"
              >
                Edit Blog
              </Button>

              <Button
                variant="outlined"
                color="error"
                sx={{ ml: 2 }}
                onClick={handleDelete}
              >
                Delete Blog
              </Button>

            </Box>
          )}

        </Box>

      </Card>
  <Box sx={{ mt: 8 }}>

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Similar Blogs
        </Typography>

        <Typography
          color="text.secondary"
        >
          More blogs coming soon...
        </Typography>

      </Box>

    </Container>
  );
}