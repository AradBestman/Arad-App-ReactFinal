import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";

const BottomLink = ({ to, children, icon: Icon }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <IconButton
          color={isActive ? "#fff" : "#000"}
          sx={{ p: 2, textDecoration: "none" }}
          variant="h6"
        >
          <Icon />
        </IconButton>
      )}
    </NavLink>
  );
};

export default BottomLink;
