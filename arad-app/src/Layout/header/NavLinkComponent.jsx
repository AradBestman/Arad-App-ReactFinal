import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import BottomNavigationAction from "@mui/material";

const NavLinkComponent = ({ to, children, onActivate }) => {
  return (
    <NavLink
      to={to}
      style={{ textDecoration: "none" }}
      onClick={() => onActivate && onActivate()}
    >
      {({ isActive }) => (
        <Typography
          color={isActive ? "#fff" : "#000"}
          sx={{ p: 2, textDecoration: "none" }}
          variant="h6"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};
{
}
export default NavLinkComponent;
