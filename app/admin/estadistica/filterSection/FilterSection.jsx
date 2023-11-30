import React from "react";
import "./FilterSection.scss";
import ChartPie from "../../../components/chartPie/ChartPie";
import { useGetReportingData } from "@/app/services/reportsData";
import { Box, Button, IconButton } from "@mui/material";
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
import { useGetReportingDataFiltered } from "../../../services/reportsData";

const FilterSection = () => {
  const today = new Date();
  const [endpoint, setEndpoint] = React.useState("");
  const { reportingData } = useGetReportingData();
  const { reportingDataFilter } = useGetReportingDataFiltered(endpoint);
  const [filteredData, setFilteredData] = React.useState();
  const [from, setFrom] = React.useState(dayjs("2023-01-01"));
  const [toDate, setToDate] = React.useState(dayjs(today));
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [suscription, setSuscription] = React.useState("");
  const [country, setCountry] = React.useState("");

  React.useEffect(() => {
    console.log(reportingDataFilter);
    !endpoint
      ? setFilteredData(reportingData)
      : setFilteredData(reportingDataFilter);
  }, [reportingDataFilter, reportingData, endpoint]);

  console.log(filteredData);
  const suscriptions = reportingData.reduce((acc, object) => {
    if (!acc.some((item) => item.name === object.name)) {
      acc.push({ name: object.name });
    }
    return acc;
  }, []);

  const countries = reportingData.reduce((acc, object) => {
    if (!acc.some((item) => item.country === object.country)) {
      acc.push({ country: object.country });
    }
    return acc;
  }, []);

  const status = reportingData.reduce((acc, object) => {
    if (!acc.some((item) => item.status === object.status)) {
      acc.push({ status: object.status });
    }
    return acc;
  }, []);
  const handleChange = (event) => {
    setSuscription(event.target.value);
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleDeleteFilter = () => {
    setFrom("");
    setToDate("");
    setPaymentStatus("");
    setSuscription("");
    setCountry("");
  };

  const handleSubmit = () => {
    //?typeSubscription=Especialista&paymentStatus=APROBADO
    let url = "";
    // from ? (url += `startDate=${from.$y}-${from.$M + 1}-${from.$D}&`) : "";
    // toDate ? (url += `endDate=${from.$y}-${from.$M + 1}-${from.$D}&`) : "";
    paymentStatus ? (url += `paymentStatus=${paymentStatus}&`) : "";
    suscription ? (url += `typeSubscription=${suscription}&`) : "";
    country ? (url += `country=${country}`) : "";
    console.log(url);
    setEndpoint(url);
  };

  return (
    <Box className="filterSectionContainer">
      <Box className="filterContainer">
        <Box className="datePickerContainer">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Desde"
                value={from}
                onChange={(newValue) => setFrom(newValue)}
              />

              <DatePicker
                label="Hasta"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box className="countryFilterContainer">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">País</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-country"
              value={country}
              // defaultValue="Seleccione Pais"
              label="País"
              onChange={handleChangeCountry}
            >
              {countries.map((item) => (
                <MenuItem key={item.country} value={item.country}>
                  {item.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-suscription"
              value={suscription}
              // defaultValue="Seleccione Pais"
              label="Tipo"
              onChange={handleChange}
            >
              {suscriptions.map((item) => (
                <MenuItem key={item.name} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-status"
              value={paymentStatus}
              // defaultValue="Seleccione Pais"
              label="Estado"
              onChange={handleChangeStatus}
            >
              {status.map((item) => (
                <MenuItem key={item.status} value={item.status}>
                  {item.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton aria-label="search" onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="search" onClick={handleDeleteFilter}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        {filteredData?.length > 0 && <ChartPie activeUsers={filteredData} />}
      </Box>
    </Box>
  );
};

export default FilterSection;
