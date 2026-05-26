import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import logo2 from "../../assets/images/logo.png";

export default function Footer() {

  return (
<Box
  sx={{
    mt: 10,
    py: 6,
    px: {
      xs: 3,
      md: 8,
    },
    background:
      "linear-gradient(to right, #020617, #0f172a, #1e293b)",
    color: "white",
  }}
>

  {/* TOP SECTION */}

  <Box
    sx={{
      display: "flex",
      justifyContent:
        "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 4,
      mb: 5,
    }}
  >

    {/* LEFT SIDE */}

    <Box>

      <Typography
        variant="h3"
        fontWeight={800}
        gutterBottom
      >
        DevBlog
      </Typography>

      <Typography
        variant="body1"
        sx={{
          opacity: 0.75,
          maxWidth: "500px",
          lineHeight: 2,
          fontSize: "1.05rem",
        }}
      >
        A modern blogging platform
        built using MERN Stack and
        Material UI.
      </Typography>

    </Box>

    {/* RIGHT SIDE */}

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <img
        src={logo2}
        alt="logo"
        style={{
          width:"150px",
          objectFit:"contain",
          mixBlendMode:"screen",
        }}
      />

    </Box>

  </Box>

  {/* DIVIDER */}

  <Box
    sx={{
      height: "1px",
      background:
        "rgba(255,255,255,0.1)",
      mb: 4,
    }}
  />

  {/* BOTTOM */}

  <Box
    sx={{
      display: "flex",
      justifyContent:
        "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 2,
      pb: 4,
    }}
  >

    <Typography
      sx={{ opacity: 0.7 }}
    >
      © 2026 DevBlog. All rights
      reserved.
    </Typography>

    <Typography
      sx={{
        opacity: 0.7,
        pr: {
          xs: 0,
          md: 15,
        },
      }}
    >
      Built with ❤️ using MERN
    </Typography>

  </Box>

</Box>
  );
}