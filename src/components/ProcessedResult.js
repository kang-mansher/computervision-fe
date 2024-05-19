import React from "react";
import {
  Alert,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useScreenSize from "../hooks/useScreenSize";

const ProcessedResult = ({ isOpen, onClose, result, error, isLoading }) => {
  const { isMobile } = useScreenSize();

  return (
    <Dialog open={isOpen} maxWidth="xl" fullScreen={isMobile} onClose={onClose}>
      {isLoading ? (
        <Stack alignItems="center" p={2}>
          <p>Fetching results...</p>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <DialogTitle>
            Results
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            {result?.startsWith("blob:") ? (
              <img
                src={result}
                alt="result"
                style={{
                  maxWidth: isMobile ? "350px" : "800px",
                  maxHeight: isMobile ? "500px" : "700px",
                }}
              />
            ) : (
              <p>{result}</p>
            )}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ProcessedResult;
