// src/pages/BlogsArticles.jsx

import React from 'react';
import { Box, Grid } from '@mui/material';
import Layout from '../../component/Layout/Layout';
import BlogCard from '../../component/Card/Card'; // Import the BlogCard component
import First from "../../assets/images/young-woman-working-laptop-library 1.png"
const BlogsArticles = () => {
  // Array of articles
  const articles = [
    {
      id: 1,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 4,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 5,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 6,
      image: First, // Replace with your image URL
      title: 'Lead Management Tips',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    // Add more articles as needed
  ];

  return (
    <Layout headerText="Blogs & Articles" pageType="blogs">
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        <Grid container spacing={2} justifyContent="center">
          {articles.map(article => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <BlogCard 
                image={article.image}
                title={article.title}
                description={article.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default BlogsArticles;
