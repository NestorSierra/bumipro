import React, { useState } from "react";
import "./dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from "@mui/material";

export default function Banner() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleSearch() {}

  return (
    <div className="welcome-message">
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to Bumipro</h1>
          <p>Your Hub for Property and Room Rentals</p>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleInputChange}
            style={{ backgroundColor: "white" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                    size="small"
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* <MyTextInput label="Address" name="address" /> */}
        </div>
      </div>
    </div>
  );
}
