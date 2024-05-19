// Intro.js
import { Box, Typography } from "@mui/material";
import React from "react";
import useScreenSize from "../hooks/useScreenSize";

const Intro = () => {
  const { isMobile } = useScreenSize();
  return (
    <Box p={2}>
      <Typography
        variant={isMobile ? "h4" : "h2"}
        sx={{ paddingTop: isMobile ? "64px" : "8px" }}
      >
        Computer Vision
      </Typography>
      <p
        style={{
          fontSize: isMobile ? "14px" : "20px",
          maxWidth: "25em",
        }}
      >
        Computer vision is closely related to artificial intelligence (AI) and
        often uses AI techniques such as machine learning to analyze and
        understand visual data.
      </p>
    </Box>
  );
};

export default Intro;
