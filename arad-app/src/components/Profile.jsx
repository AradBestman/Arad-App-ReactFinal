import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { Avatar, Button, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import nextKey from "generate-my-key";
import image from "../assets/images/ciggarette.jpg";
const Profile = () => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/users/${userData._id}`)
      .then(({ data }) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "auto",
        padding: 4,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        User Profile
      </Typography>
      {user ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="User Profile"
              src={image}
              sx={{
                width: 150,
                height: 150,
                marginBottom: 2,
              }}
            />
          </Box>
          <Button onClick={() => navigate(`${ROUTES.EDITPROFILE}/:_id`)}>
            EDIT
          </Button>
          <List>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              First Name: {user.name.first}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Middle Name: {user.name.middle}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Last Name: {user.name.last}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Email: {user.email}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Phone: {user.phone}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              State: {user.address.state}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Country: {user.address.country}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              City: {user.address.city}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Street: {user.address.street}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              House Number: {user.address.houseNumber}
            </ListItem>
            <ListItem sx={{ color: "black" }} key={nextKey()}>
              Zip: {user.address.zip}
            </ListItem>
          </List>{" "}
        </Box>
      ) : (
        <Typography variant="body1">No user found</Typography>
      )}
    </Box>
  );
};
export default Profile;
