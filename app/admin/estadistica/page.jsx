"use client";
import React, { useEffect } from "react";
import { useGetTopProducts } from "../../services/topProducts";
import { useGetReportingData } from "../../services/reportsData";
import ChartTopProducts from "../../components/chartTopProducts/ChartTopProduct";
import ChartTotalSubscriptors from "../../components/chartTotalSubscriptors/ChartTotalSubscriptors";
import ChartTotalByCountry from "../../components/chartTotalByCountry/ChartTotalByCountry";
import FilterSection from "./filterSection/FilterSection";
import { Box } from "@mui/material";
import ChartPie from "../../components/chartPie/ChartPie";
const EstadisticaPage = () => {
  const { topProducts } = useGetTopProducts();
  const { reportingData } = useGetReportingData();
  const [activeUsers, setActiveUsers] = React.useState();
   React.useEffect(() => {
     setActiveUsers(reportingData.filter((user) => user.is_active == 1));
    }, [reportingData]);

  // console.log(reportingData);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
        <ChartTotalSubscriptors total={activeUsers} />
        {activeUsers?.length > 0 && <ChartTotalByCountry total={activeUsers} />}
      </Box>
       <Box sx={{margin:"0 auto"}}>
        {reportingData?.length > 0 && <ChartPie activeUsers={reportingData} />}

      </Box>

          <FilterSection activeUsers={reportingData} >

          </FilterSection>

    
      <ChartTopProducts topProducts={topProducts} />
    </Box>
  );
};

export default EstadisticaPage;
