import React, { useState, useEffect } from 'react'; // Import useState for managing state
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
import axiosInstance from '../../axios';


const Dashboard = () => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState(0); // 0 for Leads, 1 for Clients
  const [statusFilter, setStatusFilter] = useState('All'); // State for status filter
  const [clientsData, setClientsData] = useState([]);
  const [leadsData, setLeadsData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const stats = [
    { title: 'No. Of Leads', value: 150, bgColor: '#0177FB', textColor: '#fff' },
    { title: 'No. Of Clients', value: 80, bgColor: '#FFFFFF', textColor: '#000000' },
    { title: 'No. Of Sold Leads', value: 25, bgColor: '#FFFFFF', textColor: '#000000' },
  ];

  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true); 
      const response = await axiosInstance.get('/getAllLeads'); 
      console.log('Leads Data:', response.data.data); 
      setLeadsData(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeadsData([]); 
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients data
  const fetchClients = async () => {
    try {
      setLoading(true); 
      const response = await axiosInstance.get('/getallusers'); 
      console.log('Full Response:', response); 
      console.log('Clients Data:', response.data.Allusers); 
      setClientsData(Array.isArray(response.data.Allusers) ? response.data.Allusers : []); // Adjust this based on actual structure
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClientsData([]); 
    } finally {
      setLoading(false); 
    }
  };

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

 // Fetch data based on activeTab when the component loads or activeTab changes
  useEffect(() => {
    if (activeTab === 0) {
      fetchLeads(); 
    } else {
      fetchClients(); 
    }
  }, [activeTab]);

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        {/* Statistics Boxes */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
  
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
                        <TableCell className='TableData'  sx={{ color: '#101828' }}>{user.sellersFullName}</TableCell>
                        <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.createdAt}</TableCell>
                        <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{user.state}</TableCell>
                        <TableCell className='TableDataS'  sx={{ color: '#101828' }}>{user.closingTime}</TableCell>
                        <TableCell className="TableDataS" sx={{ color: '#101828' }}>
  <Box 
    sx={{
      padding: '8px', 
      display: 'inline-block', 
      backgroundColor: 
        user.leadType.name === 'Cold' ? '#f0f7ff' : 
        user.leadType.name === 'Warm' ? '#fffae6' : 
        user.leadType.name === 'Hot' ? '#ffebed' : 'transparent',
      borderRadius: '25.74px',
      color: 
        user.leadType.name === 'Cold' ? '#0466D4' : 
        user.leadType.name === 'Warm' ? '#D0A704' : 
        user.leadType.name === 'Hot' ? '#CB0A1D' : '#000',
    }}
  >
    {user.leadType.name}
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
                  : clientsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className='TableData'  sx={{ color: '#101828' }}>{user.name}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{user.createdAt}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>{user.investorCategory}</TableCell>
                      <TableCell  className='TableDataS'  sx={{ color: '#101828' }}>
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
