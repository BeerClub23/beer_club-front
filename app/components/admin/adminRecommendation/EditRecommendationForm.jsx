import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Divider,
  InputLabel,
  FormControl,
} from "@mui/material";
import InputFileUpload from "./inputUpload";
import { useGetSubscriptions } from "../../../services/subscriptions";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "@/app/styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@mui/icons-material";
import "./recommendationAdmin.scss";

const EditRecommendationForm = ({ initialData, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialData || {});
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const [isEditing, setIsEditing] = useState(false);
  const dropRef = useRef();

  useEffect(() => {
    console.log("Initial data:", initialData);
    setFormData(initialData || {});
    setIsEditing(!!initialData); // Set to true if initialData is provided
  }, [initialData]);

  // RECOMMENDATION EVENTS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRecommendationImageUpload = (files) => {
    if (!files || files.length === 0) {
      setFormData((prevData) => ({
        ...prevData,
        image_url: null,
      }));
      return;
    }

    const recommendationImage = files[0];
    setFormData((prevData) => ({
      ...prevData,
      image_url: recommendationImage,
    }));
  };

  // PRODUCT EVENTS
  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        [name]: value,
      },
    }));
  };
  {
    /**PRODUCT IMAGES WITH DRAG ANN DROP  */
  }
  /*   const handleProductImageUpload = async (files) => {
    if (!files || files.length === 0) {
      return;
    }

    const filesArray = Array.from(files);

    const newImages = await Promise.all(
      filesArray.map(async (file) => ({
        url: file.name,
      })),
    );

    setFormData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        image_url: [...prevData.product.image_url, ...newImages],
      },
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.product.image_url];
      updatedImages.splice(index, 1);

      return {
        ...prevData,
        product: {
          ...prevData.product,
          image_url: updatedImages,
        },
      };
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleProductImageUpload(files);
    }
  }; */

  {
    /**PRODUCT IMAGES WITH INPUT FIELD */
  }
  const handleImagesProductChange = (index, value) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.product.image_url];

      if (value === "") {
        updatedImages.splice(index, 1);
      } else {
        updatedImages[index] = { url: value }; // Change here
      }

      return {
        ...prevData,
        product: {
          ...prevData.product,
          image_url: updatedImages,
        },
      };
    });
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        image_url: [...prevData.product.image_url, { url: "" }],
      },
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.product.image_url];
      updatedImages.splice(index, 1);

      return {
        ...prevData,
        product: {
          ...prevData.product,
          image_url: updatedImages,
        },
      };
    });
  };

  const handleSubmit = async (event, formData) => {
    console.log(formData);
    try {
      event.preventDefault();
      if (formData.id) {
        await onSave(formData, formData.id); // Update existing recommendation
        onClose();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Box className={"form-container-r"} m={"auto"}>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        {/* Recommendation data */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Titulo"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              name="description"
              multiline
              maxRows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="subscription-label">Suscripción</InputLabel>
              <Select
                labelId="subscription-label"
                label="Suscripción"
                fullWidth
                name="subscription_id"
                value={
                  formData.subscription_id !== undefined
                    ? formData.subscription_id
                    : ""
                }
                onChange={handleChange}
              >
                {subscriptions.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Imagen recomendación"
              fullWidth
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />

            {/*  <Typography>Imagen recomendación</Typography>
{isEditing && formData.image_url && (
  <Box
    className="image-name-box"
    p={1}
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "lightgray",
    }}
  >
    <Typography variant="body1">
      {formData.image_url.length > 30
        ? `${formData.image_url.substring(0, 30)}...`
        : formData.image_url}
    </Typography>
    <IconButton
      component="span"
      onClick={() =>
        setFormData((prevData) => ({
          ...prevData,
          image_url: null,
        }))
      }
    >
      <CloseIcon />
    </IconButton>
  </Box>
)}
{(!isEditing || (isEditing && !formData.image_url)) && (
  <InputFileUpload
    onFileChange={(file) => handleRecommendationImageUpload(file)}
    onCancel={() =>
      setFormData((prevData) => ({ ...prevData, image_url: null }))
    }
  />
)} */}
          </Grid>
          {/* Product Name */}
          <Grid item xs={12}>
            <Box mb={2}>
              <Divider>Producto</Divider>
            </Box>
            <TextField
              label="Nombre producto"
              fullWidth
              name="name"
              value={formData.product?.name || ""}
              onChange={(e) => handleProductChange(e)}
            />
          </Grid>
          {/* Product Description */}
          <Grid item xs={12}>
            <TextField
              label="Descripción producto"
              fullWidth
              name="description"
              multiline
              maxRows={4}
              value={formData.product?.description || ""}
              onChange={(e) => handleProductChange(e)}
            />
          </Grid>
          {/* Product Image Upload */}
          <Grid item xs={12}>
            <Typography m={2}>Imágenes producto:</Typography>
            {formData.product?.image_url.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TextField
                  type="text"
                  name={`image[${index}]`}
                  label={`imagen ${index + 1}`}
                  variant="outlined"
                  value={image.url}
                  fullWidth
                  onChange={(e) =>
                    handleImagesProductChange(index, e.target.value)
                  }
                  className="input-modal"
                />

                <IconButton onClick={() => handleRemoveImage(index)}>
                  <DeleteOutline />
                </IconButton>
              </div>
            ))}
            <Button
              onClick={handleAddImage}
              variant="outlined"
              className="add-element-btn"
              startIcon={<AddIcon />}
              style={{ marginLeft: "8px" }}
            >
              Añadir Imágenes
            </Button>
            {/*          <label>Subir nuevas imágenes:</label>
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragEnter={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: "2px dashed #cccccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <p>Arrastra y suelta imágenes aquí</p>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleProductImageUpload(e.target.files)}
              multiple
            />
            <Grid mb={5} container spacing={1}>
            {Array.isArray(formData.product?.image_url) &&
  formData.product.image_url.map((image, index) => (
    <Grid item key={index}>
      <Box
        className="image-name-box"
        p={1}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "lightgray",
        }}
      >
        {image && image.url ? (
          <>
            <Typography variant="body1">
              {image.url.length > 30
                ? `${image.url.substring(0, 30)}...`
                : image.url}
            </Typography>
            <IconButton
              component="span"
              onClick={() => handleRemoveImage(index)}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : null}
      </Box>
    </Grid>
  ))}
            </Grid> */}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box className="btn-container">
              <Button className="cancel-btn" onClick={handleCancel}>
                Cancelar
              </Button>
              <ThemeProvider theme={theme}>
                <Button
                  sx={{
                    pt: "7px",
                    mx: "auto",
                    mt: 1,
                    mb: 4,
                    fontWeight: "bold",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Enviar
                </Button>
              </ThemeProvider>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditRecommendationForm;
