import { Box, Typography } from '@mui/material';
import React from 'react';
import "./ChartTotalSubscriptions.scss";

const ChartTotalSubscriptors = ({total}) => {
    console.log(total);
  return (
    <>
     {total !== undefined ? (
        <Box className="chartContainerTotal">
          <Typography className="titleTotal">TOTAL DE SUSCRIPCIONES</Typography>
          <Typography className="textTotal">{total.length}</Typography>
        </Box>
      ) : <></> }
    </>
  )
};

export default ChartTotalSubscriptors;
