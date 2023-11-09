import "./planDetail.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import { Card, CardContent, Chip, Typography } from "@mui/material";

const PlanDetail = ({ subscription }) => {
  return (
    <Card className="cardDetail" sx={{ textAlign: "left" }}>
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {subscription.name}
        </Typography>
        <Typography
          variant="h5"
          className="detailPrice"
          sx={{ fontWeight: "bold" }}
        >
          $ {subscription.price}
        </Typography>
        <Chip
          label="Envio gratis"
          sx={{ backgroundColor: "black", mb: 2, mt: 1, color: "white" }}
        />
        <hr />
        <List>
          {subscription.benefits.map((item, index) => (
            <PlanItem key={index} itemText={item.name} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const PlanItem = ({ itemText }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckIcon
          className="listIcon"
          sx={{ strokeWidth: 2, stroke: "black" }}
        />
      </ListItemIcon>
      <ListItemText className="listItem" primary={itemText} />
    </ListItem>
  );
};

export default PlanDetail;
