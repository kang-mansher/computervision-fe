// UploadButton.js
import { Box, Button } from "@mui/material";
import React, { useRef } from "react";

const UploadButton = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box p={2}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button onClick={() => fileInputRef.current.click()} variant="contained">
        Upload
      </Button>
    </Box>
  );
};

export default UploadButton;
