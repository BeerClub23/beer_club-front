"use client";
import { useGetTopProducts } from "../../services/topProducts";
import { useGetReportingData } from "../../services/reportsData";
import ChartTopProducts from "../../components/chartTopProducts/ChartTopProduct";
import ChartTotalSubscriptors from "../../components/chartTotalSubscriptors/ChartTotalSubscriptors";
import ChartPie from "../../components/chartPie/ChartPie";
import { Box } from "@mui/material";
import { useState } from "react";
const EstadisticaPage = () => {
  const { topProducts } = useGetTopProducts();
  const { reportingData } = useGetReportingData();
  const [activeUsers, setActiveUsers] = useState([]);
  // if (reportingData.length) {
  //   setActiveUsers(reportingData.filter((user) => console.log(user.is_active)));
  // }

  console.log(reportingData);
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        borderRadius: "7px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <ChartTotalSubscriptors total={activeUsers} />
      <ChartTopProducts topProducts={topProducts} />
      <ChartPie reportingData={reportingData} />
    </Box>
  );
};

export default EstadisticaPage;
