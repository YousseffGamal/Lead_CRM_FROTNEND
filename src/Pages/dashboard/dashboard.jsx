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
  TablePagination,
  Switch, // Import Switch component
  Select, // Import Select component
  MenuItem as MuiMenuItem, // Import MenuItem for Select
  FormControl, // Import FormControl for Select
  InputLabel, // Import InputLabel for Select
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Layout from '../../component/Layout/Layout';

const Dashboard = () => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState(0); // 0 for Leads, 1 for Clients
  const [statusFilter, setStatusFilter] = useState('All'); // State for status filter

  // Static data for boxes and tables
  const stats = [
    { title: 'No. Of Leads', value: 150, bgColor: '#0177FB', textColor: '#fff' },
    { title: 'No. Of Clients', value: 80, bgColor: '#FFFFFF', textColor: '#000000' },
    { title: 'No. Of Sold Leads', value: 25, bgColor: '#FFFFFF', textColor: '#000000' },
  ];

  const leadsData = [
    { id: 1, sellerName: 'John Doe', dateAdded: '2024-01-15', state: 'Active', closingTime: '2024-12-01', temperature: 'Warm' },
    { id: 2, sellerName: 'Alice Johnson', dateAdded: '2024-02-10', state: 'Inactive', closingTime: '2024-11-20', temperature: 'Cold' },
    { id: 3, sellerName: 'Bob Brown', dateAdded: '2024-03-05', state: 'Active', closingTime: '2024-10-15', temperature: 'Hot' },
    { id: 4, sellerName: 'Charlie Davis', dateAdded: '2024-04-01', state: 'Active', closingTime: '2024-09-30', temperature: 'Warm' },
    { id: 5, sellerName: 'Emily Wilson', dateAdded: '2024-04-20', state: 'Active', closingTime: '2024-10-10', temperature: 'Warm' },
    { id: 6, sellerName: 'Frank Thomas', dateAdded: '2024-05-15', state: 'Inactive', closingTime: '2024-12-15', temperature: 'Cold' },
    { id: 7, sellerName: 'Grace Lee', dateAdded: '2024-06-10', state: 'Active', closingTime: '2024-11-05', temperature: 'Warm' },
    { id: 8, sellerName: 'Henry Taylor', dateAdded: '2024-07-01', state: 'Active', closingTime: '2024-09-25', temperature: 'Hot' },
    { id: 9, sellerName: 'Isabella Harris', dateAdded: '2024-07-22', state: 'Inactive', closingTime: '2024-11-30', temperature: 'Cool' },
    { id: 10, sellerName: 'Jack Martin', dateAdded: '2024-08-12', state: 'Active', closingTime: '2024-10-20', temperature: 'Warm' },
    { id: 11, sellerName: 'Liam Garcia', dateAdded: '2024-09-05', state: 'Inactive', closingTime: '2024-12-25', temperature: 'Cold' },
    { id: 12, sellerName: 'Mia Rodriguez', dateAdded: '2024-09-18', state: 'Active', closingTime: '2024-11-15', temperature: 'Hot' },
    { id: 13, sellerName: 'Noah Martinez', dateAdded: '2024-10-03', state: 'Active', closingTime: '2024-10-30', temperature: 'Warm' },
    { id: 14, sellerName: 'Olivia Anderson', dateAdded: '2024-10-15', state: 'Inactive', closingTime: '2024-12-01', temperature: 'Cool' },
    { id: 15, sellerName: 'Pablo Thompson', dateAdded: '2024-10-30', state: 'Active', closingTime: '2024-11-12', temperature: 'Hot' },
    { id: 16, sellerName: 'Quinn Lee', dateAdded: '2024-11-11', state: 'Inactive', closingTime: '2025-01-05', temperature: 'Cold' },
    { id: 17, sellerName: 'Sophia Young', dateAdded: '2024-12-01', state: 'Active', closingTime: '2025-01-20', temperature: 'Warm' },
];


