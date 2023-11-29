"use client";
import { useGetTopProducts } from "../../services/topProducts";
import { useGetReportingData } from "../../services/reportsData";
import ChartTopProducts from "../../components/chartTopProducts/ChartTopProduct";
import ChartTotalSubscriptors from "../../components/chartTotalSubscriptors/ChartTotalSubscriptors";
import { Box } from "@mui/material";
const EstadisticaPage = () => {
  const { topProducts } = useGetTopProducts();
  const { reportingData } = useGetReportingData();

  

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        borderRadius: "7px",
        padding: "30px",
        display:"flex",
        flexDirection: "column",
        justifyContent:"space-around"
        
      }}
    >
       <ChartTotalSubscriptors
        total={reportingData}
      />
      <ChartTopProducts topProducts={topProducts} />
        </Box>
  );
};

export default EstadisticaPage;
