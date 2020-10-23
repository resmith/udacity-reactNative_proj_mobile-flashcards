import { ADD_DECK, ADD_CARD } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
};

function decks(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    // RECEIVE_DECKS - Replaced with selectors - per Redux page code
    case ADD_DECK:
      const { id, title, numOfCards } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            title,
            numOfCards,
          },
        },
      };
    case ADD_CARD:
      const { deckId } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [deckId]: {
            ...state.byIds[deckId],
            numOfCards: ++state.byIds[deckId].numOfCards,
          },
        },
      };
    default:
      return state;
  }
}

export default decks;
