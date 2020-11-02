import {
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
  LOAD_INITIAL_DATA,
} from "./actionTypes";
import { convertTitleToKey } from "../utils/helpers";
import { getDecks, saveDeckTitle } from "../utils/api";

function addDeck(title) {
  const deckId = convertTitleToKey(title);
  return {
    type: ADD_DECK,
    payload: {
      deckId,
      title,
      numOfCards: 0,
    },
  };
}

export function handleAddDeck(title) {
  return (dispatch) => {
    dispatch(addDeck(title));

    // return saveDeckTitle(title).catch(() => {
    //   dispatch(REMOVE_DECK(title));
    //   alert("Error on saving Deck. Please try again");
    // });
  };
}

export const addCard = ({ deckId, question, answer }) => ({
  type: ADD_CARD,
  payload: {
    deckId,
    question,
    answer,
  },
});

export const answerQuiz = ({ deckId, questionAnsweredCorrectly }) => ({
  type: ANSWER_QUIZ,
  payload: {
    deckId: deckId,
    questionAnsweredCorrectly,
  },
});

export const resetQuiz = ({ deckId }) => ({
  type: RESET_QUIZ,
  payload: {
    deckId: deckId,
  },
});

const initialData = {
  allIds: ["aTest"],
  byIds: {
    aTest: {
      id: "aTest",
      indexCurrentQuestion: 1,
      numOfCards: 0,
      questions: [],
      questionsAnswered: 0,
      questionsAnsweredCorrectly: 0,
      title: "a",
    },
  },
};

export function loadData(decks) {
  return {
    type: LOAD_INITIAL_DATA,
    payload: decks,
  };
}

export async function loadInitialData(dispatch, getState) {
  // const response = await client.get('/fakeApi/todos')
  const response = initialData;
  console.log("loadInitialData response: ", response);
  dispatch(loadData(response));
}

// export function loadInitialData(decks) {
//   return (dispatch) => {
//     dispatch(loadData(initialData));
//     return {decks: initialData}
//   };
// }

export function handleGetDecks() {
  return (dispatch) => {
    return getDecks().then(({ decks }) => {
      dispatch(receiveDecks(decks));
    });
  };
}
