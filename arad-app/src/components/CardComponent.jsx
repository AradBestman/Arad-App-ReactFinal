import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Hidden,
  IconButton,
  Typography,
  onLikeCard,
  onLikeSuccess,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import nextKey from "generate-my-key";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImage from "../assets/images/Toki222.jpg";
import ROUTES from "../routes/ROUTES";

const CardComponent = ({ card, onDeleteCard, onEditCard }) => {
  const [card1, setInnerCard] = useState({ ...card });
  const { _id, title, subTitle, phone, cardNumber } = card1;
  const img = card1.image.url;
  const alt = card1.image.alt;
  const address = `${card1.address.city}, ${card1.address.street} ${card1.address.houseNumber}`;

  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  // console.log("CardComponent");
  const handlePhoneClick = () => {
    console.log("you clicked on phone btn");
  };
  const handleDeleteCardClick = () => {
    console.log("_id to delete (CardComponent)", _id);
    onDeleteCard(_id);
  };
  const handleClickEditCard = () => {
    onEditCard(_id);
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      console.log("Image failed to load, setting default image");
    }
  };

  const handleLikeClick = async () => {
    try {
      const data = await axios.patch("/cards/" + _id);
      setInnerCard((prev) => {
        return { ...prev, likes: !prev.likes };
      });

      console.log("setIsLiked");
    } catch (err) {
      console.log("like err", err);
    }
  };

  return (
    <Card sx={{ minHeight: 500 }}>
      <CardActionArea>
        <CardMedia
          sx={{ minHeight: 250, maxHeight: 250 }}
          component="img"
          image={!imageError ? img : defaultImage}
          alt={alt}
          key={nextKey()}
          onLoad={() => console.log("Image loaded successfully")}
          onError={handleImageError}
        />
      </CardActionArea>
      <CardContent sx={{ minHeight: 250, minHeight: 250 }}>
        <CardHeader
          title={title}
          subheader={subTitle}
          sx={{
            minHeight: 60,
            maxHeight: 1.5,
            overflow: "Hidden",
            whiteSpace: "nowrap",
          }}
        />
        <Divider />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Phone:{" "}
            </Typography>
            {phone}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Address:{" "}
            </Typography>
            {address}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Card Number:{" "}
            </Typography>
            {cardNumber}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <IconButton onClick={handlePhoneClick}>
              <PhoneIcon />
            </IconButton>
            {loggedIn && !userData.isAdmin && userData.isBusiness ? (
              <IconButton onClick={handleClickEditCard}>
                <CreateIcon />
              </IconButton>
            ) : null}
          </Box>
          <Box>
            {loggedIn && userData.isAdmin && !userData.isBusiness ? (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : null}

            {loggedIn ? (
              <IconButton
                sx={{ color: card1.likes ? "error.main" : "inherit" }}
                onClick={handleLikeClick}
              >
                <FavoriteIcon />
              </IconButton>
            ) : null}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  card: PropTypes.object,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func.isRequired,
};
CardComponent.defaultProps = {
  img: "https://www.livemint.com/lm-img/img/2023/08/14/1600x900/garena_free_fire_max_1688877791610_1691982307589.jpg",
  alt: "running",
};

export default CardComponent;
