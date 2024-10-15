import React, { useState, useEffect } from "react"; // Import useState for managing state
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
  TableFooter,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Layout from "../../component/Layout/Layout";
import axiosInstance from "../../axios";
import { BorderClear } from "@mui/icons-material";
import DeleteConfirmationModal from "../../component/DeleteConfirmationModal/DeleteConfirmationModal";
import moment from "moment/moment";
import Switchs from "../../component/switch/switch"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Increased width
  maxHeight: "80vh", // Maximum height to fit the screen
  overflowY: "auto", // Enable vertical scrolling
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // Optional: add rounded corners
};

const Tables = () => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState(0); // 0 for Leads, 1 for Clients
  const [statusFilter, setStatusFilter] = useState("All"); // State for status filter
  const [clientsData, setClientsData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);
  const [currentDeleteIndex, setCurrentDeleteIndex] = useState(null);
  const stats = [
    {
      title: "No. Of Leads",
      value: 150,
      bgColor: "#0177FB",
      textColor: "#fff",
    },
    {
      title: "No. Of Clients",
      value: 80,
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
    {
      title: "No. Of Sold Leads",
      value: 25,
      bgColor: "#FFFFFF",
      textColor: "#000000",
    },
  ];

  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getAllLeads");
      console.log("Leads Data:", response.data.data);
      setLeadsData(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeadsData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients data
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/getallusers");
      console.log("Full Response:", response);
      console.log("Clients Data:", response.data.Allusers);
      setClientsData(
        Array.isArray(response.data.Allusers) ? response.data.Allusers : []
      ); // Adjust this based on actual structure
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClientsData([]);
    } finally {
      setLoading(false);
    }
  };
  const [menuIndex, setMenuIndex] = useState(null); // Keep track of which menu to open
  const handleClick = (event, idx) => {
    setAnchorEl(event.currentTarget);
    // setCurrentUserId(id);
    setMenuIndex(idx);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setCurrentUserId(null);
    setMenuIndex(null);
  };

  const handleOpenModalLeads = (id, index) => {
    setCurrentDeleteId(id);
    setCurrentDeleteIndex(index);
    setModalOpen(true);
  };

  const handleCloseModalLeads = () => {
    setModalOpen(false);
    setCurrentDeleteId(null);
    setCurrentDeleteIndex(null);
  };
  const handleOpenModalConfirmation = (id, index) => {
    setCurrentDeleteId(id);
    setCurrentDeleteIndex(index);
    setModalOpen(true);
  };

  const handleCloseModalConfirmation = () => {
    setModalOpen(false);
    setCurrentDeleteId(null);
    setCurrentDeleteIndex(null);
  };

  const handleDelete = (id, index) => {
    if (currentDeleteId !== null && currentDeleteIndex !== null) {
      axiosInstance
        .delete(`deleteLeadById/${currentDeleteId}`)
        .then((res) => {
          setLeadsData((prevLeadsData) => {
            const newLeadsData = [...prevLeadsData];
            newLeadsData.splice(currentDeleteIndex, 1);
            return newLeadsData;
          });
          handleCloseModalLeads();
        })
        .catch(() => {
          alert("An error occurred while deleting");
        });
    }
  };
  const handleDeleteClient = () => {
    if (currentDeleteId !== null && currentDeleteIndex !== null) {
      axiosInstance
        .delete(`deleteuser/${currentDeleteId}`)
        .then((res) => {
          setLeadsData((prevLeadsData) => {
            const newLeadsData = [...prevLeadsData];
            newLeadsData.splice(currentDeleteIndex, 1);
            return newLeadsData;
          });
          handleCloseModalConfirmation();
        })
        .catch(() => {
          alert("An error occurred while deleting");
        });
    }
  };

  const getTemperatureStyles = (temperature) => {
    switch (temperature) {
      case "Cold":
        return {
          color: "#0466D4",
          backgroundColor: "#f0f7ff",
          borderRadius: "25.74px",
        };
      case "Hot":
        return {
          color: "#CB0A1D",
          backgroundColor: "#ffebed",
          borderRadius: "25.74px",
        };
      case "Warm":
        return {
          color: "#D0A704",
          backgroundColor: "#fffae6",
          borderRadius: "25.74px",
        };
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


  // Handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };



  const [states, setStates] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = (lead) => {
    console.log(lead);
    setFormData({
      sellersFullName: lead.sellersFullName,
      phone: lead.phone,
      email: lead.email,
      bestTimeForCallback: lead.bestTimeForCallback,
      bedCount: lead.bedCount,
      bathCount: lead.bathCount,
      sqft: lead.sqft,
      occupancy: lead.occupancy,
      condition: lead.condition,
      motivation: lead.motivation,
      askingPrice: lead.askingPrice,
      state: lead.state, // Make sure this is set correctly
      closingTime: lead.closingTime,
      leadType: lead.leadType, // Make sure this is set correctly
      _id: lead._id, // Add this line to store the lead ID
    });
    getStates();
    setOpen(true);
  };

  const handleCloseModal = () => {
    fetchLeads();
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    sellersFullName: "",
    phone: "",
    email: "",
    bestTimeForCallback: "",
    bedCount: "",
    bathCount: "",
    sqft: "",
    occupancy: "",
    condition: "",
    motivation: "",
    askingPrice: "",
    state: "",
    closingTime: "",
    leadType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "state" || name === "leadType") {
      setFormData({ ...formData, [name]: { _id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (id) => {
    axiosInstance
      .patch(`updateLeadById/${id}`, formData)
      .then((res) => {
        handleCloseModal();
      })
      .catch((err) => {
        alert(" An Error happend");
      });
  };
  const getStates = () => {
    console.log("came Hereeeeeee");
    axiosInstance
      .get("getAllStates")
      .then((res) => {
        setStates(res.data.states);
        console.log(res.data.states);
      })
      .catch((err) => {
        alert(" An Error happend");
      });
  };

  return (
    <Layout>
      <DeleteConfirmationModal
        open={modalOpen}
        onClose={handleCloseModalConfirmation}
        onConfirm={handleDeleteClient}
      />

      <DeleteConfirmationModal
        open={modalOpen}
        onClose={handleCloseModalLeads}
        onConfirm={handleDelete}
      />

      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        {/* Statistics Boxes */}

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
                  <MenuItem value={"Occupied by the owner"}>
                    Occupied by the owner
                  </MenuItem>
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
                <Button
                  onClick={() => handleSubmit(formData._id)}
                  variant="contained"
                >
                  Submit
                </Button>
                <Button onClick={handleCloseModal} variant="outlined">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>

        <Box
          sx={{
            p: 3,
            backgroundColor: "#F1F1F1",
            color: "#e0e0e0",
            marginTop: "35px",
          }}
        >
          {/* Statistics Boxes */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          ></Box>

          {/* Labels, Switch, and Status Dropdown */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              mb: 2,
            }}
          >
         <Switchs/>
          </Box>

          {/* Table based on active tab */}
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#ffffff",
              borderRadius: "30px",
              mt: 2,
              overflowX: "auto",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  {activeTab === 0 ? (
                    <>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Seller Name
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{
                          color: "#667085",
                          textAlign: "center",
                          width: "140px",
                        }}
                      >
                        Phone
                      </TableCell>
                      {/* <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Email</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Best Time for Callback</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Bed Count</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Bath Count</TableCell>
      <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Sqft</TableCell> */}
                      {/* <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Occupancy</TableCell> */}
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Condition
                      </TableCell>
                      {/* <TableCell className='TableHeader' sx={{ color: '#667085', textAlign: 'center' }}>Motivation</TableCell> */}
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Asking Price
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Date Added
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        State
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Closing Time
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Temperature
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Action
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Client Name
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Date Joined
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        className="TableHeader"
                        sx={{ color: "#667085", textAlign: "center" }}
                      >
                        Action
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {activeTab === 0
                  ? leadsData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user, index) => {
                        const tempStyles = getTemperatureStyles(
                          user.temperature
                        );
                        return (
                          <TableRow key={user._id}>
                            <TableCell
                              className="TableData"
                              sx={{
                                color: "#101828",
                                textAlign: "center",
                                width: "140px",
                              }}
                            >
                              {user.sellersFullName}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#101828",
                                textAlign: "center",
                                width: "10px",
                              }}
                            >
                              
                              {user.phone}
                            </TableCell>

                            <TableCell sx={{ color: "#101828" }}>
                              {user.condition}
                            </TableCell>
                            {/* <TableCell sx={{ color: '#101828' }}>{user.motivation}</TableCell> */}
                            <TableCell sx={{ color: "#101828" }}>
                              {user.askingPrice}
                            </TableCell>
                            <TableCell
                              className="TableDataS"
                              sx={{ color: "#101828" }}
                            >
                              {moment(user.createdAt).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell
                              className="TableDataS"
                              sx={{ color: "#101828" }}
                            >
                              {user.state.name}
                            </TableCell>
                            <TableCell
                              className="TableDataS"
                              sx={{ color: "#101828" }}
                            >
                              {moment(user.closingTime).format("YYYY-MM-DD")}
                            </TableCell>
                            <TableCell
                              className="TableDataS"
                              sx={{ color: "#101828" }}
                            >
                              <Box
                                sx={{
                                  padding: "8px",
                                  display: "inline-block",
                                  backgroundColor:
                                    user.leadType.name === "Cold"
                                      ? "#f0f7ff"
                                      : user.leadType.name === "Warm"
                                      ? "#fffae6"
                                      : user.leadType.name === "Hot"
                                      ? "#ffebed"
                                      : "transparent",
                                  borderRadius: "25.74px",
                                  color:
                                    user.leadType.name === "Cold"
                                      ? "#0466D4"
                                      : user.leadType.name === "Warm"
                                      ? "#D0A704"
                                      : user.leadType.name === "Hot"
                                      ? "#CB0A1D"
                                      : "#000",
                                }}
                              >
                                {user.leadType.name}
                              </Box>
                            </TableCell>

                            <TableCell sx={{ color: "#101828" }}>
                              <Button
                                onClick={(event) => handleClick(event, index)}
                                sx={{ minWidth: "36px", padding: 0 }}
                                aria-controls={
                                  anchorEl ? "simple-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={anchorEl ? "true" : undefined}
                              >
                                <MoreVertIcon />
                              </Button>

                              {/* Menu should be displayed only for the clicked row */}
                              <Menu
                                anchorEl={menuIndex === index ? anchorEl : null}
                                open={menuIndex === index && Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handleOpenModalLeads(user._id, index);
                                    handleClose(); // Close menu after action
                                  }}
                                >
                                  Delete
                                </MenuItem>

                                <MenuItem
                                  onClick={() => {
                                    console.log("Clicked user:", user); // Log the clicked user here
                                    handleOpen(user);
                                    handleClose(); // Close menu after action
                                  }}
                                >
                                  Edit
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  : clientsData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell
                            className="TableData"
                            sx={{ color: "#101828" }}
                          >
                            {user.name}
                          </TableCell>
                          <TableCell
                            className="TableDataS"
                            sx={{ color: "#101828" }}
                          >
                            {user.createdAt}
                          </TableCell>
                          <TableCell
                            className="TableDataS"
                            sx={{ color: "#101828" }}
                          >
                            {user.investorCategory}
                          </TableCell>

                          <TableCell
                            className="TableDataS"
                            sx={{ color: "#101828" }}
                          >
                            <Button
                              onClick={(event) => handleClick(event, index)}
                              sx={{ minWidth: "36px", padding: 0 }}
                              aria-controls={
                                anchorEl ? "simple-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={anchorEl ? "true" : undefined}
                            >
                              <MoreVertIcon />
                            </Button>

                            {/* Menu should be displayed only for the clicked row */}
                            <Menu
                              anchorEl={menuIndex === index ? anchorEl : null}
                              open={menuIndex === index && Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleOpenModalConfirmation(user._id, index);
                                  handleClose(); // Close menu after action
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {/* Pagination */}
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={
                      activeTab === 0 ? leadsData.length : clientsData.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default Tables;
