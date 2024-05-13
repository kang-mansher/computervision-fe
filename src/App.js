import { Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import ImageDisplay from "./components/ImageDisplay";
import Intro from "./components/Intro";
import Options from "./components/Options";
import ProcessedResult from "./components/ProcessedResult";
import UploadButton from "./components/UploadButton";
import useScreenSize from "./hooks/useScreenSize";
import { useApi } from "./hooks/useApi";

const App = () => {
  const { result, isLoading, error, getProcessedResults } = useApi();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isOpen, setIsOpen] = useState();
  const { isMobile } = useScreenSize();

  console.log(isMobile);

  const onClose = () => {
    setIsOpen(false);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image);
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
      uploadedImage
    );
  };

  return (
    <div className="App">
      <>
        <Stack alignItems="center">
          <Intro />
          <UploadButton onUpload={handleImageUpload} />
        </Stack>
        <Divider />
        <Stack
          direction={isMobile ? "column" : "row"}
          gap={3}
          justifyContent="center"
          p={2}
        >
          {uploadedImage && <ImageDisplay image={uploadedImage} />}
          <Divider
            flexItem={true}
            orientation={isMobile ? "horizontal" : "vertical"}
          />
          {uploadedImage && (
            <Options image={uploadedImage} onGetResults={onGetResults} />
          )}
        </Stack>
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
