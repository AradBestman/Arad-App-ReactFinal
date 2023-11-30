import { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import nextKey from "generate-my-key";
import homePageNormalization from "../homePageNormalization";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const MyCards = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const userData = useSelector((state) => state.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cards/my-cards")
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
  const handleEditCard = (_id) => {
    console.log("_id to edit (HomePage)", _id);
    navigate(`${ROUTES.EDITCARDS}/${_id}`);
  };
  const handleDeleteCard = (_id) => {
    console.log("_id to delete (HomePage)", _id);
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.filter((card) => card._id !== _id)
    );
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {dataFromServer.map((card) => (
          <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={3}>
            <CardComponent
              card={card}
              onDeleteCard={handleDeleteCard}
              onEditCard={() => handleEditCard(card._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default MyCards;
