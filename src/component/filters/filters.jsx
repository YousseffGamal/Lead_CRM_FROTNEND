import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import axiosInstance from "../../axios";
import {
  occupancyOptions,
  leadTemperatureOptions,
} from "../../Pages/AddLead/components/constants";

const FilterComponent = ({ setLeadsData }) => {
  // State variables for each filter option
  const [state, setState] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [startClosing, setStartClosing] = useState("");
  const [endClosing, setEndClosing] = useState("");
  const [startAskingPrice, setStartAskingPrice] = useState("");
  const [endAskingPrice, setEndAskingPrice] = useState("");
  const [temperature, setTemperature] = useState("");
  const [states, setStates] = useState([]);

  // Fetch states from the server
  const getStates = async () => {
    try {
      const response = await axiosInstance.get("getAllStates");
      setStates(response.data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  // Common handler for onChange events
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  // Handle filtering and setting data
  const handleFilter = async () => {
    try {
      // Define query parameters
      const queryParams = {
        state,
        occupancy,
        leadType: temperature,
        startAskingPrice,
        endAskingPrice,
        closing: `${startClosing}-${endClosing}`,
      };

      // Fetch filtered data from API
      const response = await axiosInstance.get(
        "getLeadsFiltered",
        { params: queryParams }
      );

      // Update the leads data with response
      setLeadsData(response.data.data);
    } catch (error) {
      console.error("Error fetching filtered leads:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        top: "10px",
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        marginBottom: 2,
        alignItems: "center",
        justifyContent: "flex-start",
        "@media (max-width: 600px)": {
          width: "100%",
        },
      }}
    >
      {/* State Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          label="State"
          onChange={(event) => handleChange(event, setState)}
          sx={{ height: "48.28px", borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {states.map((element) => (
            <MenuItem key={element._id} value={element._id}>
              {element.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Occupancy Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <InputLabel>Occupancy</InputLabel>
        <Select
          value={occupancy}
          label="Occupancy"
          onChange={(event) => handleChange(event, setOccupancy)}
          sx={{ height: "48.28px", borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {occupancyOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

     {/* Closing Days Range Filter */}
     <FormControl
        sx={{
          minWidth: "185.79px",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          value={startClosing}
          label="Start Closing (days)"
          onChange={(event) => handleChange(event, setStartClosing)}
          type="number"
          InputLabelProps={{ shrink: true }}
          sx={{ borderRadius: "16.65px", width: "50%" }}
        />
        <TextField
          value={endClosing}
          label="End Closing (days)"
          onChange={(event) => handleChange(event, setEndClosing)}
          type="number"
          InputLabelProps={{ shrink: true }}
          sx={{ borderRadius: "16.65px", width: "50%" }}
        />
      </FormControl>

      {/* Asking Price Range Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          value={startAskingPrice}
          label="Start Price"
          onChange={(event) => handleChange(event, setStartAskingPrice)}
          type="number"
          InputLabelProps={{ shrink: true }}
          sx={{ borderRadius: "16.65px", width: "50%" }}
        />
        <TextField
          value={endAskingPrice}
          label="End Price"
          onChange={(event) => handleChange(event, setEndAskingPrice)}
          type="number"
          InputLabelProps={{ shrink: true }}
          sx={{ borderRadius: "16.65px", width: "50%" }}
        />
      </FormControl>


      {/* Temperature Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <InputLabel>Lead Type</InputLabel>
        <Select
          value={temperature}
          label="Temperature"
          onChange={(event) => handleChange(event, setTemperature)}
          sx={{ height: "48.28px", borderRadius: "16.65px" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {leadTemperatureOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filter Button */}
      <IconButton
        sx={{
          backgroundColor: "#000000",
          borderRadius: "16.65px",
          color: "#FFFFFF",
          height: "48.28px",
          width: "48.28px",
          "&:hover": {
            backgroundColor: "#333333",
          },
          flex: "0 0 auto",
        }}
        onClick={handleFilter}
      >
        <FilterListIcon />
      </IconButton>
    </Box>
  );
};

export default FilterComponent;
