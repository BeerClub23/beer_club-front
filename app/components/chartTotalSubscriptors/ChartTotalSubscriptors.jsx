import { Box, Typography } from "@mui/material";
import React from "react";
import "./ChartTotalSubscriptions.scss";

const ChartTotalSubscriptors = ({ total, inactive }) => {
  return (
    <>
      {total !== undefined ? (
        <Box className="chartContainerTotal">
          <Typography className="titleTotal">TOTAL DE USUARIOS</Typography>
          <Typography className="textTotal">Activos: {total.length}</Typography>
          <Typography
            className="textTotal"
                      >
            Inactivos: {inactive.length}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChartTotalSubscriptors;
