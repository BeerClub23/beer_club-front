import React from "react";
import "./FilterSection.scss";
import ChartPieUserBySubsc from "../../../components/chartPieUserBySubsc/ChartPieUserBySubsc";
import ChartPieUserByCountry from "../../../components/chartPieUserByCountry/ChartPieUserByCountry";
import ChartBarPaymentAmount from "../../../components/chartBarPaymentAmout/ChartBarPaymentAmout";
import ChartBarPaymentUser from "../../../components/chartBarPaymentUser/ChartBarPaymentUser";
import { Box, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useGetSubscriptions } from "@/app/services/subscriptions";
import { red } from "@mui/material/colors";

const FilterSection = () => {
  const today = new Date();
  const [endpoint, setEndpoint] = React.useState("");
  const { subscriptions } = useGetSubscriptions();
  // const [from, setFrom] = React.useState(dayjs(""));
  const [from, setFrom] = React.useState("");
  // const [toDate, setToDate] = React.useState(dayjs(""));
  const [toDate, setToDate] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [suscription, setSuscription] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [userStatus, setUserStatus] = React.useState("");

  const handleChange = (event) => {
    setSuscription(event.target.value);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangePaymentStatus = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleChangeUserStatus = (event) => {
    setUserStatus(event.target.value);
  };

  const handleDeleteFilter = () => {
    setFrom("");
    setToDate("");
    setPaymentStatus("");
    setSuscription("");
    setCountry("");
    setUserStatus("");
    setEndpoint("");
  };

  const handleSubmit = () => {
    let url = "";
    let dateFromNorm = from.$M + 1;
    let dateToNorm = toDate.$M + 1;
    from
      ? (url += `startDate=${from.$y}-${dateFromNorm
          .toString()
          .padStart(2, "0")}-${from.$D.toString().padStart(2, "0")}&`)
      : "";
    toDate
      ? (url += `endDate=${toDate.$y}-${dateToNorm
          .toString()
          .padStart(2, "0")}-${toDate.$D.toString().padStart(2, "0")}&`)
      : "";
    paymentStatus ? (url += `paymentStatus=${paymentStatus}&`) : "";
    suscription ? (url += `typeSubscription=${suscription}&`) : "";
    country ? (url += `country=${country}&`) : "";
    userStatus.length ? (url += `isActive=${userStatus}&`) : "";
    console.log(url);
    setEndpoint(url);
    // handleDeleteFilter()
  };

  return (
    <Box className="filterSectionContainer">
      <Box className="filterContainer">
        <Box className="countryFilterContainer">
          <FormControl fullWidth className="filterInputs">
            <InputLabel id="demo-simple-select-label">País</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-country"
              value={country}
              // defaultValue="Seleccione Pais"
              label="País"
              onChange={handleChangeCountry}
            >
              <MenuItem value="Argentina">Argentina</MenuItem>
              <MenuItem value="Colombia">Colombia</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="filterInputs">
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-suscription"
              value={suscription}
              // defaultValue="Seleccione Pais"
              label="Tipo"
              onChange={handleChange}
            >
              {subscriptions.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="filterInputs">
            <InputLabel id="demo-simple-select-label">Pago</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-status"
              value={paymentStatus}
              // defaultValue="Seleccione Pais"
              label="pago"
              onChange={handleChangePaymentStatus}
            >
              <MenuItem value="APROBADO">APROBADO</MenuItem>
              <MenuItem value="PENDIENTE">PENDIENTE</MenuItem>
              <MenuItem value="CANCELADO">CANCELADO</MenuItem>
              <MenuItem value="RECHAZADO">RECHAZADO</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth className="filterInputs">
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-status"
              value={userStatus}
              // defaultValue="Seleccione Pais"
              label="Estado"
              onChange={handleChangeUserStatus}
            >
              <MenuItem value="1">Activo</MenuItem>
              <MenuItem value="0">Inactivo</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            aria-label="search"
            onClick={handleSubmit}
            sx={{ color: "rgba(235, 232, 232, 0.795)" }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            aria-label="search"
            onClick={handleDeleteFilter}
            sx={{ color: "rgba(235, 232, 232, 0.795)" }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
        <Typography className="dataPickerTitle">
          Filtrar por fecha de alta:
        </Typography>
        <Box className="datePickerContainer">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                className="inputDate"
                label="Desde"
                value={from}
                onChange={(newValue) => setFrom(newValue)}
              />

              <DatePicker
                className="inputDate"
                label="Hasta"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box className="chartsContainer">
        <Box sx={{ margin: "0 auto" }}>
          {/* {filteredData?.length > 0 && <ChartPie activeUsers={filteredData} />} */}
          <ChartPieUserBySubsc endpoint={endpoint} />
        </Box>
        <Box sx={{ margin: "0 auto" }}>
          {/* {filteredData?.length > 0 && <ChartPie activeUsers={filteredData} />} */}
          <ChartPieUserByCountry endpoint={endpoint} />
        </Box>
        <Box sx={{ margin: "0 auto" }}>
          {/* {filteredData?.length > 0 && <ChartPie activeUsers={filteredData} />} */}
          <ChartBarPaymentAmount endpoint={endpoint} />
        </Box>
        <Box sx={{ margin: "0 auto" }}>
          {/* {filteredData?.length > 0 && <ChartPie activeUsers={filteredData} />} */}
          <ChartBarPaymentUser endpoint={endpoint} />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
