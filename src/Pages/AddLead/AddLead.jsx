import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button, // Ensure Button is imported
} from "@mui/material";
import Layout from "../../component/Layout/Layout";
import SuccessModal from "../../component/SuccessModal/SuccessModal"; // Adjust the import path as needed
import InputField from "../../component/InputField/InputField";
import DropDown from "../../component/DropDown/DropDown";
import axiosInstance from "../../axios";
import { leadTemperatureOptions } from "./components/constants";

const AddLead = () => {
  const [askingPrice, setAskingPrice] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedState, setSelectedState] = useState("");

  const [sellerAddress, setSellerAddress] = useState("");

  const [selectedListing, setSelectedListing] = useState(""); // State for Listing

  const [selectedOccupancy, setSelectedOccupancy] = useState(""); // State for Occupancy
  const [selectedLeadTemperature, setSelectedLeadTemperature] = useState(""); // State for Lead Temperature

  const [selectedClosing, setSelectedClosing] = useState(""); // State for Closing
  const [zillowEstimate, setZillowEstimate] = useState("");
  const [bestCallbackTime, setBestCallbackTime] = useState("");
  const [reasonForSelling, setReasonForSelling] = useState("");
  const [zillowUrl, setZillowUrl] = useState("");
  const [callUrl, setCallUrl] = useState("");

  const [formData, setFormData] = useState({
    askingPrice: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    county: "",
    state: "",
    zip: "",
    bedCount: "",
    bathCount: "",
    sqft: "",
    occupancy: "",
    leadType: "",
    closingTime: "",
    bestTimeForCallback: "",
    motivation: "",
    zillowLink: "",
    zillowEstimate: "",
    additionalNotes: "",
    LeadPrice: "",
  });
  const [states, setStates] = useState([]);
  const [counties, setCounties] = useState([]);
  const [disabled, setDisabled] = useState(true);
  //function to get states
  const getStates = () => {
    axiosInstance
      .get("getAllStates")
      .then((res) => setStates(res.data.states))
      .catch((err) => console.log(err));
  };
  //function to get counties by state ID
  const getCounty = (id) => {
    axiosInstance
      .get(`getCountByStateId/${id}`)
      .then((res) => {
        console.log(res.data);
        setCounties(res.data.county);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStates();
  }, []);

  //function for leadType dropDOwn
  const renderLeadTypes = (type) => (
    <MenuItem key={type.value} value={type.value}>
      {type.value}
    </MenuItem>
  );
  //function for US states dropDOwn
  const renderStates = (item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  );
  //function for US Counties dropDOwn
  const rendercounteis = (item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.name}
    </MenuItem>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData({
        ...formData,
        [name]: value,
      });
      getCounty(value);
      setDisabled(false);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    console.log(formData);
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <Layout>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        {/* New row for Asking Price input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"askingPrice"}
              state={formData.askingPrice}
              handleChange={handleChange}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "25px",
            marginTop: "25px",

            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <InputField
            fieldName={"firstName"}
            state={formData.firstName}
            handleChange={handleChange}
          />

          <InputField
            fieldName={"lastName"}
            state={formData.lastName}
            handleChange={handleChange}
          />
        </Box>

        {/* New row for email input */}
        <Box sx={{ marginTop: "25px", position: "relative" }}>
          <InputField
            fieldName={"email"}
            state={formData.email}
            handleChange={handleChange}
          />
        </Box>

        {/* New row for Phone Number and State input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"phone"}
              state={formData.phone}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"leadType"}
              handleChange={handleChange}
              state={formData.leadType}
              list={leadTemperatureOptions}
              render={renderLeadTypes}
            />
          </Box>
        </Box>

        {/* Seller Address input */}
        <Box sx={{ marginTop: "25px", position: "relative" }}>
          <InputField
            fieldName={"addressLine"}
            state={formData.addressLine}
            handleChange={handleChange}
          />
        </Box>

        {/* New row for Listing and Occupancy inputs under Seller Address */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"city"}
              state={formData.city}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"state"}
              handleChange={handleChange}
              state={formData.state}
              list={states}
              render={renderStates}
            />
          </Box>
        </Box>

        {/* New row for Lead Temperature and Closing inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zip"}
              state={formData.zip}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <DropDown
              fieldName={"county"}
              handleChange={handleChange}
              state={formData.county}
              list={counties}
              render={rendercounteis}
              disabled={disabled}
            />
          </Box>
        </Box>

        {/* New row for Zillow Estimate and Best Callback Time inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"bedCount"}
              state={formData.bedCount}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"bathCount"}
              state={formData.bathCount}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {/* New row for Zillow Estimate and Best Callback Time inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"sqft"}
              state={formData.sqft}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"occupancy"}
              state={formData.occupancy}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {/* Existing code for Zillow Estimate and Best Callback Time inputs */}

        {/* New row for Reason for Selling input */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"motivation"}
              state={formData.motivation}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"closingTime"}
              state={formData.closingTime}
              handleChange={handleChange}
              type={"date"}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"bestTimeForCallback"}
              state={formData.bestTimeForCallback}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zillowLink"}
              state={formData.zillowLink}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"zillowEstimate"}
              state={formData.zillowEstimate}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {/* New row for Zillow URL and Call URL inputs */}
        <Box
          sx={{
            display: "flex",
            gap: "25px",
            flexDirection: { xs: "column", sm: "row" },
            marginTop: "25px",
          }}
        >
          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"LeadPrice"}
              state={formData.LeadPrice}
              handleChange={handleChange}
            />
          </Box>

          <Box sx={{ flex: 1, position: "relative" }}>
            <InputField
              fieldName={"additionalNotes"}
              state={formData.additionalNotes}
              handleChange={handleChange}
            />
          </Box>
        </Box>

        {/* Last row for Add Lead button */}
        <Box
          sx={{
            marginTop: "25px",
            width: "100%", // Full width
          }}
        >
          <Button
            className="AddLeadBtn"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#191919",
              color: "#FFFFFF",
              fontSize: "30px",
              borderRadius: "20px",
              padding: "5px 15px",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
            onClick={handleClick}
          >
            Add Lead
          </Button>
          <SuccessModal open={open} handleClose={handleClose} />
        </Box>
      </Box>
    </Layout>
  );
};

export default AddLead;
