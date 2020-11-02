import {
  LOAD_INITIAL_DATA,
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
} from "../actionTypes";

// TODO -->> See about getting the decks from Async storage for populating the state
const initialState = {
  allIds: [],
  byIds: {},
};

function decks(state = initialState, action) {
  const id =
    action.payload && action.payload.deckId ? action.payload.deckId : 0;

  switch (action.type) {
    case LOAD_INITIAL_DATA:
      console.log(
        "reducer - decks - LOAD_INITIAL_DATA action.payload: ",
        action.payload
      );
      console.log("reducer - decks - LOAD_INITIAL_DATA returning: ", {
        ...state,
        ...action.payload,
      });
      return {
        ...state,
        ...action.payload,
      };
    case RECEIVE_DECKS:
      console.log("decks RECEIVE_DECKS decks: ", action.payload.decks);
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
            questions: [],
          },
        },
      };
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
            questions: [],
          },
        },
      };
    case ADD_CARD:
      const { question, answer } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            numOfCards: ++state.byIds[id].numOfCards,
            questions: [...state.byIds[id].questions, { question, answer }],
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
