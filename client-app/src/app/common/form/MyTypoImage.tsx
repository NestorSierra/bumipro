import { Icon, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
}

export default function MyTypoImage(props: Props) {
  return (
    <div className="icon-label">
      {props.icon && <span className="icon-label-icon">{props.icon}</span>}
      <Typography {...props}>{props.text}</Typography>
    </div>
  );
}
