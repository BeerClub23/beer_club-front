import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const RateReadOnlyCard = ({ rate }) => {
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
    <StyledRating
      // sx={{color:"#fafafa"}}
      // name="simple-controlled"
      name="half-rating-read"
      defaultValue={rate}
      precision={0.5}
      readOnly
    />
  );
};

export default RateReadOnlyCard;
