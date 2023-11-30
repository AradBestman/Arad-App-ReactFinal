import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditProfile = ({ userId }) => {
  const userData2 = useSelector((state) => state.authSlice.userData);
  const [userData, setUserData] = useState();
  const [initialFields, setInitialFields] = useState({
    first: "",
    middle: "",
    last: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData2._id}`
      )
      .then(({ data }) => {
        setUserData(data);
        setInitialFields({
          first: data.name.first,
          middle: data.name.middle,
          last: data.name.last,
          phone: data.phone,
          url: data.image.url,
          alt: data.image.alt,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching user data", err);
      });
  }, []);
  const navigate = useNavigate();

  const handleInputsChange = (e) => {
    setInitialFields((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userData2._id}`,
        {
          name: {
            first: initialFields.first,
            middle: initialFields.middle,
            last: initialFields.last,
          },
          phone: initialFields.phone,
          image: {
            url: initialFields.url,
            alt: initialFields.alt,
          },
          address: {
            state: initialFields.state,
            country: initialFields.country,
            city: initialFields.city,
            street: initialFields.street,
            houseNumber: initialFields.houseNumber,
            zip: +initialFields.zip,
          },
        }
      );
      navigate(ROUTES.PROFILE);

      console.log("data from response", data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        Edit user
      </Typography>{" "}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="first"
            fullWidth
            id="first"
            label="First Name"
            autoFocus
            value={initialFields.first}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="middle"
            fullWidth
            id="middle"
            label="Middle Name"
            autoFocus
            value={initialFields.middle}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="last"
            label="Last Name"
            name="last"
            autoComplete="family-name"
            value={initialFields.last}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            autoComplete="new-phone"
            value={initialFields.phone}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="url"
            label="Url"
            id="url"
            autoComplete="new-url"
            value={initialFields.url}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="alt"
            label="Alt"
            id="alt"
            autoComplete="new-alt"
            value={initialFields.alt}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="state"
            label="State"
            id="state"
            autoComplete="new-state"
            value={initialFields.state}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="country"
            label="Country"
            id="country"
            autoComplete="new-country"
            value={initialFields.country}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="city"
            label="City"
            id="city"
            autoComplete="new-city"
            value={initialFields.city}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="street"
            label="Street"
            id="street"
            autoComplete="new-street"
            value={initialFields.street}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="houseNumber"
            label="House Number"
            id="houseNumber"
            autoComplete="new-houseNumber"
            value={initialFields.houseNumber}
            onChange={handleInputsChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="zip"
            label="Zip"
            id="zip"
            autoComplete="new-zip"
            value={initialFields.zip}
            onChange={handleInputsChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            onClick={handleSaveChanges}
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs onClick={() => navigate(ROUTES.PROFILE)}>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              ml: "0%",
              bgcolor: "navy",
              color: "gray",
            }}
          >
            Discard Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
