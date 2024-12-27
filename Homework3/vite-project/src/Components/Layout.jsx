import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar.jsx";

const Layout = () => {

  return (
    <Box>
      <AppBar/>
      <Outlet/>
    </Box>
  );
};

export default Layout;
