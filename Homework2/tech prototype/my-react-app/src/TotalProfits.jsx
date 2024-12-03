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

export default function TotalProfits() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [issuer, setIssuer] = React.useState("");

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  const mockData = [
    { date: "2024-12-01", totalProfit: "4,800" },
    { date: "2024-12-02", totalProfit: "4,956" },
    { date: "2024-12-03", totalProfit: "5,625" },
    { date: "2024-12-04", totalProfit: "3,993" },
    { date: "2024-12-05", totalProfit: "4,932" },
  ];

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

      <TableContainer
        component={Paper}
        sx={{ marginTop: 4, border: "1px solid black" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#A7C7E7" }}>
            <TableRow>
              <TableCell style={{ width: "50%", border: "1px solid black" }}>
                Date
              </TableCell>
              <TableCell style={{ width: "50%", border: "1px solid black" }}>
                Total Profit in Denars
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#F0F0F0" }}>
            {mockData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid black" }}>
                  {row.date}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid black",
                  }}
                >
                  {row.totalProfit}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
