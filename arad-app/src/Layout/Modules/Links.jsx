import { BottomNavigationAction, Box } from "@mui/material";
import nextKey from "generate-my-key";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  loggedInLinksIsBusiness,
  loggedInLinksIsAdmin,
  loggedOutLinksFooter,
  loggedInLinksFooter,
  isBusinessFooter,
  isAdminFooter,
} from "../myLinks";
import ROUTES from "../../routes/ROUTES";

import { useSelector } from "react-redux";
import NavLinkComponent from "../header/NavLinkComponent";
import FooterComponent from "../footer/FooterComponent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Links = ({ column }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: {
            xs: "none",
            md: "flex",
            flexDirection: column ? "column" : "row",
          },
        }}
      >
        {alwaysLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
        {loggedIn &&
          loggedInLinks.map((myItem) => (
            <NavLinkComponent to={myItem.to} key={nextKey()}>
              {myItem.children}
            </NavLinkComponent>
          ))}
        {!loggedIn &&
          loggedOutLinks.map((myItem) => (
            <NavLinkComponent to={myItem.to} key={nextKey()}>
              {myItem.children}
            </NavLinkComponent>
          ))}

        {loggedIn && !userData.isAdmin && userData.isBusiness
          ? loggedInLinksIsBusiness.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}
        {loggedIn && userData.isAdmin && userData.isBusiness
          ? loggedInLinksIsAdmin.map((myItem) => (
              <NavLinkComponent to={myItem.to} key={nextKey()}>
                {myItem.children}
              </NavLinkComponent>
            ))
          : null}

        <FooterComponent className="arad" style={{ height: 40 }}>
          {!loggedIn &&
            loggedOutLinksFooter.map((myItem) => (
              <BottomNavigationAction
                label={myItem.children}
                icon={myItem.icon}
                key={nextKey()}
                onClick={() => {
                  navigate(myItem.to);
                }}
              />
            ))}
          {loggedIn && !userData.isAdmin && !userData.isBusiness
            ? loggedInLinksFooter.map((myItem) => (
                <BottomNavigationAction
                  label={myItem.children}
                  icon={myItem.icon}
                  key={nextKey()}
                  onClick={() => {
                    navigate(myItem.to);
                  }}
                />
              ))
            : null}
          {loggedIn && !userData.isAdmin && userData.isBusiness
            ? isBusinessFooter.map((myItem) => (
                <BottomNavigationAction
                  label={myItem.children}
                  icon={myItem.icon}
                  key={nextKey()}
                  onClick={() => {
                    navigate(myItem.to);
                  }}
                />
              ))
            : null}
          {loggedIn && userData.isAdmin && userData.isBusiness
            ? isAdminFooter.map((myItem) => (
                <BottomNavigationAction
                  label={myItem.children}
                  icon={myItem.icon}
                  key={nextKey()}
                  onClick={() => {
                    navigate(myItem.to);
                  }}
                />
              ))
            : null}
        </FooterComponent>
      </Box>
    </div>
  );
};

export default Links;
