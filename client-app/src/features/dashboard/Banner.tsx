import React, { useState } from "react";
import "./dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleCategoryChange(event: SelectChangeEvent) {
    setSelectedCategory(event.target.value as string);
  }

  function handleSearch() {
    console.log("Search Query:", searchQuery);
    console.log("Selected Category:", selectedCategory);
  }

  return (
    <div className="welcome-message">
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to Bumipro</h1>
          <p>Your Hub for Property and Room Rentals</p>
        </div>
        <TextField
          variant="filled"
          size="small"
          label="Try a location where you want to live"
          value={searchQuery}
          onChange={handleInputChange}
          className="search-banner"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  variant="outlined"
                  className="dropdown-search"
                  size="small"
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
                  className="button-search"
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}
