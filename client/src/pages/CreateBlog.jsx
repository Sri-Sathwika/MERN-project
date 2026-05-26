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

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateBlog() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

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

        try {

            await API.post(
                "/blogs",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Blog created successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                }}
            >

                <IconButton
                    onClick={() => navigate("/")}
                    sx={{
                        background: "white",
                        boxShadow: 3,
                        width: 50,
                        height: 50,

                        "&:hover": {
                            background: "#f5f5f5",
                            transform: "scale(1.05)",
                        },

                        transition: "0.3s",
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

            </Box>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                >
                    Create Blog
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <TextField
                        fullWidth
                        label="Blog Title"
                        name="title"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={8}
                        label="Blog Content"
                        name="content"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Image URL"
                        name="image"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Category"
                        name="category"
                        margin="normal"
                        value={formData.category}
                        onChange={handleChange}
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

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: 3,
                        }}
                    >
                        Create Blog
                    </Button>

                </Box>

            </Paper>

        </Container>
    );
}