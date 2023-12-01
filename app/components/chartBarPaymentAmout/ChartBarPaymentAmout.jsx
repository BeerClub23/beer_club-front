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

  console.log(reportingDataFilter);

  // React.useEffect(() => {
  //   if (reportingDataFilter && reportingDataFilter.length > 0) {
  //     const newData = reportingDataFilter.reduce((acc, user) => {
  //       const existingItem = acc.find((info) => info.label === user.status);
  //       if (existingItem) {
  //         existingItem.value += user.lastPaidAmount;
  //       } else {
  //         acc.push({ label: user.status, value: user.lastPaidAmount });
  //       }
  //       return acc;
  //     }, []);
  //     // console.log(newData);
  //     setData(newData);
  //     //   setDataName(newData.map((item) => item.status));
  //     setDataRanking(newData.map((item) => item.value));
  //     setDataName(newData.map((item) => item.label));
  //     // setDataRanking(reportingDataFilter.map((item) => item.lastPaidAmount));
  //   }
  // }, [endpoint, reportingDataFilter]);

  // console.log(dataRanking);
  // const dataName = data?.map((item) => item.status);
  // const dataRanking = data?.map((item) => item.lastPaidAmount);

  React.useEffect(() => {
    if (reportingDataFilter && reportingDataFilter.length > 0) {
      const newData = reportingDataFilter.reduce((acc, user) => {
        const existingItem = acc.find((info) => info.label === user.status);
        if (existingItem) {
          existingItem.value += user.lastPaidAmount;
        } else {
          acc.push({ label: user.status, value: user.lastPaidAmount });
        }
        return acc;
      }, []);
  
      setData(newData);
      setDataRanking(newData.map((item) => item.value));
      setDataName(newData.map((item) => item.label));
    }
  }, [reportingDataFilter]);

  return (
    <>
      <Box className="chartContainer">
        <Typography className="chartTitle">Importe por Estado</Typography>
        {reportingDataFilter.length > 0 ? (
          <BarChart
            xAxis={[
              {
                id: "paymentStatus",
                label: "Estado del pago",

                data: ["CANCELADO", "RECHAZADO", "PENDIENTE", "APROBADO"],
                // data: data,
                scaleType: "band",
              },
            ]}
            yAxis={[{ label: "Ranking" }]}
            series={[
              {
                value: 1000, //CALCULAR TOTAL
                data: dataRanking,
                color: "#121111",
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
        ) : (
          <Typography className="chartPieText">
            No se encontraron resultados para los parametros ingresados
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ChartBarPaymentAmout;
