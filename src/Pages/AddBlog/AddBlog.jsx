// src/pages/BlogsArticles.jsx

import React, { useState } from 'react';
import { Box, Grid, InputLabel, TextField, IconButton, Typography, Button } from '@mui/material';
import Layout from '../../component/Layout/Layout';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'; // Icon for upload
import First from "../../assets/images/young-woman-working-laptop-library 1.png"; // Default image
import SuccessModal from '../../component/SuccessModal/BlogModal'; // Import the SuccessModal

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [content, setContent] = useState(''); // New state for content
  const [thumbnail, setThumbnail] = useState(First); // Set the default image here
  const [openModal, setOpenModal] = useState(false); // State for modal visibility

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    // Here you can add the logic to save the blog data
    // For demonstration purposes, we will just open the success modal
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout headerText="Blogs & Articles" pageType="blogs">
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#191919', marginTop: '65px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: '#EAEAEA',
              }}
            >
              <img
                src={thumbnail}
                alt="Thumbnail"
                style={{ width: '100%', height: '100%', borderRadius: '10px', objectFit: 'cover' }}
              />
              
              {/* Centered Upload Button */}
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: '40%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#FFFFFF',
                  color: '#757575',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <AddPhotoAlternateIcon />
                <Typography sx={{ marginLeft: '8px' }}>Upload</Typography>
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail-upload"
                  hidden
                  onChange={handleThumbnailChange}
                />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Title Input */}
              <Box sx={{ position: 'relative' }}>
                <InputLabel
                  htmlFor="title"
                  sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '15px',
                    backgroundColor: '#FFFFFF',
                    padding: '0 5px',
                    zIndex: 1,
                    color: '#191919',
                    fontFamily: 'LufgaMedium !important',
                  }}
                  shrink={!!title}
                >
                  Title:
                </InputLabel>
                <TextField
                  id="title"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    height: '63px',
                    '& .MuiOutlinedInput-root': {
                      border: 'none',
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                  inputProps={{
                    style: { textAlign: 'center', paddingTop: '15px' },
                  }}
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              {/* Preview Text Input */}
              <Box sx={{ position: 'relative' }}>
                <InputLabel
                  htmlFor="preview-text"
                  sx={{
                    position: 'absolute',
                    left: '10px',
                    top: '15px',
                    backgroundColor: '#FFFFFF',
                    padding: '0 5px',
                    zIndex: 1,
                    color: '#191919',
                    fontFamily: 'LufgaMedium !important',
                  }}
                  shrink={!!previewText}
                >
                  Preview Text:
                </InputLabel>
                <TextField
                  id="preview-text"
                  variant="outlined"
                  sx={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    height: '204px',
                    '& .MuiOutlinedInput-root': {
                      border: 'none',
                      '& fieldset': {
                        border: 'none',
                      },
                      '&:hover fieldset': {
                        border: 'none',
                      },
                      '&.Mui-focused fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                  inputProps={{
                    style: { textAlign: 'center', paddingTop: '15px' },
                  }}
                  placeholder="Enter preview text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                />
              </Box>
            </Box>
          </Grid>

          {/* New Row for Content Text Area */}
          <Grid item xs={12}>
            <Box sx={{ position: 'relative' }}>
              <InputLabel
                htmlFor="content"
                sx={{
                  position: 'absolute',
                  left: '10px',
                  top: '15px',
                  backgroundColor: '#FFFFFF',
                  padding: '0 5px',
                  zIndex: 1,
                  color: '#191919',
                  fontFamily: 'LufgaMedium !important',
                }}
                shrink={!!content}
              >
                Content:
              </InputLabel>
              <TextField
                id="content"
                variant="outlined"
                multiline
                minRows={6} // Set minimum rows for the textarea
                sx={{
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
                inputProps={{
                  style: { padding: '15px', textAlign: 'center' }, // Center the text and add padding
                }}
                placeholder="What Are Non-Core Business Activities?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Box>
          </Grid>

          {/* Button to Add Blog */}
          <Grid item xs={12}>
          <Button
        className='AddLeadBtn'
        variant="contained"
        sx={{
          width: '100%',
          backgroundColor: '#191919',
          color: '#FFFFFF',
          fontSize: '30px',
          borderRadius: '20px',
          padding: '5px 15px',
          '&:hover': {
            backgroundColor: '#333333',
          },
        }}
        onClick={handleAddBlog}
      >
        Add Lead
      </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Success Modal */}
      <SuccessModal open={openModal} handleClose={handleCloseModal} />
    </Layout>
  );
};

export default AddBlog;
