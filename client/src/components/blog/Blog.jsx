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

    <Box>

      {/* HERO */}

      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
          background:
            "linear-gradient(to right, #0f172a, #1e293b)",
          color: "white",
        }}
      >

        <Box>

          <Typography
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: {
                xs: "2.5rem",
                md: "4.5rem",
              },
            }}
          >
            Discover Stories,
            Ideas & Tech
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              opacity: 0.8,
              mb: 4,
            }}
          >
            Explore modern web
            development and technology.
          </Typography>

        </Box>

      </Box>

      {/* CONTENT */}

      <Container sx={{ py: 8 }}>

        {/* FILTERS */}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 5,
          }}
        >

          <TextField
            label="Search Blogs"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{ flex: 1 }}
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            sx={{ width: 200 }}
          >

            <MenuItem value="">
              All
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
            label="Sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            sx={{ width: 200 }}
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

        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ mb: 5 }}
        >
          Featured Blogs
        </Typography>

        {/* LOADING */}

        {loading && (

          <Grid container spacing={4}>

            {[1,2,3].map((item) => (

              <Grid
                item
                xs={12}
                md={4}
                key={item}
              >

                <Card
                  sx={{
                    borderRadius: 4,
                  }}
                >

                  <Skeleton
                    variant="rectangular"
                    height={240}
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
              md={4}
              key={blog._id}
            >

              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  transition:
                    "0.3s ease",

                  "&:hover": {
                    transform:
                      "translateY(-10px)",
                    boxShadow: 8,
                  },
                }}
              >

                <CardMedia
                  component="img"
                  height="240"
                  image={blog.image}
                  alt={blog.title}
                />

                <CardContent>

                  <Chip
                    label={blog.category}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    By{" "}
                    {blog.author?.name
                      || "Admin"}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                  >
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8,
                    }}
                  >
                    {blog.content.slice(
                      0,
                      120
                    )}...
                  </Typography>

                  <Button
                    component={Link}
                    to={`/blog/${blog._id}`}
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    Read More
                  </Button>

                </CardContent>

              </Card>

            </Grid>
          ))}
        </Grid>

        {/* EMPTY */}

        {!loading &&
          blogs.length === 0 && (

          <Box
            sx={{
              py: 10,
              textAlign: "center",
            }}
          >

            <Typography
              variant="h5"
              fontWeight={700}
            >
              No blogs found
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
          bottom: 30,
          right: 30,
          borderRadius: 10,
          px: 3,
          py: 1.5,
          boxShadow: 6,
          zIndex: 1000,
        }}
      >
        Create
      </Button>

    </Box>
  );
}