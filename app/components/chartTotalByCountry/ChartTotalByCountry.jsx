import React from "react";
import "./ChartTotalByCountry.scss";
import { Box, Typography } from "@mui/material";

const ChartTotalByCountry = ({ total }) => {
  function countTotalByCountry(data) {
    const ocurrencias = {};

    data.forEach((suscripcion) => {
      const pais = suscripcion.country;
      if (ocurrencias[pais]) {
        ocurrencias[pais]++;
      } else {
        ocurrencias[pais] = 1;
      }
    });

    return ocurrencias;
  }

  const totalByCountry = countTotalByCountry(total);

  const arrayTotalByCountry = Object.keys(totalByCountry).map((pais) => ({
    pais,
    value: totalByCountry[pais],
  }));

  return (
    <>
      {total !== undefined ? (
        <Box className="chartContainerCountry">
          <Typography className="titleTotalCountry">
            USUARIOS ACTIVOS POR PAIS
          </Typography>
          {arrayTotalByCountry.map((item) => (
            <Typography key={item.pais} className="textCountry">
              {` ${item.pais} : ${item.value} `}
            </Typography>
          ))}
          
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChartTotalByCountry;
