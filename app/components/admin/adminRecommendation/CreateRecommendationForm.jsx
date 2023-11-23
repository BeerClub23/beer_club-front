import { useState, useRef } from "react";
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
import "./recommendationAdmin.scss";
import * as yup from "yup";

// SET THE CURRENT DATE FOR THE ELEMENT CREATION
const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const initialState = {
  title: "",
  description: "",
  createDate: getCurrentDate(),
  product: {
    name: "",
    description: "",
    image_url: [],
  },
  subscription_id: "",
  image_url: null,
};

const CreateRecommendationForm = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState(initialState);
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const dropRef = useRef();

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
      product: { ...prevData.product, [name]: value },
    }));
  };

  const handleProductImageUpload = async (files) => {
    if (!files || files.length === 0) {
      return;
    }

    const filesArray = Array.from(files);

    const newImages = await Promise.all(
      filesArray.map(async (file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageUrls = formData.product.image_url.map((image) => ({
      url: image.name,
    }));

    const formDataToSend = {
      ...formData,
      product: {
        ...formData.product,
        image_url: imageUrls,
      },
    };

    onCreate(formDataToSend);

    setFormData((prevData) => ({
      ...prevData,
      image_url: null,
    }));

    // Reset the form to its initial state
    setFormData(initialState);

    onClose();
  };

  const handleCancel = () => {
    setFormData((prevData) => ({
      ...prevData,
      image_url: null,
    }));
    setFormData(initialState);
    onClose();
  };

  return (
    <Box className={"form-container-r"} m={"auto"}>
      <form onSubmit={handleSubmit}>
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
                value={formData.subscription_id}
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
            <Typography>Imagen recomendación</Typography>
            <InputFileUpload
              onFileChange={(file) => handleRecommendationImageUpload(file)}
              onCancel={() =>
                setFormData((prevData) => ({ ...prevData, image_url: null }))
              }
            />
          </Grid>
          <Divider mt={5} variant="fullWidth" orientation="horizontal">
            Producto
          </Divider>
          {/* Product Name */}
          <Grid item xs={12}>
            <TextField
              label="Nombre producto"
              fullWidth
              name="name"
              value={formData.product.name}
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
              value={formData.product.description}
              onChange={(e) => handleProductChange(e)}
            />
          </Grid>
          {/* Product Image Upload */}
          <Grid item xs={12}>
            <label>Imágenes:</label>
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
            <Grid m={2} container spacing={1}>
              {formData.product.image_url.map((image, index) => (
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
                    <Typography variant="body1">
                      {image.name.length > 30
                        ? `${image.name.substring(0, 30)}...`
                        : image.name}
                    </Typography>
                    <IconButton
                      component="span"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
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

export default CreateRecommendationForm;
