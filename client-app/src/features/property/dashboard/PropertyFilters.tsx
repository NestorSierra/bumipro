import { Button, Card, CardContent, Divider, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function PropertyFilters() {
  const [suburb, setSuburb] = useState("");
  const [reference, setReference] = useState("");
  const [address, setAddress] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    switch (name) {
      case "suburb":
        setSuburb(value);
        break;
      case "reference":
        setReference(value);
        break;
      case "address":
        setAddress(value);
        break;
    }
  }

  function handleSearch() {}

  return (
    <Card>
      <CardContent>
        <TextField
          label="Suburb"
          value={suburb}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Reference"
          value={reference}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Address"
          value={address}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mt: 1, mb: 1 }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          fullWidth
          startIcon={<SearchIcon />}
        >
          Search
        </Button>

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
        </Button>
      </CardContent>
    </Card>
  );
});
