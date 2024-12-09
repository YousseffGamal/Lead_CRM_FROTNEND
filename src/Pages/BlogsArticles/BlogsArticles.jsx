// src/pages/BlogsArticles.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import Layout from "../../component/Layout/Layout";
import BlogCard from "../../component/Card/Card";
import First from "../../assets/images/young-woman-working-laptop-library 1.png";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";

const BlogsArticles = () => {
  // States of blogs
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

    // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/getallblogs");
      console.log("response", response.data);
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

//  // Toggle blog active status
//  const toggleBlogStatus = async (id, currentStatus) => {
//   try {
//     const response = await axiosInstance.patch(`/toggleblog/${id}`,{        isActive: !currentStatus,
//       isActive: !currentStatus,
//     });
//     const updatedBlog = response.data.blog;
//     setBlogs((prevBlogs) =>
//       prevBlogs.map((blog) =>
//         blog._id === id ? { ...blog, isActive: updatedBlog.isActive } : blog
//       )
//     );
//     alert(`Blog is now ${updatedBlog.isActive ? "active" : "inactive"}`);
//   } catch (error) {
//     console.error("Error toggling blog status:", error);
//     alert("Failed to toggle blog status");
//   }
// };


// Update blog details
// const updateBlogDetails = async (id, updatedDetails) => {
//   try {
//     const response = await axiosInstance.patch(`/updateblog/${id}`, updatedDetails);
//     const updatedBlog = response.data.blog;
//     setBlogs((prevBlogs) =>
//       prevBlogs.map((blog) =>
//         blog._id === id ? { ...blog, ...updatedBlog } : blog
//       )
//     );
//     alert("Blog updated successfully!");
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     alert("Failed to update blog");
//   }
// };

 // Toggle blog active status
 const toggleBlogStatus = async (id, currentStatus) => {
  try {
    const response = await axiosInstance.patch(`/updateblog/${id}`, {
      isActive: !currentStatus,
    });
    const updatedBlog = response.data.blog;
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === id ? { ...blog, isActive: updatedBlog.isActive } : blog
      )
    );
  } catch (error) {
    console.error("Error toggling blog status:", error);
    alert("Failed to toggle blog status");
  }
};

// Handle navigation to edit blog
const handleClick = (id) => {
  navigate(`/addblog/${id}`);
};

// Fetch blogs on mount
useEffect(() => {
  fetchBlogs();
}, []);

  return (
    <Layout headerText="Blogs & Articles" pageType="blogs">
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#e0e0e0",
          marginTop: "65px",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <p>Loading blogs...</p>
          ) : error ? (
            <p>{error}</p>
          ) : blogs?.length > 0 ? (
            blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard
                   image={blog.image || First} // Use the default image if not provided
                   title={blog.name}
                   description={blog.description}
                   isActive={blog.isActive}
                   toggleStatus={() => toggleBlogStatus(blog._id, blog.isActive)}
                 />
              </Grid>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default BlogsArticles;
