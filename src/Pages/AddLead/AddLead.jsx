import React from 'react';
import {
  Box,
  TextField,
} from '@mui/material';
import Layout from '../../component/Layout/Layout';

const AddLead = () => {
  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        <Box sx={{
          display: 'flex',
          gap: '25px', // Gap between input fields
          flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout
        }}>
          <TextField
            variant="outlined"
            sx={{
              backgroundColor: '#FFFFFF', // Background color
              borderRadius: '20px', // Border radius
              flex: 1, // Make input full responsive
              height: '63px', // Set height
              '& .MuiOutlinedInput-root': {
                border: 'none', // Remove border
                '& fieldset': {
                  border: 'none', // Remove outline
                },
                '&:hover fieldset': {
                  border: 'none', // Remove outline on hover
                },
                '&.Mui-focused fieldset': {
                  border: 'none', // Remove outline when focused
                },
              },
            }}
            inputProps={{
              style: { textAlign: 'center' }, // Center the placeholder text
            }}
            placeholder="Enter First Name" // Set placeholder text
            InputLabelProps={{
              shrink: true, // Ensure label does not overlap with placeholder
            }}
            label="First Name"
          />
          <TextField
            variant="outlined"
            sx={{
              backgroundColor: '#FFFFFF', // Background color
              borderRadius: '20px', // Border radius
              flex: 1, // Make input full responsive
              height: '63px', // Set height
              '& .MuiOutlinedInput-root': {
                border: 'none', // Remove border
                '& fieldset': {
                  border: 'none', // Remove outline
                },
                '&:hover fieldset': {
                  border: 'none', // Remove outline on hover
                },
                '&.Mui-focused fieldset': {
                  border: 'none', // Remove outline when focused
                },
              },
            }}
            inputProps={{
              style: { textAlign: 'center' }, // Center the placeholder text
            }}
            placeholder="Enter Last Name" // Set placeholder text
            InputLabelProps={{
              shrink: true, // Ensure label does not overlap with placeholder
            }}
            label="Last Name"
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default AddLead;
