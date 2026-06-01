import {
  Container,
  Typography,
  Card,
  CardMedia,
  Chip,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const [blog, setBlog] =
    useState(null);

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

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(`/blogs/${id}`);

      alert(
        "Blog deleted successfully"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete blog"
      );
    }
  };

  /* LOADING STATE */

  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
        }}
      >

        <CircularProgress />

      </Box>
    );
  }

  /* BLOG NOT FOUND */

  if (!blog) {

    return (

      <Container
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Blog not found
        </Typography>

      </Container>
    );
  }

  return (

    <Box
      sx={{
        background: "#f8fafc",
        minHeight: "100vh",
        py: {
          xs: 3,
          md: 6,
        },
        px: {
          xs: 2,
          sm: 3,
        },
      }}
    >

      {/* BACK BUTTON */}

      <IconButton
        onClick={() => navigate("/")}

        sx={{
          position: "fixed",

          top: {
            xs: 16,
            md: 24,
          },

          left: {
            xs: 16,
            md: 24,
          },

          width: {
            xs: 46,
            md: 54,
          },

          height: {
            xs: 46,
            md: 54,
          },

          background:
            "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

          color: "white",

          zIndex: 1000,

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.25)",

          "&:hover": {
            transform:
              "translateX(-4px)",

            background:
              "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",
          },

          transition: "0.3s",
        }}
      >

        <ArrowBackIcon />

      </IconButton>

      {/* MAIN CONTENT */}

      <Container
        maxWidth="md"
        sx={{
          mt: {
            xs: 6,
            md: 4,
          },
        }}
      >

        <Card
          sx={{
            borderRadius: {
              xs: 4,
              md: 6,
            },

            overflow: "hidden",

            background: "white",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          {/* IMAGE */}

          <CardMedia
            component="img"

            image={
              blog?.image ||
              "https://imgs.search.brave.com/0FDP6A6kUjg7NYrfsZk1wUKN_rOvuUL2p41IeDhHroY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTIy/NzQ1MTkwL3Bob3Rv/L2Jsb2dnaW5nLWJs/b2ctY29uY2VwdHMt/aWRlYXMtd2l0aC13/b3JrdGFibGUuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXhS/MnZPbXRnLU42TG82/X0kyNjlTb001UFhF/VlJ4bGd2S3hYVUJN/ZU1DX0E9"
            }

            alt={blog?.title}

            sx={{
              width: "100%",

              height: {
                xs: 240,
                sm: 320,
                md: 450,
              },

              objectFit: "cover",
            }}
          />

          {/* CONTENT */}

          <Box
            sx={{
              p: {
                xs: 3,
                sm: 4,
                md: 5,
              },
            }}
          >

            {/* CATEGORY */}

            <Chip
              label={
                blog?.category ||
                "General"
              }

              sx={{
                mb: 3,

                background:
                  "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

                color: "white",

                fontWeight: 700,
              }}
            />

            {/* TITLE */}

            <Typography
              fontWeight={800}

              gutterBottom

              sx={{
                lineHeight: 1.2,

                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                  md: "4rem",
                },
              }}
            >
              {blog?.title}
            </Typography>

            {/* AUTHOR */}

            <Typography
              variant="body1"

              color="text.secondary"

              sx={{
                mb: 4,

                fontSize: {
                  xs: "0.95rem",
                  md: "1rem",
                },
              }}
            >
              By{" "}

              <strong>
                {blog?.author?.name ||
                  "Unknown"}
              </strong>

            </Typography>

            {/* CONTENT */}

            <Typography
              sx={{
                lineHeight: 2,

                fontSize: {
                  xs: "1rem",
                  md: "1.1rem",
                },

                color: "#444",

                whiteSpace: "pre-line",
              }}
            >
              {blog?.content}
            </Typography>

            {/* ACTION BUTTONS */}

            {user?._id ===
              blog?.author?._id && (

              <Box
                sx={{
                  display: "flex",

                  gap: 2,

                  flexWrap: "wrap",

                  mt: 5,
                }}
              >

                <Button
                  component={Link}

                  to={`/edit-blog/${blog._id}`}

                  variant="contained"

                  sx={{
                    borderRadius: 3,

                    px: 4,

                    py: 1.2,

                    fontWeight: 700,

                    background:
                      "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

                    "&:hover": {
                      opacity: 0.95,
                    },
                  }}
                >
                  Edit Blog
                </Button>

                <Button
                  variant="outlined"

                  color="error"

                  onClick={handleDelete}

                  sx={{
                    borderRadius: 3,

                    px: 4,

                    py: 1.2,

                    fontWeight: 700,
                  }}
                >
                  Delete Blog
                </Button>

              </Box>
            )}

          </Box>

        </Card>

      </Container>

    </Box>
  );
}