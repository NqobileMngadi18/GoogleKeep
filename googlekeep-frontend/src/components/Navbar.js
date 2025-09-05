import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from "@mui/material";
import { Search, Lightbulb } from "@mui/icons-material";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#3d33efff", color: "#e9f0f9ff", boxShadow: 1 }}
    >
      <Toolbar>
        <Lightbulb sx={{ mr: 1, color: "#fbbc04" }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          My Keep App
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f7f7f7ff",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            flexGrow: 2,
            maxWidth: 400,
            mr: 2,
          }}
        >
          <Search sx={{ mr: 1, color: "#5f6368" }} />
          <InputBase placeholder="Search…" fullWidth />
        </Box>

        {/* Profile Icon Placeholder */}
        <IconButton edge="end" color="inherit">
          <img
            src="https://via.placeholder.com/32"
            alt="profile"
            style={{ borderRadius: "50%" }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
