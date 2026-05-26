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
  TextField,
  MenuItem,
  Skeleton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

export default function Blog() {

  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const response = await API.get(
          `/blogs?search=${search}&category=${category}&sort=${sort}`
        );

        setBlogs(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchBlogs();

  }, [search, category, sort]);

  return (

  <Box
    sx={{
      overflowX: "hidden",
      background: "#f8fafc",
      minHeight: "100vh",
    }}
  >

    

    {/* MAIN CONTENT */}

    <Container
      maxWidth="xl"

      sx={{
        py: {
          xs: 5,
          md: 8,
        },

        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >

      {/* FILTERS */}

      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "2fr 1fr 1fr",
          },

          gap: 2,

          mb: 7,
        }}
      >

        <TextField
          fullWidth

          label="Search Blogs"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          sx={{
            background: "white",
            borderRadius: 3,
          }}
        />

        <TextField
          select

          fullWidth

          label="Category"

          value={category}

          onChange={(e) =>
            setCategory(e.target.value)
          }

          sx={{
            background: "white",
            borderRadius: 3,
          }}
        >

          <MenuItem value="">
            All Categories
          </MenuItem>

          <MenuItem value="React">
            React
          </MenuItem>

          <MenuItem value="MERN">
            MERN
          </MenuItem>

          <MenuItem value="Technology">
            Technology
          </MenuItem>

        </TextField>

        <TextField
          select

          fullWidth

          label="Sort"

          value={sort}

          onChange={(e) =>
            setSort(e.target.value)
          }

          sx={{
            background: "white",
            borderRadius: 3,
          }}
        >

          <MenuItem value="newest">
            Newest
          </MenuItem>

          <MenuItem value="oldest">
            Oldest
          </MenuItem>

        </TextField>

      </Box>

      {/* HEADING */}

      <Box
        sx={{
          mb: 5,
          textAlign: {
            xs: "center",
            md: "left",
          },
        }}
      >

        <Typography
          variant="h3"

          fontWeight={800}

          sx={{
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },

            mb: 1,
          }}
        >
          Featured Blogs
        </Typography>


      </Box>

      {/* LOADING */}

      {loading && (

        <Grid container spacing={4}>

          {[1, 2, 3].map((item) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item}
            >

              <Card
                sx={{
                  borderRadius: 5,
                }}
              >

                <Skeleton
                  variant="rectangular"
                  height={260}
                />

                <CardContent>

                  <Skeleton height={40} />

                  <Skeleton height={20} />

                  <Skeleton height={20} />

                </CardContent>

              </Card>

            </Grid>
          ))}

        </Grid>
      )}

      {/* BLOG GRID */}

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

                height="250"

                image={blog.image}

                alt={blog.title}

                sx={{
                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  p: 3,
                }}
              >

                <Chip
                  label={blog.category}

                  size="small"

                  sx={{
                    mb: 2,

                    background:
                      "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

                    color: "white",

                    fontWeight: 600,
                  }}
                />

                <Typography
                  variant="body2"

                  color="text.secondary"

                  sx={{ mb: 1 }}
                >
                  By{" "}
                  {blog.author?.name ||
                    "Admin"}
                </Typography>

                <Typography
                  variant="h5"

                  fontWeight={800}

                  gutterBottom

                  sx={{
                    fontSize: {
                      xs: "1.4rem",
                      md: "1.7rem",
                    },
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
                  {blog.content.slice(
                    0,
                    120
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

                    background:
                      "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

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

      {/* EMPTY STATE */}

      {!loading &&
        blogs.length === 0 && (

        <Box
          sx={{
            py: 14,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h4"

            fontWeight={800}

            gutterBottom
          >
            No blogs found
          </Typography>

          <Typography
            color="text.secondary"
          >
            Try changing filters or
            search keywords.
          </Typography>

        </Box>
      )}

    </Container>

    {/* FLOATING BUTTON */}

    <Button
      component={Link}
      to="/create-blog"

      variant="contained"

      startIcon={<AddIcon />}

      sx={{
        position: "fixed",

        bottom: {
          xs: 20,
          md: 30,
        },

        right: {
          xs: 20,
          md: 30,
        },

        borderRadius: 99,

        px: {
          xs: 2.5,
          md: 3.5,
        },

        py: 1.5,

        fontWeight: 700,

        background:
          "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",

        boxShadow:
          "0 10px 30px rgba(99,102,241,0.45)",

        zIndex: 1000,

        "&:hover": {
          transform: "translateY(-3px)",
        },

        transition: "0.3s",
      }}
    >
      Create
    </Button>

  </Box>
);
}