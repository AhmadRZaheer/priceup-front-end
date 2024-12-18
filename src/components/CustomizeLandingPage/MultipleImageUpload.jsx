import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const MultipleImageUpload = ({ images, setImages }) => {
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Get the selected files
    const imageURLs = files.map((file) => URL.createObjectURL(file)); // Create temporary URLs for preview
    setImages((prevImages) => [...prevImages, ...imageURLs]); // Add new images to the existing state
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove the selected image from state
  };
  const lengthimages = images.length > 0;

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      {/* Image Previews */}
      {lengthimages ? (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "-18px",
                  marginRight: "-14px",
                  zIndex: 12,
                  position: "relative",
                }}
              >
                <IconButton
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                >
                  <Cancel />
                </IconButton>
              </Box>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 1,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  src={image}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
       ''
      )}
      <Typography sx={{ mb: 2, fontSize: "12px" }}>
        Upload and Preview Multiple Images
      </Typography>

      {/* Upload Button */}
      <Button
        variant="contained"
        component="label"
        sx={{
          background: "#8477DA",
          ":hover": {
            background: "#8477DA",
          },
        }}
      >
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleImageUpload}
        />
      </Button>
    </Box>
  );
};

export default MultipleImageUpload;
