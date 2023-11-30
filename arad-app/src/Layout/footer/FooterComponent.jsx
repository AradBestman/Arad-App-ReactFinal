import React, { Fragment, useState } from "react";
import { BottomNavigation, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

const FooterComponent = ({ children }) => {
  const [value, setValue] = useState();
  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "inherit",
    zIndex: 999,
    height: 15,
  };

  return (
    <Fragment>
      <Divider></Divider>
      <BottomNavigation
        sx={{ height: 30, width: "100%" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={footerStyle}
      >
        {React.Children.map(children, (child) => {
          console.log(child);
          return child;
        })}
      </BottomNavigation>
    </Fragment>
  );
};
export default FooterComponent;
