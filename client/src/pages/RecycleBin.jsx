import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import API from "../services/api";

export default function RecycleBin() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchDeletedBlogs = async () => {
    try {
      const response = await API.get("/blogs/deleted");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching deleted blogs:", error);
    }
  };

  useEffect(() => {
    fetchDeletedBlogs();
  }, []);

  const handleRestore = async (id) => {
    try {
      await API.put(`/blogs/restore/${id}`);
      fetchDeletedBlogs();
    } catch (error) {
      console.error("Error restoring blog:", error);
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this permanently?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/permanent/${id}`);
      fetchDeletedBlogs();
    } catch (error) {
      console.error("Error permanently deleting blog:", error);
    }
  };

  return (
  <Container
    maxWidth="xl"
    sx={{
      py: {
        xs: 3,
        sm: 4,
        md: 6,
      },

      px: {
        xs: 2,
        sm: 3,
        md: 4,
      },

      minHeight: "100vh",
    }}
  >

    {/* HEADER */}

    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: {
          xs: 4,
          md: 6,
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
            sm: 24,
          },

          left: {
            xs: 16,
            sm: 24,
          },

          width: {
            xs: 48,
            sm: 54,
          },

          height: {
            xs: 48,
            sm: 54,
          },

          background:
            "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

          color: "white",

          boxShadow:
            "0 8px 25px rgba(99,102,241,0.35)",

          zIndex: 1000,

          "&:hover": {
            transform: "scale(1.08)",
            background:
              "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",
          },

          transition: "0.3s",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* TITLE */}

      <Box sx={{ textAlign: "center" }}>

        <Typography
          variant="h4"

          fontWeight={800}

          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },

            background:
              "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

            WebkitBackgroundClip: "text",

            WebkitTextFillColor:
              "transparent",

            mb: 1,
          }}
        >
          Recycle Bin
        </Typography>

        <Typography
          variant="body1"

          color="text.secondary"

          sx={{
            fontSize: {
              xs: "0.95rem",
              sm: "1rem",
            },
          }}
        >
          Restore or permanently remove blogs
        </Typography>

      </Box>

    </Box>

    {/* EMPTY STATE */}

    {blogs.length === 0 ? (

      <Box
        sx={{
          minHeight: "60vh",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",

          px: 2,
        }}
      >

        <DeleteSweepTwoToneIcon
          sx={{
            fontSize: {
              xs: 70,
              md: 90,
            },

            color: "#cbd5e1",

            mb: 2,
          }}
        />

        <Typography
          variant="h5"

          fontWeight={700}

          gutterBottom
        >
          Recycle Bin is Empty
        </Typography>

        <Typography
          color="text.secondary"

          sx={{
            maxWidth: 500,
            lineHeight: 1.8,
          }}
        >
          Deleted blogs will appear here.
          You can restore them anytime
          or permanently remove them.
        </Typography>

      </Box>

    ) : (

      <Grid container spacing={4}>

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

                display: "flex",

                flexDirection: "column",

                borderRadius: 5,

                overflow: "hidden",

                background:
                  "rgba(255,255,255,0.75)",

                backdropFilter: "blur(14px)",

                border:
                  "1px solid rgba(255,255,255,0.4)",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.06)",

                transition: "0.3s",

                "&:hover": {
                  transform:
                    "translateY(-8px)",

                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.12)",
                },
              }}
            >

              <CardMedia
                component="img"

                image={
                  blog.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }

                alt={blog.title}

                sx={{
                  height: {
                    xs: 220,
                    sm: 240,
                  },

                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,

                  display: "flex",

                  flexDirection: "column",

                  p: 3,
                }}
              >

                <Typography
                  variant="h6"

                  fontWeight={700}

                  gutterBottom

                  sx={{
                    fontSize: {
                      xs: "1.1rem",
                      md: "1.3rem",
                    },

                    overflow: "hidden",

                    textOverflow: "ellipsis",

                    display: "-webkit-box",

                    WebkitLineClamp: 2,

                    WebkitBoxOrient:
                      "vertical",
                  }}
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="body2"

                  color="text.secondary"

                  sx={{
                    mb: 3,

                    lineHeight: 1.7,

                    overflow: "hidden",

                    textOverflow: "ellipsis",

                    display: "-webkit-box",

                    WebkitLineClamp: 3,

                    WebkitBoxOrient:
                      "vertical",
                  }}
                >
                  {blog.content}
                </Typography>

                {/* ACTION BUTTONS */}

                <Box
                  sx={{
                    mt: "auto",

                    display: "flex",

                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },

                    gap: 2,
                  }}
                >

                  <Button
                    fullWidth

                    variant="contained"

                    startIcon={<RestoreIcon />}

                    onClick={() =>
                      handleRestore(blog._id)
                    }

                    sx={{
                      py: 1.2,

                      borderRadius: 3,

                      fontWeight: 700,

                      textTransform: "none",

                      background:
                        "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

                      "&:hover": {
                        background:
                          "llinear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",
                      },
                    }}
                  >
                    Restore
                  </Button>

                  <Button
                    fullWidth

                    variant="outlined"

                    color="error"

                    startIcon={
                      <DeleteForeverIcon />
                    }

                    onClick={() =>
                      handlePermanentDelete(
                        blog._id
                      )
                    }

                    sx={{
                      py: 1.2,

                      borderRadius: 3,

                      fontWeight: 700,

                      textTransform: "none",

                      borderWidth: 2,

                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    Delete
                  </Button>

                </Box>

              </CardContent>

            </Card>

          </Grid>
        ))}

      </Grid>
    )}

  </Container>
);
}