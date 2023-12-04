"use client";
import React from "react";
import { useGetTopProducts } from "../../services/topProducts";
import { useGetReportingData } from "../../services/reportsData";
import ChartTopProducts from "../../components/chartTopProducts/ChartTopProduct";
import ChartTotalSubscriptors from "../../components/chartTotalSubscriptors/ChartTotalSubscriptors";
import ChartTotalByCountry from "../../components/chartTotalByCountry/ChartTotalByCountry";
import FilterSection from "./filterSection/FilterSection";
import UserSection from "./userSection/UserSection";
import { Box } from "@mui/material";
const EstadisticaPage = () => {
  const { topProducts } = useGetTopProducts();
  const { reportingData } = useGetReportingData();
  const [activeUsers, setActiveUsers] = React.useState();
  const [inactiveUsers, setInactiveUsers] = React.useState();
  React.useEffect(() => {
    setActiveUsers(reportingData.filter((user) => user.is_active === 1));
    setInactiveUsers(reportingData.filter((user) => user.is_active === 0));
  }, [reportingData]);

  return (
    <Box
      sx={{
        // backgroundColor: "rgb(247, 245, 245)",
        backgroundColor: "#rgb(16, 16, 16)",
        minHeight: "100vh",
        borderRadius: "4px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <ChartTotalSubscriptors total={activeUsers} inactive={inactiveUsers} />
        {activeUsers?.length > 0 && <ChartTotalByCountry total={activeUsers} />}
      </Box>
      {/* <Box sx={{margin:"0 auto"}}>
        {reportingData?.length > 0 && <ChartPie activeUsers={reportingData} />}

      </Box> */}

      <FilterSection activeUsers={reportingData}></FilterSection>
      <UserSection></UserSection>

      {/* <ChartTopProducts topProducts={topProducts} /> */}
    </Box>
  );
};

export default EstadisticaPage;
