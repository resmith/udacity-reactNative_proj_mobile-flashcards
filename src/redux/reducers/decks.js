import { ADD_DECK, ADD_CARD, ANSWER_QUIZ, RESET_QUIZ } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {},
};

// NOTE: RECEIVE_DECKS - Replaced with selectors - per Redux page code

function decks(state = initialState, action) {
  console.log(action);
  const id =
    action.payload && action.payload.deckId ? action.payload.deckId : 0;
  console.log("reducers decks id: ", id);
  switch (action.type) {
    case ADD_DECK:
      const { title } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            title,
            numOfCards: 0,
            indexCurrentQuestion: 0,
            questionsAnswered: 0,
            questionsAnsweredCorrectly: 0,
          },
        },
      };
    case ADD_CARD:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            numOfCards: ++state.byIds[id].numOfCards,
          },
        },
      };
    case ANSWER_QUIZ:
      const { questionAnsweredCorrectly } = action.payload;

      if (state.byIds[id].questionsAnswered === state.byIds[id].numOfCards) {
        return { ...state };
      }

      newIndexCurrentQuestion =
        state.byIds[id].indexCurrentQuestion < state.byIds[id].numOfCards - 1
          ? ++state.byIds[id].indexCurrentQuestion
          : state.byIds[id].indexCurrentQuestion;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            indexCurrentQuestion: newIndexCurrentQuestion,
            questionsAnswered: ++state.byIds[id].questionsAnswered,
            questionsAnsweredCorrectly:
              state.byIds[id].questionsAnsweredCorrectly +
              questionAnsweredCorrectly,
          },
        },
      };
    case RESET_QUIZ:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            indexCurrentQuestion: 0,
            questionsAnswered: 0,
            questionsAnsweredCorrectly: 0,
          },
        },
      };

    default:
      return state;
  }
}

export default decks;
