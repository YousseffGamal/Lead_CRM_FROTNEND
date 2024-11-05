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
} from "@mui/material";
import moment from "moment";
import { Box } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import DeleteConfirmationModal from "../../component/DeleteConfirmationModal/DeleteConfirmationModal";

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get("/getallusers");
        console.log("API response:", response);
        const clientData = response?.data?.Allusers || [];
        console.log("clientData:", clientData);

        if (Array.isArray(clientData)) {
          setClients(clientData);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load clients");
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
      await axiosInstance.delete(`/getallusers/${clientId}`);
      setClients((prevClients) => prevClients.filter((client) => client._id !== clientId));
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

  if (loading) return <CircularProgress />;
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
          <Table sx={{ minWidth: 650 }} aria-label="client table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>First Name</TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>Last Name</TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>Email</TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>Phone</TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>Date Joined</TableCell>
                <TableCell sx={{ color: "#667085", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.length > 0 ? (
                clients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((client) => (
                    <TableRow key={client._id}>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        {moment(client.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>
                       
                        <Button color="error" onClick={() => openDeleteModal(client)}>
                          Delete
                        </Button>
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
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  count={clients.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
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
