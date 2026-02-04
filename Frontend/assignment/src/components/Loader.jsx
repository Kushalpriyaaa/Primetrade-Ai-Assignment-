import { Box, CircularProgress } from "@mui/material";

const Loader = ({ size = 40, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default Loader;