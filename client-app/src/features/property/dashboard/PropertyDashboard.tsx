import React, { useEffect, useMemo, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import PropertyList from "./PropertyList";
import PropertyFilters from "./PropertyFilters";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import PropertyListItemPlaceholder from "./PropertyListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation } from "react-router-dom";
import { PagingParams } from "../../../models/pagination";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function PropertyDashboard() {
  const location = useLocation();
  const { propertyStore } = useStore();
  const {
    propertiesRegistry,
    loadProperties,
    loadingInitial,
    setPredicate,
    setPagingParams,
    pagination,
    setApplicationMode,
  } = propertyStore;

  const searchParams = new URLSearchParams(location.search);
  const locationParam = searchParams.get("location");
  const categoryParam = searchParams.get("category");
  const [loadingNext, setLoadingNext] = useState(false);

  const propertySearch = useMemo(() => {
    if (locationParam || categoryParam) {
      return { location: locationParam, category: categoryParam };
    } else {
      return undefined;
    }
  }, [locationParam, categoryParam]);

  function handleGetNext() {
    console.log("Loading more pages");
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadProperties().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (!propertySearch) {
      if (propertiesRegistry.size <= 0) loadProperties();

      console.log("this is the pagination obj");
      console.log(pagination);
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
      <Grid item md={8} style={{ height: 300 }}>
        {loadingInitial && !loadingNext ? (
          <>
            <PropertyListItemPlaceholder margin={0} />
            <PropertyListItemPlaceholder />
            <PropertyListItemPlaceholder />
          </>
        ) : (
          <div>
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <PropertyList />
            </InfiniteScroll>
            {loadingNext && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ color: "blue" }} thickness={5} />
              </div>
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
});
