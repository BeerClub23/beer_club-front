import { Typography } from "@mui/material";
import Footer from "../components/footer/Footer";
import HeaderPublic from "../components/headerPublic/headerPublic";
import Box from "@mui/material/Box";

export default function LoginPage() {
  return (
    <>
      <HeaderPublic />
      <Box component="main" sx={{ pt: 13 }}>
        <Typography variant="h1">Login</Typography>
      </Box>
      <Footer />
    </>
  );
}
