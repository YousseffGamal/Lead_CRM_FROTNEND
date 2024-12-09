import React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Switch } from "@mui/material";

const BlogCard = ({ image, title, description, isActive, handleToggle, toggleStatus }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "22.53px",
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          padding: "22px 22px 0 22px",
          objectFit: "cover",
          display: "block",
          margin: "0 auto",
          borderTopLeftRadius: "22.53px",
          borderTopRightRadius: "22.53px",
        }}
        image={image}
        alt={title}
      />
      <CardContent
        sx={{
          textAlign: "center",
          flexGrow: 1,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          className="CardTitle"
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "1.6rem" }, // Responsive font sizes
          }}
        >
          {title}
        </Typography>
        <Typography
          className="CardDescr"
          sx={{ marginTop: "12px", marginBottom: "16px", color: "#6c757d" }}
          variant="body2"
        >
          {description}
        </Typography>
        {/* Toggle Switch */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {isActive ? "Active" : "Inactive"}
          </Typography>
          <Switch
            checked={isActive}
            // onChange={handleToggle}
            onChange={toggleStatus} // Invoke toggleStatus when switch is toggled
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
