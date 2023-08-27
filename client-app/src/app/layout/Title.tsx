import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

export default function Title(props: Props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
