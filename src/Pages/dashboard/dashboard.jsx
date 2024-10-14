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
  Modal,
  Stack,
  TextField,

} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Layout from '../../component/Layout/Layout';
import axiosInstance from '../../axios';
import { BorderClear } from '@mui/icons-material';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Increased width
  maxHeight: '80vh', // Maximum height to fit the screen
  overflowY: 'auto', // Enable vertical scrolling
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // Optional: add rounded corners
};


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

  const handleDelete = (id, index) => {
    console.log(`Deleted user with ID: ${currentUserId}`);
    console.log(index)
    if (confirm('Are you sure you want to delete this item ?')) {
      axiosInstance.delete(`deleteLeadById/${id}`)
        .then((res) => {
          setLeadsData((prevLeadsData) => {
            // Create a shallow copy of the previous leads data
            const newLeadsData = [...prevLeadsData];

            // Use splice to remove the item at the specified index
            newLeadsData.splice(index, 1);

            // Return the updated array
            return newLeadsData;
          });

          alert('item deleted successfully ')
        })
        .catch((res) => {
          alert('An error happend while deleting')
        })
      handleClose();
    }


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




  const [states, setStates] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = (lead) => {
    console.log(lead)
    setFormData(lead)
    getStates()
    setOpen(true)
  };
  const handleCloseModal = () => {
    fetchLeads();
    setOpen(false)
  };

  const [formData, setFormData] = useState({
    sellersFullName: '',
    phone: '',
    email: '',
    bestTimeForCallback: '',
    bedCount: '',
    bathCount: '',
    sqft: '',
    occupancy: '',
    condition: '',
    motivation: '',
    askingPrice: '',
    state: '',
    closingTime: '',
    leadType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    if (name === 'state' || name === 'leadType') {
      setFormData({ ...formData, [name]: { _id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }

  };

  const handleSubmit = (id) => {
    console.log('heroooo')
    axiosInstance.patch(`updateLeadById/${id}`, formData)
      .then((res) => {

        handleCloseModal();

      })
      .catch((err) => {
        alert(' An Error happend')
      })

  };
  const getStates = () => {
    console.log('came Hereeeeeee')
    axiosInstance.get('getAllStates')
      .then((res) => {
        setStates(res.data.states)
        console.log(res.data.states)
      })
      .catch((err) => {
        alert(' An Error happend')
      })
  }

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
                width: { xs: '100%', sm: '465px' },
                height: '195px',
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
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '78px' },
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



        <Modal open={open} onClose={handleCloseModal}>
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              Seller Information
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Seller Name"
                name="sellersFullName"
                value={formData.sellersFullName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel>Best Time for Callback</InputLabel>
                <Select
                  name="bestTimeForCallback"
                  value={formData.bestTimeForCallback}
                  onChange={handleChange}
                  label="Best Time for Callback"
                >
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Afternoon">Afternoon</MenuItem>
                  <MenuItem value="Evening">Evening</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Bed Count"
                name="bedCount"
                value={formData.bedCount}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Bath Count"
                name="bathCount"
                value={formData.bathCount}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>Occupancy</InputLabel>
                <Select
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  label="Occupancy"
                >
                  <MenuItem value={"Occupied by the owner"}>Occupied by the owner</MenuItem>
                  <MenuItem value="Vacant">Vacant</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                </Select>
              </FormControl>





              <TextField
                fullWidth
                label="Condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Asking Price"
                name="askingPrice"
                value={formData.askingPrice}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state._id}
                  onChange={handleChange}
                  label="State"
                >
                  {states.map((stat) => (
                    <MenuItem key={stat._id} value={stat._id}>
                      {stat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Closing Time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>Temperature</InputLabel>
                <Select
                  name="leadType"
                  value={formData.leadType._id}
                  onChange={handleChange}
                  label="Temperature"
                >
                  <MenuItem value="670bec8e0e4efa75a6485bc7">Hot</MenuItem>
                  <MenuItem value="670beca70e4efa75a6485bc8">Warm</MenuItem>
                  <MenuItem value="670becb00e4efa75a6485bc9">Cold</MenuItem>
                </Select>
              </FormControl>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button onClick={() => handleSubmit(formData._id)} variant="contained">
                  Submit
                </Button>
                <Button onClick={handleCloseModal} variant="outlined">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>


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
          <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', color: '#ffffff', borderRadius: '30px', mt: 2, overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  {activeTab === 0 ? (
                    <>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Seller Name</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center', width: '140px' }}>Phone</TableCell>
                      {/* <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Email</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Best Time for Callback</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Bed Count</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Bath Count</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Sqft</TableCell> */}
                      {/* <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Occupancy</TableCell> */}
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Condition</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Motivation</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Asking Price</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Date Added</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>State</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Closing Time</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Temperature</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Action</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Client Name</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Date Joined</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Status</TableCell>
                      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Action</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {activeTab === 0
                  ? leadsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                    const tempStyles = getTemperatureStyles(user.temperature);
                    return (
                      <TableRow key={user.id}>
                        <TableCell className='TableData' sx={{ color: '#101828', textAlign: 'center', width: '140px' }}>{user.sellersFullName}</TableCell>
                        <TableCell sx={{ color: '#101828', textAlign: 'center', width: '10px' }}>{user.phone}</TableCell>
                        {/* <TableCell  sx={{ color: '#101828' }}>{user.email}</TableCell> */}
                        {/* <TableCell   sx={{ color: '#101828' }}>{user.bestTimeForCallback}</TableCell> */}
                        {/* <TableCell   sx={{ color: '#101828' }}>{user.bedCount}</TableCell> */}
                        {/* <TableCell   sx={{ color: '#101828' }}>{user.bathCount}</TableCell> */}
                        {/* <TableCell sx={{ color: '#101828' }}>{user.sqft}</TableCell> */}
                        {/* <TableCell   sx={{ color: '#101828' }}>{user.occupancy}</TableCell> */}
                        <TableCell sx={{ color: '#101828' }}>{user.condition}</TableCell>
                        <TableCell sx={{ color: '#101828' }}>{user.motivation}</TableCell>
                        <TableCell sx={{ color: '#101828' }}>{user.askingPrice}</TableCell>
                        <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.createdAt}</TableCell>
                        <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.state.name}</TableCell>
                        <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.closingTime}</TableCell>
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
                            <MenuItem onClick={() => handleDelete(user._id, index)}>Delete</MenuItem>
                            <MenuItem onClick={() => handleOpen(user)}>Edit</MenuItem>

                          </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                  : clientsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className='TableData' sx={{ color: '#101828' }}>{user.name}</TableCell>
                      <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.createdAt}</TableCell>
                      <TableCell className='TableDataS' sx={{ color: '#101828' }}>{user.investorCategory}</TableCell>
                      <TableCell className='TableDataS' sx={{ color: '#101828' }}>
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
      </Box>
    </Layout>

  );
};

export default Dashboard;
