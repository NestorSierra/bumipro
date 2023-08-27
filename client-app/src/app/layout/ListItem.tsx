import React from "react";
import { ListItem as ListItemUI } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  icon: any;
  to: string;
}

export default function ListItem({ label, icon, to }: Props) {
  return (
    <>
      <ListItemUI button component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemUI>
    </>
  );
}
