import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface Props {
  inverted?: boolean;
  content?: string;
}

export default function LoadingComponent({
  inverted = true,
  content = "Loading ",
}: Props) {
  return (
    <Backdrop open={inverted} className="backdrop">
      <CircularProgress style={{ color: "white" }} />
      <Typography style={{ marginLeft: 10, color: "white" }}>
        {content}
      </Typography>
    </Backdrop>
  );
}
