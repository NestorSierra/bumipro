import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import PropertyList from "./PropertyList";
import PropertyFilters from "./PropertyFilters";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import PropertyListItemPlaceholder from "./PropertyListItemPlaceholder";

export default observer(function PropertyDashboard() {
  const { propertyStore } = useStore();
  const { myPropertiesRegistry, loadProperties, loadingInitial } =
    propertyStore;

  useEffect(() => {
    if (myPropertiesRegistry.size <= 1) loadProperties();
  }, [myPropertiesRegistry.size, loadProperties]);

  return (
    <Grid container spacing={2}>
      <Grid item md={4} sx={{ paddingLeft: 3 }}>
        <PropertyFilters />
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
