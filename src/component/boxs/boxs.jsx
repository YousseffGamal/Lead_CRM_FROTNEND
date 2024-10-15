import React, { useState } from "react"; // Import useState for managing state
import {
    Typography,
    Box,
    Switch,
    MenuItem as MuiMenuItem, // Import MenuItem for Select
} from "@mui/material";


const Boxs = () => {


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

    return (
        <>
            {/* Statistics Boxes */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                }}
            >
                {stats.map((stat, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: stat.bgColor,
                            padding: "16px",
                            borderRadius: "30px",
                            width: { xs: "100%", sm: "465px" },
                            height: "195px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            className="CardNumber"
                            variant="h1"
                            sx={{
                                color: stat.textColor,
                                fontWeight: "bold",
                                fontSize: { xs: "2rem", sm: "3rem", md: "4rem", lg: "78px" },
                            }}
                        >
                            {stat.value}
                        </Typography>
                        <Box
                            sx={{
                                width: "60%",
                                height: "1px",
                                backgroundColor: stat.textColor,
                                my: 1,
                                opacity: 0.5,
                                mx: "auto",
                            }}
                        />
                        <Typography
                            className="TitleCard"
                            variant="h6"
                            sx={{ color: stat.textColor }}
                        >
                            {stat.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

       
        </>
    );
};

export default Boxs;
