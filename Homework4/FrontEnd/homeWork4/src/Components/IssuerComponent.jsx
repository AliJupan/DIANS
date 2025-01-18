import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchIssuers } from "../utils/fetchIssuers";

const IssuerComponent = ({ issuer, handleIssuerChange }) => {
  const [issuers, setIssuers] = useState([]);

  useEffect(() => {
    const getIssuers = async () => {
      try {
        const data = await fetchIssuers();
        setIssuers(data);
      } catch (error) {
        console.error("Failed to load issuers:", error);
      }
    };

    getIssuers();
  }, []);

  return (
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
          <MenuItem value="" disabled>
            Loading...
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default IssuerComponent;
