import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function HistoricalData() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [issuer, setIssuer] = React.useState("");

  const mockData = [
    {
      date: "2024-12-01",
      lastTransactionPrice: "1,200",
      max: "1,250",
      min: "1,150",
      averagePrice: "1,200",
      profitPercent: "4%",
      quantity: "100",
      turnover: "120,000",
      totalProfit: "4,800",
    },
    {
      date: "2024-12-02",
      lastTransactionPrice: "1,180",
      max: "1,220",
      min: "1,100",
      averagePrice: "1,160",
      profitPercent: "3.5%",
      quantity: "120",
      turnover: "141,600",
      totalProfit: "4,956",
    },
    {
      date: "2024-12-03",
      lastTransactionPrice: "1,250",
      max: "1,300",
      min: "1,200",
      averagePrice: "1,250",
      profitPercent: "5%",
      quantity: "90",
      turnover: "112,500",
      totalProfit: "5,625",
    },
    {
      date: "2024-12-04",
      lastTransactionPrice: "1,210",
      max: "1,260",
      min: "1,180",
      averagePrice: "1,220",
      profitPercent: "3%",
      quantity: "110",
      turnover: "133,100",
      totalProfit: "3,993",
    },
    {
      date: "2024-12-05",
      lastTransactionPrice: "1,240",
      max: "1,280",
      min: "1,190",
      averagePrice: "1,235",
      profitPercent: "4.2%",
      quantity: "95",
      turnover: "117,425",
      totalProfit: "4,932",
    },
  ];

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  return (
    <Box sx={{ padding: 4  }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          <DatePicker
            label="From"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />

          <DatePicker
            label="To"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="issuer-select-label">Issuer</InputLabel>
          <Select
            labelId="issuer-select-label"
            id="issuer-select"
            value={issuer}
            onChange={handleIssuerChange}
          >
            <MenuItem value={"REPL"}>REPL</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 , border: "1px solid black" }}>
        <Table>
          <TableHead sx={{backgroundColor:"#A7C7E7"}}>
            <TableRow>
              <TableCell sx={{ border: "1px solid black" }}>Date</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Last Transaction Price</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Max</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Min</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Average Price</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>%Profit</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Quantity</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Turnover in Best Denars</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Total Profit in Denars</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor:"#F0F0F0"}}>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid black" }}>{row.date}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.lastTransactionPrice}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.max}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.min}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.averagePrice}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.profitPercent}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.quantity}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.turnover}</TableCell>
                <TableCell sx={{ border: "1px solid black" }}>{row.totalProfit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}