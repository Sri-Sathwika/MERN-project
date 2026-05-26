import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

export default function MyBlogs() {

  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const response = await API.get(
          `/blogs?author=${user._id}`
        );

        setBlogs(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchBlogs();

  }, [user._id]);

  return (

    <Container
      maxWidth="xl"
      sx={{
        py: 6,
        minHeight: "100vh",
      }}
    >
{/* PREMIUM HEADER */}

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 6,
    flexWrap: "wrap",
    gap: 3,
  }}
>

  {/* LEFT SECTION */}

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >

    <IconButton
      onClick={() => navigate("/")}
      sx={{
        width: 55,
        height: 55,
        background:
          "linear-gradient(135deg, #2563eb, #7c3aed)",
        color: "white",
        boxShadow: 4,

        "&:hover": {
          transform: "scale(1.08)",
          background:
            "linear-gradient(135deg, #1d4ed8, #6d28d9)",
        },

        transition: "0.3s",
      }}
    >
      <ArrowBackIcon />
    </IconButton>

    <Box>

      <Typography
        variant="h3"
        fontWeight={800}
        sx={{
          background:
            "linear-gradient(90deg, #2563eb, #7c3aed)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My Blogs
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
      >
        Manage your published blogs
      </Typography>

    </Box>

  </Box>

  {/* RIGHT SIDE */}

  <Button
    variant="contained"
    onClick={() => navigate("/create-blog")}
    sx={{
      px: 4,
      py: 1.5,
      borderRadius: 4,
      fontWeight: 700,
      textTransform: "none",
      background:
        "linear-gradient(135deg, #2563eb, #7c3aed)",
      boxShadow: 4,

      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: 8,
      },

      transition: "0.3s",
    }}
  >
    + Create Blog
  </Button>

</Box>
      

      {/* EMPTY STATE */}

      {blogs.length === 0 && (

        <Box
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >

          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            No blogs yet
          </Typography>

          <Typography
            color="text.secondary"
          >
            Start creating amazing blogs 🚀
          </Typography>

        </Box>
      )}

      {/* BLOG GRID */}

      <Grid container spacing={4}>

        {blogs.map((blog) => (

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={blog._id}
          >

            <Card
              sx={{
                height: "100%",
                borderRadius: 5,
                overflow: "hidden",
                boxShadow: 3,
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 8,
                },
              }}
            >

              <CardMedia
                component="img"
                height="220"
                image={
                  blog.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                }
                alt={blog.title}
              />

              <CardContent
                sx={{
                  p: 3,
                }}
              >

                <Chip
                  label={
                    blog.category || "General"
                  }
                  color="primary"
                  sx={{ mb: 2 }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  By {user.name}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    minHeight: 60,
                  }}
                >
                  {blog.content?.slice(0, 80)}...
                </Typography>

                <Button
                  component={Link}
                  to={`/blog/${blog._id}`}
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.3,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Read More
                </Button>

              </CardContent>

            </Card>

          </Grid>
        ))}

      </Grid>

    </Container>
  );
}