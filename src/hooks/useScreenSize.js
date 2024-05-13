import { useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

const useScreenSize = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.up("xs")); // 0px
  const isSm = useMediaQuery(theme.breakpoints.up("sm")); // 600px, mobile

  const isMobile = isXs && !isSm;

  return useMemo(() => {
    return {
      isMobile,
    };
  }, [isMobile]);
};

export default useScreenSize;