const clientsData = [
  { id: 1, clientName: 'Jane Smith', dateJoined: '2024-01-20', status: 'Active' },
  { id: 2, clientName: 'Michael Johnson', dateJoined: '2024-02-15', status: 'Inactive' },
  { id: 3, clientName: 'Emily Davis', dateJoined: '2024-03-22', status: 'Active' },
  { id: 4, clientName: 'Daniel Martinez', dateJoined: '2024-04-10', status: 'Active' },
  { id: 5, clientName: 'Olivia Wilson', dateJoined: '2024-05-30', status: 'Inactive' },
  { id: 6, clientName: 'William Brown', dateJoined: '2024-06-15', status: 'Active' },
  { id: 7, clientName: 'Sophia Lee', dateJoined: '2024-07-01', status: 'Active' },
  { id: 8, clientName: 'Lucas Thompson', dateJoined: '2024-07-18', status: 'Inactive' },
  { id: 9, clientName: 'Ella Garcia', dateJoined: '2024-08-09', status: 'Active' },
  { id: 10, clientName: 'Aiden Smith', dateJoined: '2024-08-25', status: 'Active' },
  { id: 11, clientName: 'Isabella Taylor', dateJoined: '2024-09-07', status: 'Inactive' },
  { id: 12, clientName: 'James Harris', dateJoined: '2024-09-21', status: 'Active' },
  { id: 13, clientName: 'Mason Robinson', dateJoined: '2024-10-05', status: 'Active' },
  { id: 14, clientName: 'Mia Clark', dateJoined: '2024-10-19', status: 'Inactive' },
  { id: 15, clientName: 'Ethan Lewis', dateJoined: '2024-11-03', status: 'Active' },
  { id: 16, clientName: 'Harper Walker', dateJoined: '2024-11-15', status: 'Inactive' },
  { id: 17, clientName: 'Alexander Hall', dateJoined: '2024-12-01', status: 'Active' },
];


  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log(`Deleted user with ID: ${currentUserId}`);
    handleClose();
  };

  const getTemperatureStyles = (temperature) => {
    switch (temperature) {
      case 'Cold':
        return { color: '#0466D4', backgroundColor: '#f0f7ff', borderRadius: '25.74px' };
      case 'Hot':
        return { color: '#CB0A1D', backgroundColor: '#ffebed', borderRadius: '25.74px' };
      case 'Warm':
        return { color: '#D0A704', backgroundColor: '#fffae6', borderRadius: '25.74px' };
      default:
        return {};
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to handle tab change
  const handleSwitchChange = (event) => {
    setActiveTab(event.target.checked ? 1 : 0); // Switch to Clients if checked, Leads if unchecked
    setPage(0); // Reset to first page on switch change
  };

  // Handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        {/* Statistics Boxes */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
  {stats.map((stat, index) => (
    <Box
      key={index}
      sx={{
        backgroundColor: stat.bgColor,
        padding: '16px',
        borderRadius: '30px',
        width: { xs: '100%', sm: '465px' }, // Full width on mobile, fixed width on larger screens
        height: '195px', // Fixed height
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
   <Typography
  className='CardNumber'
  variant="h1"
  sx={{
    color: stat.textColor,
    fontWeight: 'bold',
    fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '78px' }, // Responsive font size
  }}
>
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
      <Typography className='TitleCard' variant="h6" sx={{ color: stat.textColor }}>
        {stat.title}
      </Typography>
    </Box>
  ))}
</Box>



        {/* Labels, Switch, and Status Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: activeTab === 0 ? '#0177FB' : '#000', mr: 2 }}>
            Leads
          </Typography>
          <Switch
            checked={activeTab === 1}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'Switch between Leads and Clients' }}
          />
          <Typography variant="h6" sx={{ color: activeTab === 1 ? '#0177FB' : '#000', ml: 2 }}>
            Clients
          </Typography>
          {/* <FormControl variant="outlined" sx={{ ml: 2, minWidth: 200 }}>
  <InputLabel id="status-select-label">Status</InputLabel>
  <Select
    labelId="status-select-label"
    value={statusFilter}
    onChange={handleStatusChange}
    label="Status"
    sx={{
      bgcolor: '#FFFFFF', // Set background color to white
      borderRadius: '16.65px', // Set border radius
      '& .MuiSelect-select': {
        padding: '10px', // Add padding for better aesthetics
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#757575', // Optional: Custom border color
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#757575', // Optional: Change border color on hover
      },
    }}
  >
    <MuiMenuItem value="All">All</MuiMenuItem>
    <MuiMenuItem value="Active">Active</MuiMenuItem>
    <MuiMenuItem value="Inactive">Inactive</MuiMenuItem>
  </Select>
</FormControl> */}



        </Box>

        {/* Table based on active tab */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', color: '#ffffff', borderRadius: '30px', mt: 2,overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                {activeTab === 0 ? (
                  <>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Seller Name</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Date Added</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>State</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Closing Time</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Temperature</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Action</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className='TableHeader'  sx={{ color: '#667085' }}>Client Name</TableCell>
                    <TableCell className='TableHeader'  sx={{ color: '#667085' }}>Date Joined</TableCell>
                    <TableCell className='TableHeader'  sx={{ color: '#667085' }}>Status</TableCell>
                    <TableCell className='TableHeader'  sx={{ color: '#667085' }}>Action</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {activeTab === 0
                ? leadsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                    const tempStyles = getTemperatureStyles(user.temperature);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className='TableData'  sx={{ color: '#101828' }}>{user.sellerName}</TableCell>
                        <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.dateAdded}</TableCell>
                        <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{user.state}</TableCell>
                        <TableCell className='TableDataS'  sx={{ color: '#101828' }}>{user.closingTime}</TableCell>
                        <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>
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
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            <MenuItem >Edit</MenuItem>

                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                  : clientsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className='TableData'  sx={{ color: '#101828' }}>{client.clientName}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{client.dateJoined}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{client.status}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>
                        <Button
                          onClick={(event) => handleClick(event, client.id)}
                          sx={{ minWidth: '36px', padding: 0 }}
                          aria-controls={anchorEl ? 'simple-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={anchorEl ? 'true' : undefined}
                        >
                          <MoreVertIcon />
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                          <MenuItem onClick={handleDelete}>Delete</MenuItem>
                          <MenuItem >Edit</MenuItem>

                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={activeTab === 0 ? leadsData.length : clientsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Layout>
  );
};

export default Dashboard;
