import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Dialog } from "@mui/material";
import "./signupPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true); // Show loading state
    setOpenModal(true); // Open modal
    setTimeout(() => {
      // Simulate an API call for user registration
      setLoading(false); // Hide loading state
      setSuccess(true); // Show success message

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login"); // Redirect to login page using navigate
      }, 2000);
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <Box className="login-container">
      {/* Layered Image */}
      <Box className="layered-image">
        <img src={Ellipse} alt="Layered Top" />
      </Box>

      {/* Sign Up Form */}
      <Box className="login-box">
        <Typography
          className="Signin"
          variant="h4"
          sx={{ marginBottom: "20px", fontSize: "52px" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Customized Profile Image Upload */}
          <TextField
            type="file"
            fullWidth
            variant="outlined" // Use outlined variant for better styling
            sx={{
              marginBottom: "42px",
              "& .MuiInputBase-root": {
                borderRadius: "10px", // Custom border radius
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Email Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            sx={{
              marginBottom: "52px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            type="password"
            sx={{
              marginBottom: "42px",
              "& .MuiInputBase-root": {
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-focused": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiInput-underline:before": {
                borderBottom: "1px solid #000000",
              },
              "& .MuiInput-underline:after": {
                borderBottom: "1px solid #000000",
              },
            }}
          />

          {/* Remember Me */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "42px",
            }}
          >
            <label className="Save">
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Save Login Credentials
            </label>
     
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "25.76px",
              fontSize: "25px",
              position: "relative",
            }}
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
            ) : (
              "SIGN UP"
            )}
          </Button>
        </form>
      </Box>

      {/* Modal for loading and success message */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          {loading ? (
            <>
              <CircularProgress />
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Registering...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ color: "green" }}>
                Registration successful! Redirecting to login...
              </Typography>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default SignUpPage;
