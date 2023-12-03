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
      console.log(reportingDataFilter);
      const newData = [];
      reportingDataFilter.forEach((user) => {
        const { status, lastPaidAmount } = user;
        const existingItemIndex = newData.findIndex(
          (info) => info.label === status,
        );
        if (existingItemIndex !== -1) {
          newData[existingItemIndex].value += lastPaidAmount;
        } else {
          newData.push({ label: status, value: lastPaidAmount });
        }
      });

      setData(newData);
      setDataRanking(newData.map((item) => item.value));
      setDataName(newData.map((item) => item.label));
    }else{
      setDataRanking([]);
      setDataName([]);
    }
  }, [reportingDataFilter, endpoint]);


  return (
    <>
      <Box className="chartContainer">
        <Typography className="chartTitle">Estado del pago por importe</Typography>
        {dataName.length > 0 && dataRanking.length > 0 ? (
          <BarChart
            xAxis={[
              {
                id: "paymentAmountByStatus",
                label: "Estado del pago",

                data: dataName,
                //   data: ["bar A", "bar B", "bar C"],
                scaleType: "band",
              },
            ]}
            yAxis={[{ label: "Importe" }]}
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
