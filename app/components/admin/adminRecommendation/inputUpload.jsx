import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "./recommendationAdmin.scss";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileUploadItem = ({ file, onDelete }) => (
  <Box
    className="image-name-box"
    p={1}
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  >
    <Typography variant="body1">{file.name}</Typography>
    {file.loading ? (
      <CircularProgress size={20} sx={{ marginLeft: 1 }} />
    ) : (
      <IconButton component="span" onClick={() => onDelete(file)}>
        <CloseIcon />
      </IconButton>
    )}
  </Box>
);

const InputFileUpload = ({ onFileChange, onCancel }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = event.target.files;

    // Extract only the name property from the selected files
    const fileNames = Array.from(selectedFiles).map((file) => file.name);

    // Simulate loading
    const newFiles = fileNames.map((name) => ({
      name,
      loading: true,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

    // Simulate upload delay
    await Promise.all(
      newFiles.map(
        async (file, index) =>
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve(); // Resolve the Promise once the upload is complete
            }, 1000),
          ),
      ),
    );

    // Update file loading status
    setFiles((prevFiles) =>
      prevFiles.map((file) => ({ ...file, loading: false })),
    );

    // Invoke the onFileChange callback with the selected file names
    onFileChange(fileNames);
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
    onFileChange(
      files.filter((file) => file !== fileToDelete).map((file) => file.name),
    );
    onCancel();
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        className="upload-button"
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Subir imagen
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {files.map((file) => (
        <FileUploadItem
          key={file.name}
          file={file}
          onDelete={handleDeleteFile}
        />
      ))}
    </Box>
  );
};

export default InputFileUpload;
