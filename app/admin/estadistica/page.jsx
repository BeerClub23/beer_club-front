"use client";
import React, { useEffect } from "react";
import { useGetTopProducts } from "../../services/topProducts";
import { useGetReportingData } from "../../services/reportsData";
import ChartTopProducts from "../../components/chartTopProducts/ChartTopProduct";
import ChartTotalSubscriptors from "../../components/chartTotalSubscriptors/ChartTotalSubscriptors";
import ChartPie from "../../components/chartPie/ChartPie";
import { Box } from "@mui/material";
const EstadisticaPage = () => {
  const { topProducts } = useGetTopProducts();
  const { reportingData } = useGetReportingData();
  const [activeUsers, setActiveUsers] = React.useState();
  React.useEffect(() => {
    setActiveUsers(reportingData.filter((user) => user.is_active == 1));
  }, [reportingData]);

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
      {activeUsers?.length > 0 && <ChartPie activeUsers={activeUsers} />}
    </Box>
  );
};

export default EstadisticaPage;
