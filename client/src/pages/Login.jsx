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

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {

  const navigate = useNavigate();

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

      const response = await API.post(
        "/auth/login",
        formData
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login successful");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );
    }
  };

  return (
    <Container maxWidth="sm">
      
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

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
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
            }}
          >
            Login
          </Button>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              fontSize:"100px"
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