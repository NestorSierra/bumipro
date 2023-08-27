import { Box, Button, Card, CardContent, Grid, Skeleton } from "@mui/material";
import React, { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  margin?: number;
}

export default function PropertyListItemPlaceholder({ margin = 3 }: Props) {
  return (
    <Fragment>
      <Box marginTop={margin}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Skeleton
                  sx={{ height: 200 }}
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                />
              </Grid>
              <Grid item xs={8}>
                <Skeleton
                  animation="wave"
                  height={40}
                  width="50%"
                  sx={{ marginBottom: 1 }}
                />
                <Skeleton animation="wave" height={20} width="100%" />
                <Skeleton animation="wave" height={20} width="100%" />
                <Skeleton animation="wave" height={20} width="100%" />
                <Skeleton
                  animation="wave"
                  height={20}
                  width="80%"
                  sx={{ marginBottom: 2 }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="primary"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      fullWidth
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      disabled
                      color="error"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}
