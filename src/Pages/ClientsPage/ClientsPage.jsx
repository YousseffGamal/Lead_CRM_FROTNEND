import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TableFooter,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/material";
import moment from "moment";
import Layout from "../../component/Layout/Layout";
import axiosInstance from "../../axios";
import DeleteConfirmationModal from "../../component/DeleteConfirmationModal/DeleteConfirmationModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Filters from "../../component/filters/clientFilters";

const ClientTable = () => {
  const [clients, setClients] = useState([]);

  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("/getallusers");
        const clientData = response?.data?.Allusers || [];
        setClients(clientData);
        console.log(clientData);
      } catch (err) {
        console.error("Error fetching clients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (clientId) => {
    try {
      await axiosInstance.delete(`/deleteuser/${clientId}`);
      setClients((prevClients) =>
        prevClients.filter((client) => client._id !== clientId)
      );
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("Error deleting client:", err);
      setError("Failed to delete client");
    }
  };

  const openDeleteModal = (client) => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedClient(null);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Layout headerText="Clients" pageType="clients">
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            "@media (max-width: 600px)": {
              width: "100%",
              justifyContent: "flex-start",
            },
          }}
        >
          <Filters setClientsData={setClients} />
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "30px",
            mt: 2,
            overflowX: "auto",
            boxShadow: "none",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="client table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  First Name
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Last Name
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Phone
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Money Spent
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Investor Category
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Date Joined
                </TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length > 0 ? (
                clients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client, index) => (
                    <TableRow key={client._id}>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        {client.MoneySpent ? client.MoneySpent : " - "}
                      </TableCell>
                      <TableCell>{client.investorCategory}</TableCell>
                      <TableCell>
                        {moment(client.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>
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
                              openDeleteModal(client);
                              handleClose();
                            }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No clients available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
              <TableCell colSpan={9} sx={{ textAlign: "right", padding: 0 }}>
              <TablePagination
                    rowsPerPageOptions={[]} // Removes the "Rows per page" selector
                    count={clients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
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
                  />
              </TableCell>

                 
              </TableRow>
              
            </TableFooter>
          </Table>

          {/* Delete Confirmation Modal */}
          <DeleteConfirmationModal
            open={deleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={() => handleDelete(selectedClient?._id)}
            message={`Are you sure you want to delete ${selectedClient?.firstName} ${selectedClient?.lastName}?`}
          />
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default ClientTable;
