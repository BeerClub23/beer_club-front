import { Box, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import React from "react";
import "./ChartTotalSubscriptions.scss";

const ChartTotalSubscriptors = ({ total, inactive }) => {
  return (
    <>
      {total !== undefined ? (
        <Box className="chartContainerTotal">
          <Typography className="titleTotal">TOTAL DE USUARIOS</Typography>
          <Typography className="textTotal">  <ArrowOutwardIcon sx={{color:"#15ab92"}}/> Activos: {total.length}</Typography>
          <Typography className="textTotal"> <SouthEastIcon sx={{color:"#ff6961"}}/> Inactivos: {inactive.length}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChartTotalSubscriptors;
