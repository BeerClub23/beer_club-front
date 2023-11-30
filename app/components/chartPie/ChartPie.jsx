import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";
import './ChartPie.scss'

const size = {
  width: 400,
  height: 200,
};

export default function ChartPie({ activeUsers }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const newData = activeUsers.reduce(
      (acc, user) => {
        const existingItem = acc.find((info) => info.label === user.name);
        if (existingItem) {
          existingItem.value += 1;
        } else {
          acc.push({ label: user.name, value: 1 });
        }
        return acc;
      },
      [...data],
    );

    setData(newData);
  }, [activeUsers]);

  const TOTAL = activeUsers.length;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  console.log(data);
  console.log(TOTAL);

  return (
    <Box className= "chartPieContainer">
      <Typography className="chartPieTitle">% Usuarios por Suscripcion</Typography>
      <PieChart
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
        {...size}
      />

    </Box>
  );
}
