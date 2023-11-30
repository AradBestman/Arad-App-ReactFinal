const homePageNormalization = (dataFromServer, id) => {
  for (let card of dataFromServer) {
    card.likes = Boolean(card.likes.find((userId) => userId === id));
  }
  return dataFromServer;
};

export default homePageNormalization;
