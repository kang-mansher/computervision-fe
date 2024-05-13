import { Box } from "@mui/material";
import React from "react";
import useScreenSize from "../hooks/useScreenSize";

const ImageDisplay = ({ image }) => {
  const { isMobile } = useScreenSize();
  return (
    <Box
      sx={{
        maxWidth: isMobile ? "500px" : "800px",
        maxHeight: isMobile ? "500px" : "800px",
      }}
    >
      <img
        src={URL.createObjectURL(image)}
        alt="input data"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </Box>
  );
};

export default ImageDisplay;
