import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Box,
    IconButton,
} from "@mui/material";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import API from "../services/api";

export default function CreateBlog() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const [formData, setFormData] =
        useState({
            title: "",
            content: "",
            image: "",
            category: "Technology",
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post(
                "/blogs",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            alert(
                "Blog created successfully"
            );

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data
                    ?.message ||
                "Login or Signup to create a blog"
            );
        }
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
                py: {
                    xs: 3,
                    md: 6,
                },
                px: 2,
            }}
        >

            {/* TOP HEADER */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "center",
                    mb: 5,
                    width: "100%",
                }}
            >

                {/* LEFT */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        width: "100%",
                    }}
                >

                    <IconButton
                        onClick={() =>
                            navigate("/")
                        }
                        sx={{
                            position: "fixed",

                            top: {
                                xs: 18,
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

                            boxShadow: "0 8px 25px rgba(99,102,241,0.35)",

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

                    <Box>

                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{
                                fontSize: {
                                    xs: "2rem",
                                    md: "3rem",
                                },
                                background:
                                    "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",
                                WebkitBackgroundClip:
                                    "text",
                                WebkitTextFillColor:
                                    "transparent",
                            }}
                        >
                            Create Blog
                        </Typography>

                    </Box>

                </Box>

            </Box>

            {/* FORM SECTION */}

            <Container
                maxWidth="md"
            >

                <Paper
                    elevation={8}
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },
                        borderRadius: 6,
                        backdropFilter:
                            "blur(10px)",
                        background:
                            "rgba(255,255,255,0.9)",
                        boxShadow:
                            "0 10px 40px rgba(0,0,0,0.08)",
                    }}
                >

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        {/* TITLE */}

                        <TextField
                            fullWidth
                            label="Blog Title"
                            name="title"
                            margin="normal"
                            value={formData.title}
                            onChange={
                                handleChange
                            }
                            sx={{ mb: 2 }}
                        />

                        {/* CONTENT */}

                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            label="Blog Content"
                            name="content"
                            margin="normal"
                            value={
                                formData.content
                            }
                            onChange={
                                handleChange
                            }
                            sx={{ mb: 2 }}
                        />

                        {/* IMAGE */}

                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image"
                            margin="normal"
                            value={
                                formData.image
                            }
                            onChange={
                                handleChange
                            }
                            sx={{ mb: 2 }}
                        />

                        {/* CATEGORY */}

                        <TextField
                            select
                            fullWidth
                            label="Category"
                            name="category"
                            margin="normal"
                            value={
                                formData.category
                            }
                            onChange={
                                handleChange
                            }
                            sx={{ mb: 3 }}
                        >

                            <MenuItem value="Technology">
                                Technology
                            </MenuItem>

                            <MenuItem value="Lifestyle">
                                Lifestyle
                            </MenuItem>

                            <MenuItem value="General">
                                General
                            </MenuItem>

                            <MenuItem value="Food">
                                Food
                            </MenuItem>

                            <MenuItem value="Finance">
                                Finance
                            </MenuItem>

                            <MenuItem value="Consult">
                                Consult
                            </MenuItem>

                            <MenuItem value="Advice">
                                Advice
                            </MenuItem>

                            <MenuItem value="Planning">
                                Planning
                            </MenuItem>

                            <MenuItem value="Animals">
                                Animals
                            </MenuItem>

                            <MenuItem value="Entertainment">
                                Entertainment
                            </MenuItem>

                        </TextField>

                        {/* SUBMIT BUTTON */}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                py: 1.7,
                                borderRadius: 4,
                                fontWeight: 700,
                                fontSize: "1rem",
                                textTransform:
                                    "none",
                                background:
                                    "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",
                                boxShadow: 4,

                                "&:hover": {
                                    transform:
                                        "translateY(-2px)",
                                    boxShadow: 8,
                                    background:
                                        "linear-gradient(90deg,  #020617 0%,  #08112b 35%,  #172554 100%)",
                                },

                                transition: "0.3s",
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