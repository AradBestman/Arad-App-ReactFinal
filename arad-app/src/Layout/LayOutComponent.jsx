import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HeaderComponent from "./header/HeaderComponent";
import FooterComponent from "./footer/FooterComponent";
import tmc from "twin-moon-color";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import CenterComponent from "./Center/CenterComponent";

const LayOutComponent = ({ children }) => {
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const dispatch = useDispatch();

  const themes = tmc({
    "text.headerColor": "!#b219e6",
    "text.headerActive": "#9e165c",
  });
  // console.log("themes", themes);
  // const themes = tmc({ primary: "#00FF00", elisheva: "#FF0000" });

  const darkTheme = createTheme(themes.dark);
  const lightTheme = createTheme(themes.light);

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });
  // const lightTheme = createTheme({
  //   palette: {
  //     mode: "light",
  //   },
  // });

  const handleThemeChange = (checked) => {
    dispatch(darkThemeActions.changeTheme());
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <HeaderComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <CenterComponent>{children}</CenterComponent>
      {/* <MainComponent><Homepage /></MainComponent> */}
      <FooterComponent
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
    </ThemeProvider>
  );
};

export default LayOutComponent;
