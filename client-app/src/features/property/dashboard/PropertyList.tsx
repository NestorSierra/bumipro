import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@mui/icons-material/Delete";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";
import { PropertyFormValues } from "../../../models/property";

export default observer(function PropertyList() {
  const { propertyStore } = useStore();
  const { propertyByPrice } = propertyStore;

  return (
    <>
      {propertyByPrice.map((property: PropertyFormValues) => (
        <Grid key={property.id} item xs={12} marginBottom={3}>
          <Card>
            <CardContent style={{ padding: "0px" }}>
              <Grid
                container
                spacing={2}
                style={{ alignItems: "center", padding: "0px" }}
              >
                <Grid item xs={4} style={{ display: "flex" }}>
                  {property.imageUrl && (
                    <img
                      alt="property image"
                      src={property.imageUrl}
                      style={{ width: "100%" }}
                    />
                  )}
                </Grid>
                <Grid item xs={8} style={{ padding: "0px 10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.address}
                  </Typography>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <Chip icon={<BedIcon />} label={property.rooms ?? 0} />
                    <Chip
                      icon={<BathtubIcon />}
                      label={property.bathrooms ?? 0}
                      sx={{ marginLeft: "10px" }}
                    />
                    <Chip
                      icon={<DirectionsCarIcon />}
                      label={property.carsParking ?? 0}
                      sx={{ marginLeft: "10px" }}
                    />
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2 }}
                  >
                    {property.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        component={Link}
                        to={`/properties/${property.id}`}
                        color="primary"
                        variant="contained"
                        startIcon={<ListIcon />}
                        fullWidth
                      >
                        More Details...
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
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
        </Grid>
      ))}
    </>
  );
});
