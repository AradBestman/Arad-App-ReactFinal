import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import nextKey from "generate-my-key";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import useQueryParams from "../hooks/useQueryParams";
import homePageNormalization from "./homePageNormalization";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authSlice.userData);
  const query = useQueryParams();
  const intersectionObserver = useRef(null);
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        console.log("dataa", data);
        setInitialDataFromServer(data);
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData]);

  useEffect(() => {
    if (!initialDataFromServer.length) return;
    const filter = query.filter ? query.filter : "";
    setDataFromServer(
      initialDataFromServer.filter((card) => card.title.startsWith(filter))
    );
  }, [query, initialDataFromServer]);

  const handleDeleteCard = (_id) => {
    console.log("_id to delete (HomePage)", _id);
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.filter((card) => card._id !== _id)
    );
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARDS}/${_id}`);
  };

  const handleLikeCard = async (_id) => {
    try {
      const response = await axios.patch(`/cards/${_id}`);
      const updatedData = response.data;
      setInitialDataFromServer((prevData) =>
        prevData.map((card) =>
          card._id === _id ? { ...card, like: !card.likes } : card
        )
      );
    } catch (err) {
      console.log("like err", err);
    }
  };
  useEffect(() => {
    if (!dataFromServer.length) return;

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Do something when the card is in the viewport
            console.log("Card is in the viewport:", entry.target);
          }
        });
      },
      { threshold: 1 } // Adjust the threshold as needed
    );

    // Start observing each card element
    dataFromServer.forEach((card) => {
      const target = document.getElementById(`card-${card._id}`);
      if (target) {
        intersectionObserver.current.observe(target);
      }
    });

    return () => {
      // Clean up the observer when the component unmounts
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [dataFromServer]);

  // const handleLikeSuccess = (_id) => {
  //   setInitialDataFromServer((prevData) =>
  //     prevData.map((card) =>
  //       card._id === _id ? { ...card, like: !card.likes } : card
  //     )
  //   );
  // };

  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h1">Welcome to our shop</Typography>
        <Typography>
          Here you can look at pictures of items and if you register on the site
          you can add the items to your favorites and make changes to your
          personal needs
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              card={card}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              id={`card-${card._id}`} // Set a unique ID for each card
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
