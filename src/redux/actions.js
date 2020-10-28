import {
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
  RECEIVE_DECKS,
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

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks: decks,
  };
}

export function handleGetDecks() {
  return (dispatch) => {
    return getDecks().then(({ decks }) => {
      dispatch(receiveDecks(decks));
    });
  };
}
