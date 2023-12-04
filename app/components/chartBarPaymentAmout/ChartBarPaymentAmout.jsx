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
    } else {
      setDataRanking([]);
      setDataName([]);
    }
  }, [reportingDataFilter, endpoint]);

  return (
    <>
      <Box className="chartContainer">
        <Typography className="chartTitle">
          Estado del pago por importe
        </Typography>
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
                  fontSize: 10,
                  fill: "white",
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
