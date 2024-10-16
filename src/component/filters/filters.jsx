import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList'; // Import the filter icon

const FilterComponent = () => {
  const [state, setState] = useState('');
  const [occupancy, setOccupancy] = useState('');
  const [listing, setListing] = useState('');
  const [closing, setClosing] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleFilter = () => {
    // Add your filter logic here
    console.log('Filter applied with:', { state, occupancy, listing, closing, temperature });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        top: '10px',
        display: 'flex',
        gap: 2, // Adds space between the selects
        flexWrap: 'wrap', // Ensures responsive behavior
        marginBottom: 2,
        alignItems: 'center', // Aligns items vertically in the center
      }}
    >
      {/* State Filter */}
      <FormControl sx={{ minWidth: 185.79, height: 48.28, borderRadius: '16.65px' }}>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          label="State"
          onChange={(event) => handleChange(event, setState)}
          sx={{ height: 48.28, borderRadius: '16.65px' }}
        >
          <MenuItem value="State 1">State 1</MenuItem>
          <MenuItem value="State 2">State 2</MenuItem>
        </Select>
      </FormControl>

      {/* Occupancy Filter */}
      <FormControl sx={{ minWidth: 185.79, height: 48.28, borderRadius: '16.65px' }}>
        <InputLabel>Occupancy</InputLabel>
        <Select
          value={occupancy}
          label="Occupancy"
          onChange={(event) => handleChange(event, setOccupancy)}
          sx={{ height: 48.28, borderRadius: '16.65px' }}
        >
          <MenuItem value="Full">Full</MenuItem>
          <MenuItem value="Partial">Partial</MenuItem>
        </Select>
      </FormControl>

      {/* Listing Filter */}
      <FormControl sx={{ minWidth: 185.79, height: 48.28, borderRadius: '16.65px' }}>
        <InputLabel>Listing</InputLabel>
        <Select
          value={listing}
          label="Listing"
          onChange={(event) => handleChange(event, setListing)}
          sx={{ height: 48.28, borderRadius: '16.65px' }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {/* Closing Filter */}
      <FormControl sx={{ minWidth: 185.79, height: 48.28, borderRadius: '16.65px' }}>
        <InputLabel>Closing</InputLabel>
        <Select
          value={closing}
          label="Closing"
          onChange={(event) => handleChange(event, setClosing)}
          sx={{ height: 48.28, borderRadius: '16.65px' }}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {/* Temperature Filter */}
      <FormControl sx={{ minWidth: 185.79, height: 48.28, borderRadius: '16.65px' }}>
        <InputLabel>Temperature</InputLabel>
        <Select
          value={temperature}
          label="Temperature"
          onChange={(event) => handleChange(event, setTemperature)}
          sx={{ height: 48.28, borderRadius: '16.65px' }}
        >
          <MenuItem value="Hot">Hot</MenuItem>
          <MenuItem value="Cold">Cold</MenuItem>
        </Select>
      </FormControl>

      {/* Icon Filter Button */}
      <IconButton
        sx={{
          backgroundColor: '#000000',
          borderRadius: '16.65px',
          color: '#FFFFFF',
          height: 48.28,
          width: 48.28, // Make it a square
          '&:hover': {
            backgroundColor: '#333333', // Slightly lighter on hover
          },
        }}
        onClick={handleFilter}
      >
        <FilterListIcon />
      </IconButton>
    </Box>
  );
};

export default FilterComponent;
