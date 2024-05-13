import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SelectOption from "./SelectOption";

const TextInput = ({ id, label, onChange }) => {
  return (
    <Box p={1}>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        onChange={onChange}
        fullWidth
      />
    </Box>
  );
};

const Options = ({ onGetResults }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [segmentationOption, setSegmentationOption] = useState("");
  const [captioningOption, setCaptioningOption] = useState("");
  const [instanceText, setInstanceText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const mainOptions = [
    { value: "objectDetection", label: "Object Detection" },
    { value: "segmentation", label: "Segmentation" },
    { value: "imageCaptioning", label: "Image Captioning" },
  ];

  const segmentationOptions = [
    { value: "semantic", label: "Semantic Segmentation" },
    { value: "instance", label: "Instance Segmentation" },
  ];

  const captioningOptions = [
    { value: "generateCaption", label: "Generate Image Caption" },
    { value: "queryImage", label: "Query Image" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSegmentationOptionChange = (event) => {
    setSegmentationOption(event.target.value);
  };

  const handleCaptioningOptionChange = (event) => {
    setCaptioningOption(event.target.value);
  };

  const handleInstanceTextChange = (event) => {
    setInstanceText(event.target.value);
  };

  const handleQuestionTextChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleGetResults = () => {
    onGetResults(
      selectedOption,
      segmentationOption,
      captioningOption,
      instanceText,
      questionText
    );
  };

  useEffect(() => {
    const calculateIsDisabled = () => {
      setIsDisabled(
        selectedOption === "" ||
          (selectedOption === "segmentation" &&
            (segmentationOption === "" ||
              (segmentationOption === "instance" && instanceText === ""))) ||
          (selectedOption === "imageCaptioning" &&
            (captioningOption === "" ||
              (captioningOption === "queryImage" && questionText === "")))
      );
    };

    calculateIsDisabled();
  }, [
    selectedOption,
    segmentationOption,
    captioningOption,
    instanceText,
    questionText,
  ]);

  return (
    <Box sx={{ minWidth: 300, textAlign: "center" }}>
      <SelectOption
        labelId="mainOption"
        value={selectedOption}
        onChange={handleOptionChange}
        label="Main Option"
        options={mainOptions}
      />
      {selectedOption === "segmentation" && (
        <>
          <SelectOption
            labelId="segmentationOption"
            value={segmentationOption}
            onChange={handleSegmentationOptionChange}
            label="Segmentation Option"
            options={segmentationOptions}
          />
          {segmentationOption === "instance" && (
            <TextInput
              id="instanceText"
              label="Enter object"
              onChange={handleInstanceTextChange}
            />
          )}
        </>
      )}
      {selectedOption === "imageCaptioning" && (
        <>
          <SelectOption
            labelId="captioningOption"
            value={captioningOption}
            onChange={handleCaptioningOptionChange}
            label="Captioning Option"
            options={captioningOptions}
          />
          {captioningOption === "queryImage" && (
            <TextInput
              id="questionText"
              label="Ask a question"
              onChange={handleQuestionTextChange}
            />
          )}
        </>
      )}
      <Button
        type="button"
        onClick={handleGetResults}
        variant="contained"
        disabled={isDisabled}
      >
        Get Results
      </Button>
    </Box>
  );
};

export default Options;
