import React, { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import PropertyList from "./PropertyList";
import PropertyFilters from "./PropertyFilters";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import PropertyListItemPlaceholder from "./PropertyListItemPlaceholder";
import { useLocation } from "react-router-dom";

export default observer(function PropertyDashboard() {
  const location = useLocation();
  const { propertyStore } = useStore();
  const {
    propertiesRegistry,
    loadProperties,
    loadingInitial,
    setPredicate,
    setApplicationMode,
  } = propertyStore;

  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");
  const categoryParam = searchParams.get("category");

  const propertySearch = useMemo(() => {
    if (locationParam || categoryParam) {
      return { location: locationParam, category: categoryParam };
    } else {
      return undefined;
    }
  }, [locationParam, categoryParam]);

  useEffect(() => {
    if (!propertySearch) {
      if (propertiesRegistry.size <= 0) loadProperties();
      return;
    }

    const predicate = new Map<string, string>();

    if (propertySearch.category && propertySearch.category !== "") {
      predicate.set("category", propertySearch.category);
    }

    if (propertySearch.location && propertySearch.location !== "") {
      predicate.set("location", propertySearch.location);
    }

    if (propertiesRegistry.size <= 0) setPredicate(predicate);

    setApplicationMode(true);
  }, [propertySearch, setPredicate, propertiesRegistry.size, loadProperties, setApplicationMode]);

  return (
    <Grid container spacing={2}>
      <Grid item md={4} sx={{ paddingLeft: 3 }}>
        <PropertyFilters propertySearch={propertySearch} />
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
