import { Favorite, Info } from "@mui/icons-material";
import ROUTES from "../routes/ROUTES";
import FooterComponent from "./footer/FooterComponent";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const myLinks = [
  { to: ROUTES.HOME, children: "Home " },
  { to: ROUTES.REGISTER, children: "Register " },
  { to: ROUTES.LOGIN, children: "Login " },
  { to: ROUTES.ABOUT, children: "About " },
  { to: ROUTES.FAVORITE, children: "Favorite Cards" },
  { to: ROUTES.EDITCARDS, children: "Edit Cards" },
];

const alwaysLinks = [{ to: ROUTES.ABOUT, children: "About " }];

const loggedInLinks = [
  { to: "/favorite", children: "Favorite Cards" },
  { to: "/home", children: "Home" },
  { to: "/profile", children: "Profile" },
];

const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register " },
  { to: ROUTES.LOGIN, children: "Login " },
];

const loggedInLinksIsBusiness = [
  { to: ROUTES.FAVORITE, children: "Favorite Cards" },
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.CREATECARD, children: "Create Cards" },
  { to: ROUTES.EDITCARDS, children: "Edit Cards" },
];

const loggedInLinksIsAdmin = [
  { to: ROUTES.MYCARDS, children: "My Cards" },
  { to: ROUTES.ADMIN, children: "Admin" },
  { to: ROUTES.EDITCARDS, children: "Edit Cards" },
];
const loggedOutLinksFooter = [
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
];
const loggedInLinksFooter = [
  { to: ROUTES.FAVORITE, children: "Favorites", icon: <FavoriteIcon /> },
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
  { to: ROUTES.PROFILE, children: "Profile", icon: <PersonIcon /> },
];
const isBusinessFooter = [
  { to: ROUTES.FAVORITE, children: "Favorites", icon: <FavoriteIcon /> },
  { to: ROUTES.ABOUT, children: "About", icon: <InfoIcon /> },
  { to: ROUTES.MYCARDS, children: "My cards", icon: <AccountBoxIcon /> },
  { to: ROUTES.PROFILE, children: "Profile", icon: <PersonIcon /> },
];
const isAdminFooter = [
  { to: ROUTES.FAVORITE, children: "Favorites", icon: <FavoriteIcon /> },
  {
    to: ROUTES.ABOUT,
    children: "About",
    icon: <InfoIcon sx={{ width: 30, height: 30 }} />,
  },
  { to: ROUTES.HOME, children: "My cards", icon: <AccountBoxIcon /> },
  { to: ROUTES.PROFILE, children: "Profile", icon: <PersonIcon /> },
  {
    to: ROUTES.ADMIN,
    children: "AdminPanel",
    icon: <AdminPanelSettingsIcon />,
  },
];

export default myLinks;
export {
  loggedInLinks,
  loggedOutLinks,
  alwaysLinks,
  loggedInLinksIsBusiness,
  loggedInLinksIsAdmin,
  loggedOutLinksFooter,
  loggedInLinksFooter,
  isBusinessFooter,
  isAdminFooter,
};
