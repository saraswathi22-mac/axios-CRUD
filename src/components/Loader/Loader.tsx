import { FC } from "react";
import { Box, CircularProgress } from "@chakra-ui/react";

export const Loader: FC = () => {
  return (
    <Box
      backgroundColor={"black"}
      opacity={"0.85"}
      position={"fixed"}
      top={"0"}
      left={"0"}
      bottom={"0"}
      width={"100%"}
      zIndex="50"
      overflow={"hidden"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <CircularProgress
        isIndeterminate
        color="red"
        size="100px"
        thickness="6px"
      />
    </Box>
  );
};
