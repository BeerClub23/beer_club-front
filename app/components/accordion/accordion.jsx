import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./accordion.scss";

const AccordionWrapper = ({ title, content, isActive, setQuestion }) => {
  return (
    <Accordion expanded={isActive} onChange={setQuestion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id={title}
      >
        <Typography sx={{ flexShrink: 0, fontWeight: 700 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionWrapper;
