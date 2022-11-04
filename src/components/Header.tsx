import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import logo from "../logo.svg";

function Header() {
  return (
    <AppBar color="transparent" position="static" className="header">
      <Toolbar>
        <img src={logo} className="logo" alt="logo" />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
