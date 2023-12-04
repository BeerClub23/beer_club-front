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
  Chip,
  FormHelperText,
} from "@mui/material";
import InputFileUpload from "./inputUpload";
import { useGetSubscriptions } from "../../../services/subscriptions";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../../../styles/materialThemeAdmin";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@mui/icons-material";
import { recommendationSchema } from "./rules/index";
import * as yup from "yup";
//import "./recommendationAdmin.scss";

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
  //createDate: getCurrentDate(),
  product: {
    name: "",
    description: "",
    productScore: 0,
    image_url: [],
  },
  subscription_id: "",
  image_url: null,
};

const CreateRecommendationForm = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState(initialState);
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const [validationErrors, setValidationErrors] = useState({});
  const dropRef = useRef();

  // RECOMMENDATION EVENTS
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // PRODUCT EVENTS
  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      product: { ...prevData.product, [name]: value },
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      product: {
        ...prevErrors.product,
        [name]: "",
      },
    }));
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

  {
    /**PRODUCT IMAGES WITH DRAG AND DROP */
  }
  /*   const handleProductImageUpload = async (files) => {
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
        updatedImages[index] = { name: value };
      }

      return {
        ...prevData,
        product: {
          ...prevData.product,
          image_url: updatedImages,
        },
      };
    });
    setValidationErrors((prevErrors) => {
      const updatedErrors = {
        ...prevErrors,
        product: {
          ...prevErrors.product,
          image_url: [...(prevErrors.product?.image_url || [])],
        },
      };

      updatedErrors.product.image_url[index] = "";

      return updatedErrors;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Clear previous validation errors
      setValidationErrors({});

      // Validate the form data using the yup schema
      await recommendationSchema.validate(formData, {
        abortEarly: false,
      });

      // If validation succeeds, proceed with form submission
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

      // Call the onCreate function with the validated data
      onCreate(formDataToSend);

      // Reset the form to its initial state
      setFormData(initialState);

      onClose();
    } catch (error) {
      // Handle Yup validation errors
      if (error instanceof yup.ValidationError) {
        const errors = {};

        error.inner.forEach((e) => {
          // Use correct paths for validation errors
          if (e.path.startsWith("product.")) {
            // Handle product-related errors
            errors.product = errors.product || {};
            errors.product[e.path.substr(8)] = e.message;
          } else {
            // Handle other errors
            errors[e.path] = e.message;
          }
        });

        console.log("Validation Errors:", errors);
        setValidationErrors(errors);
      }
    }
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
              error={!!validationErrors.title}
              helperText={validationErrors.title}
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
              error={!!validationErrors.description}
              helperText={validationErrors.description}
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
                error={!!validationErrors.subscription_id}
              >
                {subscriptions.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={Boolean(validationErrors.subscription_id)}>
                {validationErrors.subscription_id}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Imagen recomendación"
              fullWidth
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              error={Boolean(validationErrors.image_url)}
              helperText={validationErrors.image_url}
            />
            {/*             <Typography>Imagen recomendación</Typography>
            <InputFileUpload
              onFileChange={(file) => handleRecommendationImageUpload(file)}
              onCancel={() =>
                setFormData((prevData) => ({ ...prevData, image_url: null }))
              }
            /> */}
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
              value={formData.product.name}
              onChange={(e) => handleProductChange(e)}
              error={Boolean(validationErrors.product?.name)}
              helperText={validationErrors.product?.name || ""}
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
              error={Boolean(validationErrors.product?.description)}
              helperText={validationErrors.product?.description || ""}
            />
          </Grid>
          {/* Product Image Upload */}
          <Grid item xs={12}>
            <Typography m={2}>Imágenes producto:</Typography>
            {formData.product.image_url.map((image, index) => (
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
                  fullWidth
                  value={image.name}
                  onChange={(e) =>
                    handleImagesProductChange(index, e.target.value)
                  }
                  sx={{ mt: 2 }}
                  //className="input-modal"
                  error={Boolean(
                    validationErrors.product?.image_url?.[index]?.name,
                  )}
                  helperText={
                    validationErrors.product?.image_url?.[index]?.name || ""
                  }
                />

                <IconButton onClick={() => handleRemoveImage(index)}>
                  <DeleteOutline />
                </IconButton>
              </div>
            ))}
            <Button
              onClick={handleAddImage}
              sx={{
                mt: 2,
              }}
              variant="outlined"
              className="add-element-btn"
              startIcon={<AddIcon />}
              style={{ marginLeft: "8px" }}
            >
              Añadir Imágenes
            </Button>
            {/*            <div
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
            </Grid> */}
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", width: "65%", margin: "auto" }}>
              <Button
                sx={{
                  width: "150px",
                  pt: "7px",
                  mx: "auto",
                  mt: 1,
                  mb: 4,
                  fontWeight: "bold",
                }}
                className="cancel-element-btn"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                sx={{
                  width: "150px",
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
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateRecommendationForm;
