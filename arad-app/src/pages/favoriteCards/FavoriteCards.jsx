import React, { useEffect, useState } from "react";
import nextKey from "generate-my-key";
import axios from "axios";
import { useSelector } from "react-redux";
import CardComponent from "../../components/CardComponent";
import { Container, Grid, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
const FavoriteCardPage = ({
  onEditCard,
  _id,
  handleDeleteCard,
  onDeleteCard,
}) => {
  const [likedCards, setLikedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        setLoading(true);
        const userId = userData._id; // Replace with the user's ID
        const dataFromServer = await axios.get("/cards/");
        const cards = dataFromServer.data.filter((card) =>
          card.likes.includes(userId)
        );

        setLikedCards(cards);
        setLoading(false);
      } catch (error) {
        setError("Error fetching liked card IDs");
        setLoading(false);
      }
    };

    fetchLikedCards();
  }, []);

  const handleLikeRemove = () => {
    const updatedLikedCards = likedCards.filter(
      (card) => card._id !== card._Id
    );
    setLikedCards(updatedLikedCards);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleClickEditCard = (_id) => {
    // console.log("move to edit card page");
    // onEditCard(_id);
    navigate(`${ROUTES.EDITCARDS}/${_id}`);
  };
  const handleDeleteCardClick = () => {
    console.log("_id to delete (CardComponent)", _id);
    onDeleteCard(_id);
  };

  return (
    <Container>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h1"
      >
        Favorite Cards
      </Typography>
      <Grid container spacing={2}>
        {likedCards.length > 0 ? (
          likedCards.map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                card={card}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleClickEditCard}
              />
            </Grid>
          ))
        ) : (
          <div>No liked cards found.</div>
        )}
      </Grid>
    </Container>
  );
};
FavoriteCardPage.propTypes = {
  onEditCard: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

export default FavoriteCardPage;
