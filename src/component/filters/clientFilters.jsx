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

const clientFilters = ({ setClientsData }) => {
  const [minPrice, setminPrice] = useState("");
  const [maxPrice, setmaxPrice] = useState("");
  const [investorCategory, setInvestorCategory] = useState("");
  const [error, setError] = useState({});
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleFilter = async () => {
    try {
      // Prepare the query parameters
      const queryParams = {
        minPrice,
        maxPrice,
        investorCategory,
      };

      // Make the API request
      const response = await axiosInstance.get(
        "http://localhost:4000/getClientsFiltered",
        { params: queryParams }
      );

      // Handle the response data
      setClientsData(response.data.Allusers);
      console.log(response.data);
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
      {/* Asking Price Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <TextField
          value={minPrice}
          label="Min Amount Spent"
          onChange={(event) => handleChange(event, setminPrice)}
          type="number"
          InputProps={{
            sx: {
              height: "48.28px",
              borderRadius: "16.65px",
            },
          }}
          sx={{ borderRadius: "16.65px" }}
        />
      </FormControl>
      {/* Asking Price Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <TextField
          value={maxPrice}
          label="Max Amount Spent"
          onChange={(event) => handleChange(event, setmaxPrice)}
          type="number"
          InputProps={{
            sx: {
              height: "48.28px",
              borderRadius: "16.65px",
            },
          }}
          sx={{ borderRadius: "16.65px" }}
        />
      </FormControl>
      {/* Investor category Filter */}
      <FormControl
        sx={{
          minWidth: "185.79px",
          height: "48.28px",
          borderRadius: "16.65px",
          flex: "1 1 auto",
        }}
      >
        <InputLabel>Investor category</InputLabel>
        <Select
          value={investorCategory}
          label="Investor category"
          onChange={(event) => handleChange(event, setInvestorCategory)}
          sx={{ height: "48.28px", borderRadius: "16.65px" }}
        >
          <MenuItem key="1" value="">
            <em>None</em>
          </MenuItem>
          <MenuItem key="2" value="Wholesaler">
            Wholesaler
          </MenuItem>
          <MenuItem key="3" value="Realtor">
            Realtor
          </MenuItem>
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

export default clientFilters;
