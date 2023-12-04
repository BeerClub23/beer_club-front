import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import "./ChartPieUserBySubsc.scss";
import { useGetReportingDataFiltered } from "../../services/reportsData";

const size = {
  width: 400,
  height: 200,
};

const palette = ["#1e91ed", "#ab4bde", "#15ab92", "#f3aacb", "#9ddbc9"];

export default function ChartPieUserBySubsc({ endpoint }) {
  const { reportingDataFilter } = useGetReportingDataFiltered(endpoint);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (reportingDataFilter.length > 0) {
      const newData = reportingDataFilter.reduce(
        (acc, user) => {
          const existingItem = acc.find((info) => info.label === user.name);
          if (existingItem) {
            existingItem.value += 1;
          } else {
            acc.push({ label: user.name, value: 1 });
          }
          return acc;
        },
        [data],
      );

      setData(newData);
    }
  }, [endpoint, reportingDataFilter]);

  const TOTAL = reportingDataFilter.length;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;

    return `${(percent * 100).toFixed(0)}%`;
  };

  // console.log();
  // console.log(TOTAL);

  // console.log(reportingDataFilter);

  return (
    <Box className="chartPieContainer">
      <Typography className="chartPieTitle">
        % Usuarios por Suscripción
      </Typography>
      {reportingDataFilter.length > 0 ? (
        <PieChart
          colors={palette}
          series={[
            {
              arcLabel: getArcLabel,
              arcLabelMinAngle: 45,
              data,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 14,
                fill: "white",
              },
            },
          }}
          {...size}
        />
      ) : (
        <Typography className="chartPieText">
          No se encontraron resultados para los parametros ingresados
        </Typography>
      )}
    </Box>
  );
}
