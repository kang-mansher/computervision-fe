import { Box, Card } from "@mui/material";
import React from "react";
import { FileUploader } from "react-drag-drop-files";
import useScreenSize from "../hooks/useScreenSize";

const DropZone = ({ onUpload }) => {
  const { isMobile } = useScreenSize();
  const cardSize = isMobile ? "330px" : "600px";
  const imgSize = isMobile ? 150 : 250;

  return (
    <Card
      sx={{
        width: cardSize,
        height: cardSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "16px",
        padding: "16px",
      }}
    >
      <img
        src="upload.svg"
        width={imgSize}
        height={imgSize}
        style={{ paddingBottom: "16px" }}
        alt="upload"
      ></img>
      <Box
        sx={{
          label: {
            width: isMobile ? "200px" : "550px",
          },
        }}
      >
        <FileUploader handleChange={(file) => onUpload(file)} />
      </Box>
    </Card>
  );
};

export default DropZone;
