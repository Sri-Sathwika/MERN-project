import {
    Container,
    Paper,
    TextField,
    Button,
    MenuItem,
    Box,
    IconButton,
    Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import API from "../services/api";

export default function CreateBlog() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: "",
        category: "Technology",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        // 🔒 AUTH CHECK + REDIRECT INFO
        if (!token) {
            alert("Please login or signup to publish a blog");

            navigate("/login", {
                state: { from: location.pathname },
            });

            return;
        }

        try {
            await API.post("/blogs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Blog created successfully");
            navigate("/");
        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");

                alert("Session expired. Please login again");

                navigate("/login", {
                    state: { from: location.pathname },
                });

                return;
            }

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", p: 3 }}>
            {/* BACK BUTTON + TITLE */}
            <Box sx={{ position: "relative", mb: 4 }}>
                <IconButton
                    onClick={() => navigate("/")}
                    sx={{
                        position: "fixed",
                        top: 20,
                        left: 20,
                        background:
                            "linear-gradient(90deg,#020617,#172554)",
                        color: "white",
                        "&:hover": { transform: "scale(1.1)" },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography
                    variant="h3"
                    fontWeight={800}
                    textAlign="center"
                    sx={{
                        background:
                            "linear-gradient(90deg,#020617,#172554)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Create Blog
                </Typography>
            </Box>

            {/* FORM */}
            <Container maxWidth="md">
                <Paper sx={{ p: 4, borderRadius: 4 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            margin="normal"
                        />

                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            margin="normal"
                        >
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background:
                                    "linear-gradient(90deg,#020617,#172554)",
                                fontWeight: 700,
                                textTransform: "none",
                            }}
                        >
                            Publish Blog
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}