import {
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link, useFetcher } from "react-router-dom";
import { PropertySearch } from "../../../models/propertySearch";
import { useStore } from "../../../stores/store";

interface Props {
  createProperty?: boolean;
  propertySearch?: PropertySearch;
}

export default observer(function PropertyFilters({
  createProperty,
  propertySearch,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [location, setLocation] = useState("");
  const { propertyStore } = useStore();
  const { setPredicate } = propertyStore;

  useEffect(() => {
    if (propertySearch) {
      if (propertySearch.category) setSelectedCategory(propertySearch.category);
      if (propertySearch.location) setLocation(propertySearch.location);
    }
  }, [propertySearch]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name === "location") setLocation(value);
  }

  function handleCategoryChange(event: SelectChangeEvent) {
    setSelectedCategory(event.target.value as string);
  }

  function handleSearch() {
    const predicate = new Map<string, string>();
    predicate.set("location", location);
    predicate.set("category", selectedCategory);

    setPredicate(predicate);
  }

  return (
    <Card>
      <CardContent>
        <TextField
          label="Location"
          value={location}
          name="location"
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          fullWidth
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="outlined"
          className="dropdown-search"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="room">Room</MenuItem>
          <MenuItem value="carparking">Car Parking</MenuItem>
          <MenuItem value="warehouse">Warehouse</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleSearch}
          fullWidth
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

        {createProperty && (
          <>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Button
              variant="contained"
              component={Link}
              to="/createProperty"
              fullWidth
              color="success"
              startIcon={<AddIcon />}
            >
              Add New Property
            </Button>{" "}
          </>
        )}
      </CardContent>
    </Card>
  );
});
