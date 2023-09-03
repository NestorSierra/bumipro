import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Copyright from "./Copyright";

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <div style={{ padding: "2em" }}>
        {children}
        <Copyright sx={{ pt: 4 }} />
      </div>
    </Box>
  );
}
