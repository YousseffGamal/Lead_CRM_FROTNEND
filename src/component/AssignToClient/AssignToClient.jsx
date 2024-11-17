import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import moment from "moment";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
export default function AssignToClient({ open, handleCloseModal, leadId }) {
  const [clients, setClients] = useState([]);
  const fetchLeads = async () => {
    axiosInstance.get("/getallusers").then((res) => {
      console.log(res.data);
      setClients(res.data.Allusers);
    });
  };
  useEffect(() => {
    fetchLeads();
  }, []);
  const handleAssign = (id) => {
    axiosInstance
      .post(`AssignLead/${leadId}/${id}`)
      .then(() => {
        alert("leadAssigend successfully");
        handleCloseModal();
      })
      .catch((err) => {
        alert("Error Assigning Lead ");
        console.log(err);
      });
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={style}>
        <Box>
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
                    Date Joined
                  </TableCell>
                  <TableCell sx={{ color: "#667085", textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.length > 0 ? (
                  clients.map((client, index) => (
                    <TableRow key={client._id}>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>
                        {moment(client.createdAt).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleAssign(client._id)}>
                          Assign
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
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
}
