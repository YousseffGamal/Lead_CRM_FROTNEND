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

import Filters from "../filters/filters";
import LeadModal from "../LeadModal/LeadModal";
import AssignToClient from "../AssignToClient/AssignToClient";
import { useNavigate } from "react-router-dom";
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
  const [leadsData, setLeadsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  // Fetch leads data
  const fetchLeads = async () => {
    try {
      const response = await axiosInstance.get("/getAllRelistedLeads");
      setLeadsData(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeadsData([]);
    }
  };

  const handleApprove = (user) => {
    navigate(`/addlead/${user}`);
    console.log("herooooo");
  };
  const [menuIndex, setMenuIndex] = useState(null); // Keep track of which menu to open
  const handleClick = (event, idx) => {
    setAnchorEl(event.currentTarget);
    // setCurrentUserId(id);
    setMenuIndex(idx);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  // Fetch data based on activeTab when the component loads or activeTab changes
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "35px",
        }}
      >
        {/* Table based on active tab */}
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "30px",
            mt: 2,
            overflowX: "auto", // Ensure horizontal scrolling if needed
            boxShadow: "none", // Optional: Adjust shadow if needed
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <>
                  <TableCell
                    className="TableHeader"
                    sx={{ color: "#667085", textAlign: "center" }}
                  >
                    Seller First Name
                  </TableCell>
                  <TableCell
                    className="TableHeader"
                    sx={{ color: "#667085", textAlign: "center" }}
                  >
                    Seller second Name
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
                  <TableCell
                    className="TableHeader"
                    sx={{ color: "#667085", textAlign: "center" }}
                  >
                    Condition
                  </TableCell>
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
                    Approval Status
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
                    Temperature
                  </TableCell>
                  <TableCell
                    className="TableHeader"
                    sx={{ color: "#667085", textAlign: "center" }}
                  >
                    Action
                  </TableCell>
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell
                      className="TableData"
                      sx={{
                        color: "#101828",
                        textAlign: "center",
                        width: "140px",
                      }}
                    >
                      {user.firstName}
                    </TableCell>
                    <TableCell
                      className="TableData"
                      sx={{
                        color: "#101828",
                        textAlign: "center",
                        width: "140px",
                      }}
                    >
                      {user.lastName}
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
                    <TableCell sx={{ color: "#101828" }}>
                      {user.askingPrice}
                    </TableCell>
                    <TableCell className="TableDataS" sx={{ color: "#101828" }}>
                      {moment(user.createdAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell className="TableDataS" sx={{ color: "#101828" }}>
                      {user.state.name}
                    </TableCell>
                    <TableCell className="TableDataS" sx={{ color: "#101828" }}>
                      {user.isApproved ? "Approved" : "Pending"}
                    </TableCell>
                    <TableCell className="TableDataS" sx={{ color: "#101828" }}>
                      {user.isBidding == true ? user.status : " - "}
                    </TableCell>
                    <TableCell className="TableDataS" sx={{ color: "#101828" }}>
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
                        aria-controls={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? "true" : undefined}
                      >
                        <MoreVertIcon />
                      </Button>
                      <Menu
                        anchorEl={menuIndex === index ? anchorEl : null}
                        open={menuIndex === index && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => {
                            handleOpenModalLeads(user._id, index);
                            handleClose();
                          }}
                        >
                          Delete
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleApprove(user._id);
                          }}
                        >
                          ReList
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: "right", padding: 0 }}>
                  <TablePagination
                    rowsPerPageOptions={[]} // Removes the "Rows per page" selector
                    component="div"
                    count={leadsData.length}
                    rowsPerPage={rowsPerPage} // Still controls pagination size, but without UI
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      display: "flex", // Flexbox for alignment
                      justifyContent: "flex-end", // Align pagination to the right
                      alignItems: "center", // Vertically center pagination buttons
                      width: "100%",
                      paddingRight: "16px", // Adds space between pagination and table edge
                      "& .MuiTablePagination-toolbar": {
                        margin: 0, // Remove margin from pagination text
                        padding: 0, // Optional: remove padding if needed
                      },
                    }}
                    labelRowsPerPage="" // Empty string to hide the label
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Tables;
