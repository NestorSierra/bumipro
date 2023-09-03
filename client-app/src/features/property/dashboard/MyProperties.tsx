import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "../../../stores/store";
import { Grid } from "@mui/material";
import PropertyFilters from "./PropertyFilters";
import PropertyListItemPlaceholder from "./PropertyListItemPlaceholder";
import PropertyList from "./PropertyList";

export default observer(function MyProperties() {
  const { propertyStore } = useStore();
  const { myPropertiesRegistry, loadMyProperties, loadingInitial } =
    propertyStore;

  useEffect(() => {
    if (myPropertiesRegistry.size <= 1) loadMyProperties();
  }, [myPropertiesRegistry.size, loadMyProperties]);

  return (
    <Grid container spacing={2}>
      <Grid item md={4} sx={{ paddingLeft: 3 }}>
        <PropertyFilters createProperty={true} />
      </Grid>
      <Grid item md={8}>
        {loadingInitial ? (
          <>
            <PropertyListItemPlaceholder margin={0} />
            <PropertyListItemPlaceholder />
            <PropertyListItemPlaceholder />
          </>
        ) : (
          <PropertyList />
        )}
      </Grid>
    </Grid>
  );
});
