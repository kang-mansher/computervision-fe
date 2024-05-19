import { Box, Divider, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import Options from "./components/Options";
import ProcessedResult from "./components/ProcessedResult";
import { useApi } from "./hooks/useApi";
import Home from "./components/Home";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useScreenSize from "./hooks/useScreenSize";
import MediaDisplay from "./components/MediaDisplay";

const App = () => {
  const { result, isLoading, error, getProcessedResults } = useApi();
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const [isOpen, setIsOpen] = useState();
  const { isMobile } = useScreenSize();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleMediaUpload = (media) => {
    setUploadedMedia(media);
  };

  const onReset = () => {
    setUploadedMedia(null);
  };

  const onGetResults = async (
    selectedOption,
    segmentationOption,
    captioningOption,
    instanceText,
    questionText
  ) => {
    setIsOpen(true);
    await getProcessedResults(
      selectedOption,
      segmentationOption,
      captioningOption,
      instanceText,
      questionText,
      uploadedMedia
    );
  };

  return (
    <div>
      <>
        {uploadedMedia && (
          <IconButton
            onClick={onReset}
            sx={{ position: "absolute", top: "16px", left: "16px" }}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        )}
        {!uploadedMedia && <Home onUpload={handleMediaUpload} />}
        <Box sx={{ height: isMobile ? "80vh" : "100vh" }} alignContent="center">
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={3}
            justifyContent="center"
            alignItems="center"
          >
            {uploadedMedia && (
              <MediaDisplay
                media={uploadedMedia}
                onVideoCapture={handleMediaUpload}
              />
            )}
            <Divider flexItem={true} orientation="vertical" />
            {uploadedMedia && (
              <Options
                image={uploadedMedia}
                onGetResults={onGetResults}
                onReset={onReset}
              />
            )}
          </Stack>
        </Box>
      </>
      {(result || isLoading || error) && (
        <ProcessedResult
          result={result}
          error={error}
          isLoading={isLoading}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default App;
