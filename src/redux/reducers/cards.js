import { ADD_CARD } from "../actionTypes";

const initialState = {
  byId: {},
};

function cards(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    // RECEIVE_DECKS - Replaced with selectors - per Redux page code
    case ADD_CARD:
      const { id, deckId, question, answer } = action.payload;
      return {
        ...state,
        byId: {
          ...state.byId,
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
