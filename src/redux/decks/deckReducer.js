import {
  LOAD_DECKS,
  ADD_DECK,
  REMOVE_DECKS,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
} from "./deckActionTypes";

const initialState = {
  allIds: [],
  byIds: {},
};

function decks(state = initialState, action) {
  const id =
    action.payload && action.payload.deckId ? action.payload.deckId : 0;

  switch (action.type) {
    case LOAD_DECKS:
      let deckIds = [];
      let deckObjects = {};
      if (action.payload === null) {
        return { ...state };
      }
      for (let [key, value] of Object.entries(action.payload)) {
        deckIds.push(key);
        deckObjects[key] = value;
      }
      return {
        ...state,
        allIds: [...state.allIds, ...deckIds],
        byIds: {
          ...state.byIds,
          ...deckObjects,
        },
      };
    case ADD_DECK:
      title = action.payload.title;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: { ...action.payload },
        },
      };
    case REMOVE_DECKS:
      return {
        allIds: [],
        byIds: {},
      };
    case ADD_CARD:
      const { card } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            questions: [...state.byIds[id].questions, { ...card }],
          },
        },
      };
    case ANSWER_QUIZ:
      const { questionAnsweredCorrectly } = action.payload;

      if (
        state.byIds[id].questionsAnswered === state.byIds[id].questions.length
      ) {
        return { ...state };
      }

      newIndexCurrentQuestion =
        state.byIds[id].indexCurrentQuestion <
        state.byIds[id].questions.length - 1
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
