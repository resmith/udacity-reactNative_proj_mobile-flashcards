export const getDecksState = (store) => store.decks;

export const getDeckList = (store) =>
  getDecksState(store) ? getDecksState(store).allIds : [];

export const getDeckById = (store, id) =>
  getDecksState(store) ? { ...getDecksState(store).byIds[id], id } : {};

// select from store combining information from multiple reducers
export const getDecks = (store) =>
  getDeckList(store).map((id) => getDeckById(store, id));
