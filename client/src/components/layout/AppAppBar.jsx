import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import logo from "../../assets/images/logo.png";

export default function AppAppBar() {

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  const toggleDrawer = (state) => {
    setOpen(state);
  };

  const navLinks = (
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
    </>
  );

  return (

    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(14px)",
        background:
          "rgba(15, 23, 42, 0.92)",
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
          px: {
            xs: 2,
            md: 4,
          },
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
              width: {
                xs: 38,
                md: 42,
              },
              height: {
                xs: 38,
                md: 42,
              },
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "1.8rem",
                md: "2rem",
              },
              letterSpacing: 1,
            }}
          >
            DevBlog
          </Typography>

        </Box>

        {/* DESKTOP NAVIGATION */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            gap: 1,
          }}
        >

          {user ? (
            <>
              {navLinks}

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

        {/* MOBILE MENU BUTTON */}

        <IconButton
          onClick={() =>
            toggleDrawer(true)
          }
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            color: "white",
          }}
        >
          <MenuIcon />
        </IconButton>

      </Toolbar>

      {/* MOBILE DRAWER */}

      <Drawer
        anchor="right"
        open={open}
        onClose={() =>
          toggleDrawer(false)
        }
      >

        <Box
          sx={{
            width: 260,
            height: "100%",
            background:
              "#0f172a",
            color: "white",
            p: 2,
          }}
        >

          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ mb: 3 }}
          >
            DevBlog
          </Typography>

          <List>

            {user ? (
              <>
                {[
                  {
                    text: "Home",
                    link: "/",
                  },
                  {
                    text:
                      "Create Blog",
                    link:
                      "/create-blog",
                  },
                  {
                    text:
                      "My Blogs",
                    link:
                      "/my-blogs",
                  },
                  {
                    text:
                      "Recycle Bin",
                    link:
                      "/recycle-bin",
                  },
                ].map((item) => (

                  <ListItem
                    key={item.text}
                    disablePadding
                  >

                    <ListItemButton
                      component={Link}
                      to={item.link}
                      onClick={() =>
                        toggleDrawer(
                          false
                        )
                      }
                    >

                      <ListItemText
                        primary={
                          item.text
                        }
                      />

                    </ListItemButton>

                  </ListItem>
                ))}

                <ListItem disablePadding>

                  <ListItemButton
                    onClick={
                      handleLogout
                    }
                  >

                    <ListItemText
                      primary="Logout"
                    />

                  </ListItemButton>

                </ListItem>

              </>
            ) : (
              <>
                <ListItem disablePadding>

                  <ListItemButton
                    component={Link}
                    to="/login"
                  >

                    <ListItemText
                      primary="Login"
                    />

                  </ListItemButton>

                </ListItem>

                <ListItem disablePadding>

                  <ListItemButton
                    component={Link}
                    to="/signup"
                  >

                    <ListItemText
                      primary="Signup"
                    />

                  </ListItemButton>

                </ListItem>
              </>
            )}

          </List>

        </Box>

      </Drawer>

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