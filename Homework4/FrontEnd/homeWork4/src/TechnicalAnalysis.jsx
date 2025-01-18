import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Chart from "react-apexcharts";
import RSIStrategy from "./class/RSIStrategy";
import SMAStrategy from "./class/SMAStrategy";
import EMAStrategy from "./class/EMAStrategy";
import { subDays, subWeeks, subMonths, isAfter } from "date-fns";
import IssuerComponent from "./Components/IssuerComponent";

const TechnicalAnalysis = () => {
  const [issuer, setIssuer] = useState("REPL");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1month");
  const [selectedStrategy, setSelectedStrategy] = useState(new RSIStrategy()); 

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handleStrategyChange = (event) => {
    const strategy = event.target.value;
    switch (strategy) {
      case "RSI":
        setSelectedStrategy(new RSIStrategy());
        break;
      case "SMA":
        setSelectedStrategy(new SMAStrategy());
        break;
      case "EMA":
        setSelectedStrategy(new EMAStrategy());
        break;
      default:
        setSelectedStrategy(new RSIStrategy()); 
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4500/stock/${issuer}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [issuer]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const groupedData = groupByTimePeriod(data, timePeriod);
      setFilteredData(groupedData);
    }
  }, [data, timePeriod]);

  const groupByTimePeriod = (data, period) => {
    if (period === "all") return data;

    const now = new Date();
    const startDate =
      period === "1day"
        ? subDays(now, 1)
        : period === "1week"
        ? subWeeks(now, 1)
        : subMonths(now, 1);

    return data.filter((item) => isAfter(new Date(item.date), startDate));
  };

  useEffect(() => {
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      const prices = filteredData.map((item) =>
        parseFloat(item.lastTransactionPrice.replace(",", ""))
      );
      const indicatorValue = selectedStrategy.calculate(prices, 14);
      setIndicators([{ name: selectedStrategy.constructor.name, value: indicatorValue }]);
    }
  }, [filteredData, selectedStrategy]);

  const candlestickData =
    Array.isArray(filteredData) &&
    filteredData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: [
        parseFloat(item.lastTransactionPrice.replace(",", "")),
        parseFloat(item.maks),
        parseFloat(item.min),
        parseFloat(item.averagePrice.replace(",", "")),
      ],
    }));

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "Technical Analysis - Stock Data",
      align: "center",
    },
    xaxis: {
      type: "datetime",
      categories: Array.isArray(filteredData)
        ? filteredData.map((item) => new Date(item.date).getTime())
        : [],
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Box sx={{ padding: 4 }}>
       <IssuerComponent issuer={issuer} handleIssuerChange={handleIssuerChange} />

      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Time Period</InputLabel>
        <Select value={timePeriod} onChange={handleTimePeriodChange}>
          <MenuItem value={"1day"}>1 Day</MenuItem>
          <MenuItem value={"1week"}>1 Week</MenuItem>
          <MenuItem value={"1month"}>1 Month</MenuItem>
          <MenuItem value={"all"}>All Time</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Indicator</InputLabel>
        <Select onChange={handleStrategyChange}>
          <MenuItem value="RSI">RSI</MenuItem>
          <MenuItem value="SMA">SMA</MenuItem>
          <MenuItem value="EMA">EMA</MenuItem>
        </Select>
      </FormControl>

      {Array.isArray(filteredData) && filteredData.length > 0 ? (
        <>
          <Chart options={chartOptions} series={[{ data: candlestickData }]} type="candlestick" height={400} />
          <Box>
            <h3>Technical Indicator: {indicators[0]?.name}</h3>
            <h4>Value: {indicators[0]?.value}</h4>
          </Box>
        </>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default TechnicalAnalysis;