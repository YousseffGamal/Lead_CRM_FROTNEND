import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Switch,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Layout from "../../component/Layout/Layout";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import First from "../../assets/images/young-woman-working-laptop-library 1.png";
import SuccessModal from "../../component/SuccessModal/BlogModal";
import axiosInstance from "../../axios";
import InputField from "../../component/InputField/InputField";
import { useNavigate, useParams } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(First);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isActive, setIsActive] = useState(true); // Add isActive state

  const intialData = {
    name: "",
    previewText: "",
    description: "",
  };
  const [formData, setFormData] = useState(intialData);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`getblogbyid/${id}`)
        .then((res) => {
          const data = res.data.blog;
          setFormData({
            ...formData,
            name: data.name,
            previewText: data.previewText,
            description: data.description.map((item) => item).join(" - "),
          });
          setIsActive(data.isActive); // Set isActive from the blog data
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBlog = async () => {
    try {
      const blogData = {
        name: formData.name,
        description: formData.description,
        previewText: formData.previewText,
        images: thumbnail,
        isActive, // Include isActive in the blog data
      };

      const response = await axiosInstance.post("/createblog", blogData);

      if (response.data.success) {
        setOpenModal(true);
        setFormData(intialData);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to create blog", error);
      setErrorMessage("Failed to create blog. Please try again.");
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const blogData = {
        name: formData.name,
        description: formData.description,
        previewText: formData.previewText,
        images: thumbnail,
        isActive, // Include isActive in the blog data
      };

      const response = await axiosInstance.patch(`/updateblog/${id}`, blogData);

      if (response.data.success) {
        setOpenModal(true);
        navigate("/blogsarticles");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to update blog", error);
      setErrorMessage("Failed to update blog. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout
      headerText="Blogs & Articles"
      pageType={id ? "delete" : "blogs"}
      BlogId={id ? id : ""}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: "#F1F1F1",
          color: "#191919",
          marginTop: "65px",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundColor: "#EAEAEA",
              }}
            >
              <img
                src={thumbnail}
                alt="Thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: "40%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#FFFFFF",
                  color: "#757575",
                  borderRadius: "20px",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <AddPhotoAlternateIcon />
                <Typography sx={{ marginLeft: "8px" }}>Upload</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <InputField
                fieldName={"name"}
                state={formData.name}
                label={"Name"}
                placeHolder={"Name"}
                type={"string"}
                handleChange={handleChange}
              />

              <InputField
                fieldName={"previewText"}
                state={formData.previewText}
                label={"Preview Text"}
                placeHolder={"Preview Text"}
                type={"string"}
                handleChange={handleChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <InputField
              fieldName={"description"}
              state={formData.description}
              label={"Description"}
              placeHolder={"What Are Non-Core Business Activities?"}
              type={"string"}
              handleChange={handleChange}
              multiline={true}
              minRows={6}
              fullWidth
              variant="outlined"
            />
          </Grid>

          {/* isActive Toggle */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">Active:</Typography>
              <Switch
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                color="primary"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            {!id ? (
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#191919",
                  color: "#FFFFFF",
                  fontSize: "30px",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  "&:hover": { backgroundColor: "#333333" },
                }}
                onClick={handleAddBlog}
              >
                Add Blog
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#191919",
                  color: "#FFFFFF",
                  fontSize: "30px",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  "&:hover": { backgroundColor: "#333333" },
                }}
                onClick={handleUpdateBlog}
              >
                Update Blog
              </Button>
            )}
          </Grid>
        </Grid>

        {errorMessage && (
          <Typography color="error" sx={{ textAlign: "center", marginTop: "20px" }}>
            {errorMessage}
          </Typography>
        )}
      </Box>

      <SuccessModal open={openModal} handleClose={handleCloseModal} />
    </Layout>
  );
};

export default AddBlog;
