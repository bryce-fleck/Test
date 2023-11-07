import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

export default function FromAutocomplete({ change, airports }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");


  const options = airports.map((airport) => ({
    label: airport.airport_name,
    value: airport.city_iata_code,
    name: airport.city_iata_code,
    latitude: airport.latitude,
    longitude: airport.longitude
  }));

  const onSelectAirport = (latitude, longitude) => {
    const data = {
      latitude: latitude,
      longitude: longitude
    }
    change(data, true)
  }

  return (
    <Autocomplete
      className="autocomplete__container"
      open={open}
      onOpen={() => {
        if (inputValue) {
          setOpen(true);
        }
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={inputValue}
      onChange={(event, value) => {
        onSelectAirport(value?.latitude, value?.longitude)
      }}
      onInputChange={(e, value, reason) => {
        setInputValue(value);
        if (!value) {
          setOpen(false);
        }
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Airport from"
          variant="outlined"
          placeholder="e.g. Sabzevar"
        />
      )}
    />
  );
}
