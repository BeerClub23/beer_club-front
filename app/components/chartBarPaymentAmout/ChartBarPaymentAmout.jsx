import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography, Box } from "@mui/material";
import "./ChartBarPaymentAmout.scss";
import { useGetReportingDataFiltered } from "@/app/services/reportsData";

const ChartBarPaymentAmout = ({ endpoint }) => {
  const { reportingDataFilter } = useGetReportingDataFiltered(endpoint);

  const [data, setData] = React.useState([]);
  const [dataName, setDataName] = React.useState([]);
  const [dataRanking, setDataRanking] = React.useState([]);

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

  const dataName = data?.map((item) => item.status);
  const dataRanking = data?.map((item) => item.lastPaidAmount);

  return (
    <>
      <Box className="chartContainer">
        <Typography className="chartTitle">Importe por Estado</Typography>
        <BarChart
          xAxis={[
            {
              id: "paymentStatus",
              label: "Estado del pago",

              data: dataName,
              // data: data,
              scaleType: "band",
            },
          ]}
          yAxis={[{ label: "Ranking" }]}
          series={[
            {
              value: 1000, //CALCULAR TOTAL
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

export default ChartBarPaymentAmout;
