import { ADD_CARD } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
};

// Note: RECEIVE_DECKS - Replaced with selectors - per Redux page code

function cards(state = initialState, action) {
  const id =
    action.payload && action.payload.cardId ? action.payload.cardId : 0;
  switch (action.type) {
    case ADD_CARD:
      const { deckId, question, answer } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            id,
            deckId,
            question,
            answer,
          },
        },
      };
    default:
      return state;
  }
}

export default cards;
