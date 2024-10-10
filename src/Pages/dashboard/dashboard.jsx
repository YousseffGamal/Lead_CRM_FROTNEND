// src/pages/Dashboard.jsx
import React, { useState } from 'react'; // Import useState for managing state
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TablePagination, // Import TablePagination
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import the MoreVert icon
import Layout from '../../component/Layout/Layout';

const Dashboard = () => {
  // Static data for boxes and table
  const stats = [
    { title: 'No. Of Leads', value: 150, bgColor: '#0177FB', textColor: '#fff' },
    { title: 'No. Of Clients', value: 80, bgColor: '#FFFFFF', textColor: '#000000' },
    { title: 'No. Of Sold Leads', value: 25, bgColor: '#FFFFFF', textColor: '#000000' },
  ];

  const tableData = [
    { id: 1, sellerName: 'John Doe', dateAdded: '2024-01-15', state: 'Active', closingTime: '2024-12-01', temperature: 'Warm' },
    { id: 2, sellerName: 'Jane Smith', dateAdded: '2024-01-20', state: 'Inactive', closingTime: '2024-11-30', temperature: 'Cold' },
    { id: 3, sellerName: 'Mike Johnson', dateAdded: '2024-01-25', state: 'Active', closingTime: '2024-12-15', temperature: 'Hot' },
    { id: 4, sellerName: 'Alice Brown', dateAdded: '2024-02-05', state: 'Active', closingTime: '2024-11-20', temperature: 'Warm' },
    { id: 5, sellerName: 'Tom White', dateAdded: '2024-02-10', state: 'Inactive', closingTime: '2024-12-05', temperature: 'Cold' },
    { id: 6, sellerName: 'Emily Green', dateAdded: '2024-02-15', state: 'Active', closingTime: '2024-11-10', temperature: 'Hot' },
    { id: 7, sellerName: 'Chris Blue', dateAdded: '2024-02-20', state: 'Inactive', closingTime: '2024-12-25', temperature: 'Cold' },
    { id: 8, sellerName: 'Nina Gray', dateAdded: '2024-03-01', state: 'Active', closingTime: '2024-11-30', temperature: 'Warm' },
    { id: 9, sellerName: 'Leo Black', dateAdded: '2024-03-05', state: 'Active', closingTime: '2024-12-10', temperature: 'Hot' },
    { id: 10, sellerName: 'Mia Red', dateAdded: '2024-03-10', state: 'Inactive', closingTime: '2024-11-20', temperature: 'Warm' },
    { id: 11, sellerName: 'Olivia Gold', dateAdded: '2024-03-15', state: 'Active', closingTime: '2024-12-30', temperature: 'Hot' },
    { id: 12, sellerName: 'Ethan Silver', dateAdded: '2024-03-20', state: 'Inactive', closingTime: '2024-12-15', temperature: 'Cold' },
    { id: 13, sellerName: 'Liam Pink', dateAdded: '2024-04-01', state: 'Active', closingTime: '2024-11-25', temperature: 'Warm' },
    { id: 14, sellerName: 'Emma Violet', dateAdded: '2024-04-05', state: 'Active', closingTime: '2024-12-20', temperature: 'Warm' },
    { id: 15, sellerName: 'Isabella Orange', dateAdded: '2024-04-10', state: 'Inactive', closingTime: '2024-12-01', temperature: 'Cold' },
  ];

  // State for pagination
  const [page, setPage] = useState(0); // Current page state
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Function to handle dropdown opening
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(id);
  };

  // Function to handle dropdown menu item click
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle delete action
  const handleDelete = () => {
    console.log(`Deleted user with ID: ${currentUserId}`);
    handleClose();
  };

  // Function to get styles based on temperature
  const getTemperatureStyles = (temperature) => {
    switch (temperature) {
      case 'Cold':
        return {
          color: '#0466D4',
          backgroundColor: '#f0f7ff',
          borderRadius: '25.74px',
        };
      case 'Hot':
        return {
          color: '#CB0A1D',
          backgroundColor: '#ffebed',
          borderRadius: '25.74px',
        };
      case 'Warm':
        return {
          color: '#D0A704',
          backgroundColor: '#fffae6',
          borderRadius: '25.74px',
        };
      default:
        return {};
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '40px' }}>
        {/* Statistics Boxes */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: stat.bgColor,
                padding: '16px',
                borderRadius: '30px',
                width: '33%',
                textAlign: 'center',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h2" sx={{ color: stat.textColor, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem' } }}>
                {stat.value}
              </Typography>
              <Box
                sx={{
                  width: '60%',
                  height: '1px',
                  backgroundColor: stat.textColor,
                  my: 1,
                  opacity: 0.5,
                  mx: 'auto',
                }}
              />
              <Typography variant="h6" sx={{ color: stat.textColor }}>
                {stat.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', color: '#ffffff', borderRadius: '30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#667085' }}>Seller Name</TableCell> {/* Header color */}
                <TableCell sx={{ color: '#667085' }}>Date Added</TableCell> {/* Header color */}
                <TableCell sx={{ color: '#667085' }}>State</TableCell> {/* Header color */}
                <TableCell sx={{ color: '#667085' }}>Closing Time</TableCell> {/* Header color */}
                <TableCell sx={{ color: '#667085' }}>Temperature</TableCell> {/* Header color */}
                <TableCell sx={{ color: '#667085' }}>Action</TableCell> {/* Header color */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => { // Slice data for pagination
                const tempStyles = getTemperatureStyles(user.temperature); // Get styles for the current temperature
                return (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: '#101828' }}>{user.sellerName}</TableCell> {/* Cell color */}
                    <TableCell sx={{ color: '#101828' }}>{user.dateAdded}</TableCell> {/* Cell color */}
                    <TableCell sx={{ color: '#101828' }}>{user.state}</TableCell> {/* Cell color */}
                    <TableCell sx={{ color: '#101828' }}>{user.closingTime}</TableCell> {/* Cell color */}
                    <TableCell sx={{ color: '#101828' }}>
                      <Box sx={{ ...tempStyles, padding: '8px', display: 'inline-block' }}>
                        {user.temperature}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#101828' }}>
                      <Button
                        onClick={(event) => handleClick(event, user.id)}
                        sx={{ minWidth: '36px', padding: 0 }}
                        aria-controls={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]} // Options for rows per page
            component="div"
            count={tableData.length} // Total number of rows
            rowsPerPage={rowsPerPage} // Current rows per page
            page={page} // Current page
            onPageChange={handleChangePage} // Page change handler
            onRowsPerPageChange={handleChangeRowsPerPage} // Rows per page change handler
          />
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default Dashboard;
