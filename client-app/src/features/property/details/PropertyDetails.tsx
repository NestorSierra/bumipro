import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import DetailsPlaceholder from "../../../app/common/placeholder/DetailsPlaceholder";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PropertyInfo from "./PropertyInfo";

export default observer(function PropertyDetails() {
  const { propertyStore } = useStore();
  const {
    selectedProperty: property,
    loadProperty,
    loadingInitial,
    carouselImageItems,
  } = propertyStore;
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      loadProperty(id);
    }
  }, [id, loadProperty]);

  if (loadingInitial || !property)
    return (
      <DetailsPlaceholder
        hasImage={true}
        titles={1}
        subtitles={1}
        descriptionRows={5}
      />
    );

  return (
    <Card style={{ width: "100%" }}>
      <CardContent style={{ padding: "0px" }}>
        <PropertyInfo
          property={property}
          carouselImageItems={carouselImageItems}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              component={Link}
              to={`/properties/manage/${property.id}`}
              color="primary"
              variant="contained"
              startIcon={<EditIcon />}
              fullWidth
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to="/properties"
              color="error"
              variant="contained"
              startIcon={<CancelIcon />}
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
