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
    <Container maxWidth="lg" sx={{ py: 6 }}>
     {/* Header Section */}
<Box 
  sx={{ 
    display: "flex", 
    alignItems: "center", 
    gap: 2, 
    mb: 6, // Increased margin bottom for better breathing room
    mt: 2  // Slight margin top to prevent it from hugging the screen top
  }}
>
  <IconButton
    onClick={() => navigate("/")}
    sx={{
      width: 46,
      height: 46,
      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
      color: "white",
      boxShadow: "0px 4px 12px rgba(124, 58, 237, 0.25)",
      "&:hover": {
        transform: "translateX(-3px)", // Sophisticated left-pointing nudge on hover
        background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
      },
      transition: "all 0.2s ease-in-out",
    }}
  >
    <ArrowBackIcon sx={{ fontSize: 22 }} />
  </IconButton>
  
  <Typography 
    variant="h4" 
    fontWeight={800} 
    sx={{ 
      color: "text.primary",
      letterSpacing: "-0.5px", // Cleaner typography style
      lineHeight: 1
    }}
  >
    Recycle Bin
  </Typography>
</Box>

      {/* Main Content Conditional Rendering */}
      {blogs.length === 0 ? (
        /* Enhanced Empty State */
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
            px: 2,
          }}
        >
          <DeleteSweepTwoToneIcon 
            sx={{ fontSize: 80, color: "action.disabled", mb: 2, opacity: 0.7 }} 
          />
          <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
            Recycle Bin is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            Your deleted blogs will show up here. You can either restore them or delete them permanently.
          </Typography>
        </Box>
      ) : (
        /* Cards Grid Layout */
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image || "https://via.placeholder.com/400x200?text=No+Image"}
                  alt={blog.title}
                  sx={{ objectFit: "cover" }}
                />
                
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyBetween: "space-between", p: 3 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {blog.title}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1.5, mt: "auto", pt: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<RestoreIcon />}
                      onClick={() => handleRestore(blog._id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#2563eb",
                        "&:hover": { backgroundColor: "#1d4ed8" }
                      }}
                    >
                      Restore
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => handlePermanentDelete(blog._id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        borderWidth: "1.5px",
                        "&:hover": { borderWidth: "1.5px" }
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