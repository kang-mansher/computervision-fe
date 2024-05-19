import { Stack } from "@mui/material";
import useScreenSize from "../hooks/useScreenSize";
import DropZone from "./DropZone";
import Intro from "./Intro";

const Home = ({ onUpload }) => {
  const { isMobile } = useScreenSize();
  return (
    <Stack
      alignItems="center"
      p={3}
      sx={!isMobile ? { height: "100vh" } : undefined}
      direction={isMobile ? "column" : "row"}
      justifyContent="space-around"
    >
      <Intro />
      <DropZone onUpload={onUpload} />
    </Stack>
  );
};

export default Home;
