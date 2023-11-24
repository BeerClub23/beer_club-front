import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useGetSubscriptions } from "../../../services/subscriptions";

const RecommendationCard = ({
  recommendationImage,
  title,
  description,
  productName,
  subscriptionId,
}) => {
  const { subscriptions, isLoading, isError } = useGetSubscriptions();
  const subscription = subscriptions.find((s) => s.id === subscriptionId);

  return (
    <Card sx={{ width: 300, mt: 5, mb: 5 }}>
      <CardMedia
        component="img"
        alt="banner"
        height="140"
        image={recommendationImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Producto: {productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Suscripción: {subscription ? subscription.name : ""}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default RecommendationCard;
