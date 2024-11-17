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
import RelistedLeadsTable from "../../component/RelistedLeadsTable/RelistedLeadsTable";
import axiosInstance from "../../axios";
import DeleteConfirmationModal from "../../component/DeleteConfirmationModal/DeleteConfirmationModal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Filters from "../../component/filters/clientFilters";

const ClientTable = () => {
  return (
    <Layout headerText="Relisted Leads" pageType="relisted">
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        <RelistedLeadsTable />
      </Box>
    </Layout>
  );
};

export default ClientTable;
