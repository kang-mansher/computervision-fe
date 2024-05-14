import { useState } from "react";

export const useApi = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const getUrlAndParams = (
    selectedOption,
    segmentationOption,
    captioningOption,
    instanceText,
    questionText,
    uploadedImage
  ) => {
    let url = "";
    const formData = new FormData();
    formData.append("image", uploadedImage);

    switch (selectedOption) {
      case "segmentation":
        url =
          segmentationOption === "semantic"
            ? "/semantic-segmentation"
            : "/instance-segmentation";
        if (segmentationOption === "instance") {
          console.log("here");
          formData.append("input", instanceText);
        }
        break;
      case "objectDetection":
        url = "/object-detection";
        break;
      case "imageCaptioning":
        url =
          captioningOption === "generateCaption"
            ? "/caption-image"
            : "/caption-input";
        if (captioningOption === "queryImage") {
          formData.append("input", questionText);
        }
        break;
      default:
        break;
    }

    const apiUrl =
      "https://computervision-a1847374.azuremicroservices.io" + url;

    return { apiUrl, params: formData };
  };

  const getProcessedResults = async (
    selectedOption,
    segmentationOption,
    captioningOption,
    instanceText,
    questionText,
    uploadedImage
  ) => {
    const { apiUrl, params } = getUrlAndParams(
      selectedOption,
      segmentationOption,
      captioningOption,
      instanceText,
      questionText,
      uploadedImage
    );

    try {
      setIsLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        body: params,
      });

      if (response.headers.get("content-type")?.startsWith("image")) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setResult(blobUrl);
      } else {
        const data = await response.text();
        setResult(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, getProcessedResults };
};
