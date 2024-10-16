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
import axios from "axios"; // Import axios
import {
  occupancyOptions,
  leadTemperatureOptions,
} from "../../Pages/AddLead/components/constants";
import axiosInstance from "../../axios";

const FilterComponent = () => {
  const [state, setState] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [closing, setClosing] = useState(""); // Still keeping the state
  const [temperature, setTemperature] = useState("");

  const [states, setStates] = useState([]);
  //function to get states
  const getStates = () => {
    axiosInstance
      .get("getAllStates")
      .then((res) => {
        console.log("from here", res.data.states);
        setStates(res.data.states);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStates();
  }, []);
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleFilter = async () => {
    try {
      // Prepare the query parameters
      const queryParams = {
        state,
        occupancy,
        closingTime: closing === "Open" ? new Date() : undefined, // Example condition based on the state of the closing filter
        askingPrice: temperature === "Hot" ? 100000 : undefined, // Example condition based on temperature filter
      };

      // Make the API request
      const response = await axios.get(
        "http://localhost:4000/getLeadsFiltered",
        { params: queryParams }
      );

      // Handle the response data
      console.log("Filtered leads:", response.data.data);
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
          <MenuItem value="" disabled>
            Select a state
          </MenuItem>
          {states.map((element) => (
            <MenuItem value={element._id}>{element.name}</MenuItem>
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
          {occupancyOptions.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Closing Filter (changed to Input with same border radius) */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <TextField
          value={closing}
          label="Closing"
          onChange={(event) => handleChange(event, setClosing)}
          InputProps={{
            sx: {
              height: "48.28px",
              borderRadius: "16.65px", // Applying the same border radius
            },
          }}
          type="number"
          sx={{ borderRadius: "16.65px" }} // Ensure the outer TextField component also has the borderRadius
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
        <InputLabel>Temperature</InputLabel>
        <Select
          value={temperature}
          label="Temperature"
          onChange={(event) => handleChange(event, setTemperature)}
          sx={{ height: "48.28px", borderRadius: "16.65px" }}
        >
          {leadTemperatureOptions.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Icon Filter Button */}
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
