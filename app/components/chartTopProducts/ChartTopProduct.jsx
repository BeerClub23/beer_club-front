import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography, Box } from "@mui/material";
import "./ChartTopProduct.scss";

const ChartTopProducts = ({ topProducts }) => {
  // console.log(topProducts);
  const dataName = topProducts?.map((item) =>
    item.name.length >= 10 ? item.name.substring(0, 11) : item.name,
  );
  console.log(dataName);
  const dataRanking = topProducts?.map((item) => item.productScore);
  console.log(dataRanking);

  return (
    <>
      <Box className="chartContainer">
        <Typography className="chartTitle">Cervezas Mejor Rankeadas</Typography>
        <BarChart
          xAxis={[
            {
              id: "topProducts",
              label: "Cervezas",

              data: dataName,
              //   data: ["bar A", "bar B", "bar C"],
              scaleType: "band",
            },
          ]}
          yAxis={[{ label: "Ranking" }]}
          series={[
            {
              value: 10,
              //   data: [2, 5, 3],
              data: dataRanking,
              color: "#ceb5a7",
            },
          ]}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 11,
                fill: "blue",
              },
            },
          }}
          width={400}
          height={300}
        />
      </Box>
    </>
  );
};

export default ChartTopProducts;
