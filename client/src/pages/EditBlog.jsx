import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function EditBlog() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [image, setImage] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {

    const fetchBlog = async () => {

      try {

        const { data } = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );

        setTitle(data.title);

        setContent(data.content);

        setImage(data.image);

        setCategory(data.category);

      } catch (error) {

        console.log(error);
      }
    };

    fetchBlog();

  }, [id]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        {
          title,
          content,
          image,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully");

      navigate(`/blog/${id}`);

    } catch (error) {

      console.log(error);

      alert("Failed to update blog");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>

      <Paper sx={{ p: 4 }} elevation={3}>

        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
        >
          Edit Blog
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <TextField
            label="Content"
            fullWidth
            multiline
            rows={6}
            margin="normal"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Blog
          </Button>

        </form>
      </Paper>
    </Container>
  );
}