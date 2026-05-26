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

  <Box
    sx={{
      background: "#f8fafc",
      minHeight: "100vh",
      py: {
        xs: 3,
        md: 5,
      },
      px: {
        xs: 2,
        sm: 3,
      },
    }}
  >

    {/* FLOATING BUTTONS */}

    <IconButton
      onClick={() => navigate("/")}

      sx={{
        position: "fixed",

        top: {
          xs: 14,
          md: 24,
        },

        left: {
          xs: 14,
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

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.25)",

        zIndex: 1200,

        "&:hover": {
          transform: "translateX(-4px)",
        },

        transition: "0.3s",
      }}
    >
      <ArrowBackIcon />
    </IconButton>

    <Button
      variant="contained"

      onClick={() =>
        navigate("/create-blog")
      }

      sx={{
        position: "fixed",

        top: {
          xs: 14,
          md: 24,
        },

        right: {
          xs: 14,
          md: 24,
        },

        borderRadius: 99,

        px: {
          xs: 2,
          md: 3,
        },

        py: 1.2,

        minWidth: {
          xs: 120,
          md: 160,
        },

        fontSize: {
          xs: "0.8rem",
          md: "1rem",
        },

        fontWeight: 700,

        textTransform: "none",

        background:
          "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

        boxShadow:
          "0 10px 30px rgba(0,0,0,0.25)",

        zIndex: 1200,

        "&:hover": {
          transform: "translateY(-3px)",
        },

        transition: "0.3s",
      }}
    >
      + Create Blog
    </Button>

    {/* MAIN CONTENT */}

    <Container
      maxWidth="xl"

      sx={{
        mt: {
          xs: 8,
          md: 6,
        },
      }}
    >

      {/* HEADER */}

      <Box
        sx={{
          textAlign: "center",
          mb: {
            xs: 5,
            md: 7,
          },
        }}
      >

        <Typography
          fontWeight={800}

          sx={{
            fontSize: {
              xs: "2.2rem",
              sm: "3rem",
              md: "4rem",
            },

            background:
              "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent",

            mb: 1,
          }}
        >
          My Blogs
        </Typography>

        <Typography
          color="text.secondary"

          sx={{
            fontSize: {
              xs: "0.95rem",
              md: "1.1rem",
            },
          }}
        >
          Manage your published blogs
        </Typography>

      </Box>

      {/* EMPTY STATE */}

      {blogs.length === 0 && (

        <Box
          sx={{
            py: 12,
            textAlign: "center",
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

      <Grid
        container
        spacing={{
          xs: 3,
          md: 4,
        }}
      >

        {blogs.map((blog) => (

          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={blog._id}
          >

            <Card
              sx={{
                height: "100%",

                borderRadius: 5,

                overflow: "hidden",

                background: "white",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)",

                transition: "0.35s",

                "&:hover": {
                  transform:
                    "translateY(-10px)",

                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.12)",
                },
              }}
            >

              <CardMedia
                component="img"

                image={
                  blog.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                }

                alt={blog.title}

                sx={{
                  width: "100%",

                  height: {
                    xs: 220,
                    sm: 240,
                    md: 260,
                  },

                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  p: {
                    xs: 2.5,
                    md: 3,
                  },
                }}
              >

                <Chip
                  label={
                    blog.category ||
                    "General"
                  }

                  sx={{
                    mb: 2,

                    background:
                      "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

                    color: "white",

                    fontWeight: 700,
                  }}
                />

                <Typography
                  variant="body2"

                  color="text.secondary"

                  sx={{ mb: 1 }}
                >
                  By {user.name}
                </Typography>

                <Typography
                  fontWeight={800}

                  gutterBottom

                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      md: "1.8rem",
                    },

                    lineHeight: 1.3,
                  }}
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="body2"

                  color="text.secondary"

                  sx={{
                    mb: 3,

                    lineHeight: 1.8,

                    minHeight: 70,
                  }}
                >
                  {blog.content?.slice(
                    0,
                    100
                  )}
                  ...
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

                    textTransform:
                      "none",

                    background:
                      "linear-gradient(90deg,#020617 0%,#08112b 35%,#172554 100%)",

                    "&:hover": {
                      opacity: 0.95,
                    },
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

  </Box>
);
}