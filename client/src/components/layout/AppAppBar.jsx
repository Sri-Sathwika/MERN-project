import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  TextField,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/images/logo.png";

export default function AppAppBar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(14px)",
        background:
          "rgba(15, 23, 42, 0.85)",
        borderBottom:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          py: 1,
          gap: 3,
        }}
      >

        {/* LEFT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >

          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              letterSpacing: 1,
            }}
          >
            DevBlog
          </Typography>

        </Box>

        {/* CENTER */}


        {/* RIGHT */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >

          {user ? (
            <>

              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={navBtnStyle}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/create-blog"
                color="inherit"
                sx={navBtnStyle}
              >
                Create Blog
              </Button>

              <Button
                component={Link}
                to="/my-blogs"
                color="inherit"
                sx={navBtnStyle}
              >
                My Blogs
              </Button>
              <Button
                component={Link}
                to="/recycle-bin"
                color="inherit"
                sx={navBtnStyle}
              >
                Recycle Bin
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  ml: 2,
                }}
              >

                <Avatar
                  sx={{
                    bgcolor:
                      "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>

                <Typography
                  fontWeight={600}
                >
                  {user?.name}
                </Typography>

              </Box>

              <Button
                onClick={handleLogout}
                color="inherit"
                sx={navBtnStyle}
              >
                Logout
              </Button>

            </>
          ) : (
            <>

              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={navBtnStyle}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                color="inherit"
                sx={navBtnStyle}
              >
                Signup
              </Button>

              

            </>
          )}

        </Box>

      </Toolbar>

    </AppBar>
  );
}

const navBtnStyle = {

  borderRadius: 3,

  px: 2,

  fontWeight: 700,

  transition: "0.3s",

  "&:hover": {
    background:
      "rgba(255,255,255,0.1)",
  },
};