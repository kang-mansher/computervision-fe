import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectOption = ({ labelId, value, onChange, label, options }) => {
  return (
    <Box p={1}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          value={value}
          onChange={onChange}
          label={label}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectOption;
