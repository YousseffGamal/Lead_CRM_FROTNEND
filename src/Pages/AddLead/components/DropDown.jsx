import React from "react";
import { Box, InputLabel, Select, MenuItem } from "@mui/material";

const DropDown = ({
  fieldName,
  handleChange,
  list,
  state,
  render,
  disabled,
}) => {
  return (
    <Box sx={{ flex: 1, position: "relative" }}>
      <InputLabel
        htmlFor={fieldName}
        sx={{
          position: "absolute",
          left: "10px",
          top: "15px",
          backgroundColor: "#FFFFFF",
          padding: "0 5px",
          zIndex: 1,
          color: "#191919",
          fontFamily: "LufgaMedium !important",
        }}
        shrink={!!state}
      >
        {fieldName}
      </InputLabel>
      <Select
        disabled={disabled ? disabled : ""}
        id={fieldName}
        variant="outlined"
        name={fieldName}
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFF !important",
          borderRadius: "20px !important",
          height: "63px",
          "& .MuiSelect-select": {
            textAlign: "center",
            paddingTop: "15px",
            backgroundColor: "#FFFFFF !important",
          },
          "&:before, &:after": {
            border: "none",
          },
          "&.Mui-focused .MuiSelect-select": {
            border: "none",
          },
          "&:hover .MuiSelect-select": {
            backgroundColor: "#FFFFFF !important",
            border: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        value={state}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select {fieldName}
        </MenuItem>
        {list.map((item) => render(item))}
      </Select>
    </Box>
  );
};

export default DropDown;
