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
            {/* BACK BUTTON + TITLE (FIXED RESPONSIVE HEADER) */}
<Box
    sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
        minHeight: "70px",
    }}
>
    {/* BACK BUTTON */}
    <IconButton
        onClick={() => navigate("/")}
        sx={{
            position: "absolute",
            left: { xs: 8, sm: 16 },
            top: "50%",
            transform: "translateY(-50%)",
            width: { xs: 42, sm: 52 },
            height: { xs: 42, sm: 52 },
            background:
                "linear-gradient(90deg,#020617,#172554)",
            color: "white",
            zIndex: 2,
            "&:hover": {
                transform: "translateY(-50%) scale(1.08)",
            },
        }}
    >
        <ArrowBackIcon />
    </IconButton>

    {/* TITLE */}
    <Typography
        variant="h3"
        fontWeight={800}
        sx={{
            textAlign: "center",
            fontSize: {
                xs: "1.8rem",
                sm: "2.4rem",
                md: "3rem",
            },
            background:
                "linear-gradient(90deg,#020617,#172554)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            width: "100%",
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