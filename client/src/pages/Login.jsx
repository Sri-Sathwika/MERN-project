import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
} from "@mui/material";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import API from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 where user came from (CreateBlog / other protected page)
  const from = location.state?.from || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await API.post("/auth/login", formData);

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login successful");

      // 🔥 AUTO REDIRECT BACK TO PREVIOUS PAGE
      navigate(from, { replace: true });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <Container maxWidth="sm">

      {/* BACK BUTTON */}
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "fixed",
            top: { xs: 18, sm: 24 },
            left: { xs: 16, sm: 24 },
            width: 52,
            height: 52,
            background:
              "linear-gradient(90deg, #020617 0%, #172554 100%)",
            color: "white",
            zIndex: 1000,
            "&:hover": { transform: "scale(1.08)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
        >
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              background:
                "linear-gradient(90deg, #020617 0%, #172554 100%)",
            }}
          >
            Login
          </Button>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}