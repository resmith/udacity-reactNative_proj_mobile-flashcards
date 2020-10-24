// *** Deck Selectors
export const getDecksState = (store) => store.decks;

export const getDeckList = (store) =>
  getDecksState(store) ? getDecksState(store).allIds : [];

export const getDeckById = (store, id) =>
  getDecksState(store) ? { ...getDecksState(store).byIds[id], id } : {};

// select from store combining information from multiple reducers
export const getDecks = (store) =>
  getDeckList(store).map((id) => getDeckById(store, id));

// *** Card Selectors
export const getCardsState = (store) => store.cards;

export const getCardList = (store) =>
  getCardsState(store) ? getCardsState(store).allIds : [];

export const getCardById = (store, id) =>
  getCardsState(store) ? { ...getCardsState(store).byIds[id], id } : {};

export const getCards = (store) =>
  getCardList(store).map((id) => getCardById(store, id));

export const getCardByDeckId = (store, id) => {
  const cards = getCards(store);
  return cards.filter((card) => card.deckId === id);
};

// select from store combining information from multiple reducers
// export const getCards = (store) =>
//   getCardList(store).map((id) => getCardById(store, id));
