import "./planCard.scss";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Star } from "@mui/icons-material";

const PlanCard = ({
  id,
  title,
  benefit,
  price,
  isChecked,
  event,
  isRecommended,
}) => {
  const cardStyles = {
    border: id == isRecommended ? "2px solid #ceb5a7" : "2px solid #ddd",
  };

  if (isChecked) {
    return null;
  }
  return (
    <Card
      variant="outlined"
      className="card"
      sx={cardStyles}
      onClick={() => event(id)}
    >
      {id == isRecommended ? (
        <div className="triangle">
          <Star sx={{ ml: 3, mt: 0.2, color: "white" }} />
        </div>
      ) : (
        " "
      )}
      <CardContent className="content">
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h5"
            className="planType"
            sx={{ fontWeight: "bold" }}
          >
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          className="planPrice"
          sx={{ fontWeight: "bold" }}
        >
          $ {price}
        </Typography>
        <Typography className="benefitText" variant="caption">
          * {benefit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
