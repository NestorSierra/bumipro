import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function NotFound() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{ textAlign: "center", p: 5, border: "1px dashed grey" }}
        direction="column"
        spacing={2}
      >
        <SearchIcon sx={{ fontSize: 80 }} />
        <Typography variant="h4" component="h2">
          Opps - no se encontro el recurso que estaba buscando
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          size="large"
        >
          Retornar a la pagina de productos
        </Button>
      </Stack>
    </Box>
  );
}
