import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "./RateCard.scss";
import Button from "@mui/material/Button";
import Textarea from "@mui/joy/Textarea";
import { theme } from "../../styles/materialThemeForm";
import { ThemeProvider } from "@mui/material";

const RateCard = () => {
  const [value, setValue] = React.useState(0);
  const [voted, setVoted] = React.useState(false);
  const [comment, setComment] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");

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

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textValue.length && voted) {
      setComment(true);
      setTextValue("");
      postRating(value, textValue);
    }
  };

  const handleRatingChange = (newValue) => {
    const value = newValue * 2;
    setValue(value);
    setVoted(true);
  };

  const postRating = (ratingValue, review) => {
    fetch("URL_BACKEND", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: ratingValue, review: review }),
    })
      .then((response) => {
        console.log(JSON.stringify({ rating: ratingValue, review: review }));
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
      <Typography className="rateText">
        ¿Cómo viviste la experiencia?
      </Typography>
      <StyledRating
        // sx={{color:"#fafafa"}}
        // name="simple-controlled"
        className="rateItem"
        name="size-medium"
        defaultValue={value * 0.5}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          //   setValue(newValue);
          handleRatingChange(newValue);
        }}
        disabled={voted}
      />
      <form className="commentForm" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Envianos tu comentario"
          required
          sx={{ m: 3 }}
          value={textValue}
          onChange={handleTextChange}
          className="commentText"
          disabled={comment}
        />
        <ThemeProvider theme={theme}>
          <Button
            type="submit"
            variant="contained"
            name="Neutral"
            className="commentButton"
            disabled={comment}
          >
            Enviar
          </Button>
        </ThemeProvider>
      </form>
      {textValue.length >= 1 && !voted && (
        <Typography variant="caption">
          * Por favor, califique su experiencia del 1 al 10.
        </Typography>
      )}
    </Box>
  );
};

export default RateCard;
