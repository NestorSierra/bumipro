import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function ServerError() {
  const { commonStore } = useStore();

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" gutterBottom>
        Error en el servidor
      </Typography>
      <Box component="div">
        {commonStore.error?.message && (
          <Typography variant="h5" color="error" gutterBottom>
            {commonStore.error?.message}
          </Typography>
        )}
        {commonStore.error?.details && (
          <Box component="div">
            <Typography variant="h4" gutterBottom>
              Seguimiento de pila
            </Typography>
            <code style={{ marginTop: "10px" }}>
              {commonStore.error?.details}
            </code>
          </Box>
        )}
      </Box>
    </Container>
  );
});
