import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Chart from "react-apexcharts";
import { subDays, subWeeks, subMonths, isAfter } from "date-fns";

const TechnicalAnalysis = () => {
  const [issuer, setIssuer] = useState("REPL");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [signals, setSignals] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1month");
  const [issuers, setIssuers] = useState([]);

  const handleIssuerChange = (event) => {
    setIssuer(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
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
    fetchData();
  }, [issuer]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const groupedData = groupByTimePeriod(data, timePeriod);
      setFilteredData(groupedData);
    }
  }, [data, timePeriod]);

  const calculateRSI = (prices, period = 14) => {
    if (prices.length < period) return null;

    let gains = 0,
      losses = 0;
    for (let i = 1; i < period; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff > 0) gains += diff;
      else losses -= diff;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
  };

  const calculateSMA = (prices, period) => {
    if (prices.length < period) return null;

    return (
      prices.slice(0, period).reduce((sum, price) => sum + price, 0) / period
    );
  };

  const calculateEMA = (prices, period) => {
    if (prices.length < period) return null;

    const k = 2 / (period + 1);
    let ema = prices[0];

    prices.forEach((price, index) => {
      if (index === 0) return;
      ema = price * k + ema * (1 - k);
    });

    return ema;
  };

  const generateSignals = (indicators) => {
    const signals = [];

    indicators.forEach((indicator) => {
      if (indicator.name === "RSI") {
        if (indicator.value > 70) signals.push("Sell");
        else if (indicator.value < 30) signals.push("Buy");
        else signals.push("Hold");
      }
    });

    return signals;
  };

  useEffect(() => {
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      const prices = filteredData.map((item) =>
        parseFloat(item.lastTransactionPrice.replace(",", ""))
      );

      const rsi = calculateRSI(prices, 14);
      const sma = calculateSMA(prices, 14);
      const ema = calculateEMA(prices, 14);

      const newIndicators = [
        { name: "RSI", value: rsi },
        { name: "SMA", value: sma },
        { name: "EMA", value: ema },
      ];

      setIndicators(newIndicators);
      setSignals(generateSignals(newIndicators));
    }
  }, [filteredData]);

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
    annotations: {
      yaxis: indicators
        .filter((ind) => ind.name === "SMA" || ind.name === "EMA")
        .map((ind) => ({
          y: ind.value,
          borderColor: "#FF0000",
          label: {
            text: ind.name,
          },
        })),
    },
  };

  return (
    <Box sx={{ padding: 4 }}>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Issuer</InputLabel>
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

      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Time Period</InputLabel>
        <Select value={timePeriod} onChange={handleTimePeriodChange}>
          <MenuItem value={"1day"}>1 Day</MenuItem>
          <MenuItem value={"1week"}>1 Week</MenuItem>
          <MenuItem value={"1month"}>1 Month</MenuItem>
          <MenuItem value={"all"}>All Time</MenuItem>
        </Select>
      </FormControl>

      {Array.isArray(filteredData) && filteredData.length > 0 ? (
        <>
          <Chart
            options={chartOptions}
            series={[{ data: candlestickData }]}
            type="candlestick"
            height={400}
          />

          <Box>
            <h3>Indicators</h3>
            <ul>
              {indicators.map((indicator, index) => (
                <li key={index}>
                  {indicator.name}: {indicator.value?.toFixed(2) || "N/A"}
                </li>
              ))}
            </ul>

            <h3>Signals</h3>
            <ul>
              {signals.map((signal, index) => (
                <li key={index}>{signal}</li>
              ))}
            </ul>
          </Box>
        </>
      ) : (
        <p>No data available to display.</p>
      )}
    </Box>
  );
};

export default TechnicalAnalysis;