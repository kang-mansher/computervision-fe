import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";

const Header = ({ onHomeClick }) => {
  return (
    <AppBar component="nav" sx={{ backgroundColor: "#343434" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit" onClick={onHomeClick}>
          <HomeIcon fontSize="large" />
        </IconButton>
        <Box>
          <Typography variant="h6" component="div">
            COMPUTER VISION
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
