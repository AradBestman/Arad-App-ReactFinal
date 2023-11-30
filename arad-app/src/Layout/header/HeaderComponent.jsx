import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Alert, LinearProgress, Switch } from "@mui/material";
import Links from "../Modules/Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faM, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getToken } from "../../storageToken/storageToken";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import FilterSearch from "../Modules/SearchFilter/FilterSearch";
import image from "../../assets/images/ciggarette.jpg";
import { toast } from "react-toastify";
import LeftDrawerComponent from "./LeftDrawerComponent";

const HeaderComponent = ({ isDarkTheme, onThemeChange, children }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [SearchTxt, setSearchTxt] = React.useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [showLinks, setShowLinks] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (alertVisible) {
      const timeoutId = setTimeout(() => {
        setAlertVisible(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [alertVisible, 3000]);

  React.useEffect(() => {
    const checkOnline = () => {
      setIsOnline(true);
      console.log("isOnline:", isOnline);
    };

    checkOnline();

    const interval = setInterval(checkOnline, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = () => {
    setShowLinks(!showLinks);
    console.log("handleMenuClick", handleMenuClick);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (event) => {
    if (loggedIn) {
      onThemeChange(event.target.checked);
    } else {
      setAlertVisible(true);
    }
  };
  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
    console.log(handleCloseDrawerClick, "Console Logggggg");
  };

  const TOKEN = "token";
  const navigate = useNavigate();
  const handleLogout = () => {
    const token = getToken();

    if (token) {
      localStorage.removeItem(TOKEN);
      sessionStorage.removeItem(TOKEN);
    }

    dispatch(authActions.logout());
    toast("You logged out successfully ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={handleOpenDrawerClick}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
              {showLinks && <Links />}
            </IconButton>
            {alertVisible && (
              <Alert
                sx={{ position: "absolute", top: "100%", left: "50%" }}
                variant="outlined"
                severity="info"
              >
                You Are Not Allowed To Change The Theme,You must be logged in .
              </Alert>
            )}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Arad App
            </Typography>
            {/* {showLinks && <Links />} */}
            <Links />
            <FilterSearch />
            {isOnline && loggedIn && (
              <LinearProgress
                sx={{ width: "100px", height: "5px" }}
                value={10}
                color="success"
              />
            )}

            <Box
              sx={{
                my: 2,
                p: 1,
              }}
            >
              <IconButton onClick={handleThemeChange}>
                <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} />
              </IconButton>

              <Typography sx={{ display: { xs: "none", md: "inline" } }}>
                {isDarkTheme ? "Dark" : "Light"} Mode
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              ></IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img
                  src={image}
                  alt="Avatar"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <LeftDrawerComponent
          isOpen={isOpen}
          onCloseDrawer={handleCloseDrawerClick}
        />
      </React.Fragment>
    </Box>
  );
};
export default HeaderComponent;
