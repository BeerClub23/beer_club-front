import React from "react";
import Image from "next/image";
import { Box, styled } from "@mui/material";
import { Typography } from "@mui/material";
import "./TopProductsCard.scss";
import Rating from "@mui/material/Rating";

const TopProductsCard = ({ name, image_url, productScore }) => {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ceb5a7",
    },
    "& .MuiRating-iconHover": {
      color: "#ceb5a7",
    },
    "& .MuiRating-iconEmpty": {
      color: "#c2c2c2",
    },
  });
  return (
    <Box className="topProductContainer">
      <Image
        src={
          image_url?.length
            ? image_url[0].url
            : "https://images.unsplash.com/photo-1621428674699-90ec7bae03c9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        // src="https://images.unsplash.com/photo-1621428674699-90ec7bae03c9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Unsplash Image"
        width={240}
        height={240}
        className="productImg"
      />

      <Typography className="topTitle">{name}</Typography>
      <StyledRating
        //sx={{color: "#ceb5a7"}}
        name="half-rating-read"
        defaultValue={productScore * 0.5}
        precision={0.5}
        readOnly
      />
    </Box>
  );
};

export default TopProductsCard;
