import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./RateCard.scss";

const RateCard = () => {
  const [value, setValue] = React.useState(0);
  const [voted, setVoted] = React.useState(false);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ceb5a7",
    },
    "& .MuiRating-iconHover": {
      color: "#ceb5a7",
    },
    "& .MuiRating-iconEmpty": {
      color: "white",
    },
  });

  const handleRatingChange = (newValue) => {
    setValue(newValue);
    setVoted(true);
    postRating(newValue);
  };

  const postRating = (ratingValue) => {
    fetch("URL_BACKEND", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: ratingValue }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
      className="rateContainer"
    >
      <Typography className="rateText">¿Cómo viviste la experiencia?</Typography>
      <StyledRating
        // sx={{color:"#fafafa"}}
        // name="simple-controlled"
        className="rateItem"
        name="customized-colpr"
        defaultValue={2}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        value={value}
        onChange={(event, newValue) => {
          //   setValue(newValue);
          handleRatingChange(newValue);
        }}
        disabled={voted}
      />
    </Box>
  );
};

export default RateCard;
