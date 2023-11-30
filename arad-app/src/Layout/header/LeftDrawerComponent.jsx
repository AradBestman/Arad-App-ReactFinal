import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  ListItemIcon,
  Button,
  BottomNavigationAction,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

import {
  alwaysLinks,
  loggedOutLinksFooter,
  loggedInLinksFooter,
  isBusinessFooter,
  isAdminFooter,
  loggedOutLinks,
  loggedInLinks,
} from "../myLinks"; // Import your myLinks configuration
import { useSelector } from "react-redux";
import NavLinkComponent from "./NavLinkComponent";

const generateLinks = (links, onClick) => {
  return links.map((myItem) => (
    <NavLinkComponent to={myItem.to} key={myItem.to} onClick={onClick}>
      {myItem.children}
    </NavLinkComponent>
  ));
};

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const list = () => (
    <Box
      sx={{ width: { auto: 250 } }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      <List>{generateLinks(alwaysLinks, onCloseDrawer)}</List>
      <Divider />
      <List>
        {!loggedIn && generateLinks(loggedOutLinks, onCloseDrawer)}
        {loggedIn && !userData.isAdmin && !userData.isBusiness
          ? generateLinks(loggedInLinks, onCloseDrawer)
          : null}
        {loggedIn && !userData.isAdmin && userData.isBusiness
          ? generateLinks(isBusinessFooter, onCloseDrawer)
          : null}
        {loggedIn && userData.isAdmin && userData.isBusiness
          ? generateLinks(isAdminFooter, onCloseDrawer)
          : null}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
      {list()}
    </Drawer>
  );
};

export default LeftDrawerComponent;
