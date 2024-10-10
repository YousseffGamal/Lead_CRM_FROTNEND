import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./LoginPage.css"; // Assuming external CSS for custom styles
import Ellipse from "../../assets/images/Ellipse 1.png";
import TopLeftImage from "../../assets/images/tapIcon.png"; // Import the top-left image

const LoginPage = () => {
  return (
    <Box className="login-container">
      {/* Layered Image */}
      <Box className="layered-image">
        <img src={Ellipse} alt="Layered Top" />
      </Box>
   {/* Top Left Image */}
   <Box className="top-left-image">
        <img src={TopLeftImage} alt="Top Left" />
      </Box>
      {/* Login Form */}
      <Box className="login-box">
        <Typography
          className="Signin"
          variant="h4"
          sx={{ marginBottom: "20px", fontSize: "52px" }}
        >
          Sign in
        </Typography>
        <form>
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

          {/* Remember Me and Forget Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "42px",
            }}
          >
            <label className="Save">
              <input type="checkbox" style={{ marginRight: "8px" }} />
              Save Login Credentials{" "}
            </label>
            <Typography
            className="Forget"
              variant="body2"
              sx={{ color: "#000000", cursor: "pointer" }}
            >
              Forget Password?
            </Typography>
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
            }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
