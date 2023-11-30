// import React, { useEffect, useState } from "react";
// import CardComponent from "../../components/CardComponent";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Favorite = () => {
//   const [likedCards, setLikedCards] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const userData = useSelector((bigPie) => bigPie.authSlice.userData);

//   useEffect(() => {
//     const fetchLikedCards = async () => {
//       try {
//         setLoading(true);
//         const userId = userData._id; // Replace with the user's ID
//         const dataFromServer = await axios.get(
//           "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
//         );
//         const cards = dataFromServer.data.filter((card) =>
//           card.likes.includes(userId)
//         );

//         setLikedCards(cards);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching liked card IDs");
//         setLoading(false);
//       }
//     };

//     fetchLikedCards();
//   }, []);

//   const handleLikeRemove = () => {
//     const updatedLikedCards = likedCards.filter(
//       (card) => card._id !== card._Id
//     );
//     setLikedCards(updatedLikedCards);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Favorite Cards</h1>
//       {likedCards.length > 0 ? (
//         likedCards.map((card) => (
//           <CardComponent
//             key={card._id}
//             _id={card._id}
//             title={card.title}
//             subTitle={card.subtitle}
//             phone={card.phone}
//             address={`${card.address.city}, ${card.address.street} ${card.address.houseNumber}`}
//             img={card.image && card.image.url}
//             alt={card.image && card.image.alt}
//             cardNumber={card.bizNumber}
//             like={true}
//             onToggleFavorite={() => handleLikeRemove(card._id)}
//           />
//         ))
//       ) : (
//         <div>No liked cards found.</div>
//       )}
//     </div>
//   );
// };

// export default Favorite;
