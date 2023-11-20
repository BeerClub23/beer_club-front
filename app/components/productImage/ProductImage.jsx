import React from "react";
import "./ProductImage.scss";
import Image from "next/image";
import { Box } from "@mui/material";

const ProductImage = ({ image }) => {

  return (
    <Box className="productImageContainer">
      <Image
        src={image}
        // src="https://images.unsplash.com/photo-1621428674699-90ec7bae03c9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Unsplash Image"
        width={240}
        height={300}
        className="productImg"
      />

    </Box>
  );
};

export default ProductImage;
