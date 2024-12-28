import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function HistoricalData() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [issuer, setIssuer] = React.useState("");
  const [data, setData] = useState([]);

  const [issuers, setIssuers] = useState([]);

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  const fetchData = async () => {
    if (!issuer || !startDate || !endDate) {
      return; 
    }

    try {
      const response = await axios.post(
        `http://localhost:4500/stock/${issuer}/from-to`,
        {
          fromDate: startDate.toISOString(),
          toDate: endDate.toISOString(),
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [issuer, startDate, endDate]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0"); 
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchIssuers = async () => {
    try {
      const response = await fetch("http://localhost:4500/stock/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setIssuers(result.data);
    } catch (error) {
      console.error("Error fetching issuers:", error);
    }
  };

  useEffect(() => {
    fetchIssuers();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
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
          <Select value={issuer} onChange={handleIssuerChange}>
            {issuers.length > 0 ? (
              issuers.map((issuerCode) => (
                <MenuItem key={issuerCode} value={issuerCode}>
                  {issuerCode}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="REPL">Loading...</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ marginTop: 4, border: "1px solid black" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#A7C7E7" }}>
            <TableRow>
              <TableCell sx={{ border: "1px solid black" }}>Date</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                Last Transaction Price
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Max</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Min</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                Average Price
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>%Profit</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>Quantity</TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                Turnover in Best Denars
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                Total Profit in Denars
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#F0F0F0" }}>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid black" }}>
                  {formatDate(row.date)}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.lastTransactionPrice}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.maks}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.min}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.averagePrice}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.profit}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.quantity}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.turnoverInBestInDenars}
                </TableCell>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.totalProfitInDenars}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}