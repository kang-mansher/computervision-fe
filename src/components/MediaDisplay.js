import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import useScreenSize from "../hooks/useScreenSize";

const MediaDisplay = ({ media, onVideoCapture }) => {
  const { isMobile } = useScreenSize();
  const videoRef = useRef(null);
  const [video, setVideo] = useState();
  const [isImageCaptured, setIsImageCaptured] = useState(false);

  const onPause = () => {
    setVideo(media);
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      onVideoCapture(blob);
      setIsImageCaptured(true);
    }, "image/png");
  };

  const onResume = () => {
    setIsImageCaptured(false);
    onVideoCapture(video);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        maxWidth: isMobile ? "350px" : "800px",
        paddingTop: isMobile ? "32px" : "64px",
      }}
    >
      {media.type.startsWith("image") && (
        <Box>
          <img
            src={URL.createObjectURL(media)}
            alt="input data"
            style={{
              maxWidth: "100%",
              maxHeight: isMobile ? "400px" : "800px",
              borderRadius: "16px",
            }}
          />
          {isImageCaptured && (
            <Button
              type="button"
              variant="contained"
              onClick={onResume}
              sx={{ backgroundColor: "#343434", marginTop: "10px" }}
            >
              Go back to video
            </Button>
          )}
        </Box>
      )}
      {media.type.startsWith("video") && (
        <Box>
          <video
            ref={videoRef}
            controls
            style={{
              maxWidth: "100%",
              display: "block",
              maxHeight: isMobile ? "400px" : "800px",
              borderRadius: "16px",
            }}
            src={URL.createObjectURL(media)}
          />
          <Button
            type="button"
            variant="contained"
            onClick={onPause}
            sx={{ backgroundColor: "#343434", marginTop: "10px" }}
          >
            Capture
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MediaDisplay;
