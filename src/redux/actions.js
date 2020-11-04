import {
  ADD_DECK,
  REMOVE_DECKS,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
  LOAD_INITIAL_DATA,
} from "./actionTypes";
import { convertTitleToKey } from "../utils/helpers";
import {
  getDecks,
  addDeckStorage,
  addCardStorage,
  removeDecksStorage,
} from "../utils/api";

export function addDeck(title) {
  return async function saveNewDeck(dispatch, getState) {
    const deckId = convertTitleToKey(title);
    const deck = {
      title,
      deckId,
      indexCurrentQuestion: 0,
      questionsAnswered: 0,
      questionsAnsweredCorrectly: 0,
      questions: [],
    };
    addDeckStorage(deck);
    dispatch({
      type: ADD_DECK,
      payload: deck,
    });
  };
}

export function addCard({ deckId, question, answer }) {
  return async function saveNewCard(dispatch, getState) {
    const deck = getState().decks.byIds[deckId];
    const card = { question, answer };
    const cards = [...deck.questions, card];
    addCardStorage({ deckId, cards });
    dispatch({
      type: ADD_CARD,
      payload: {
        deckId,
        card,
      },
    });
  };
}

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

export async function removeDecks(dispatch, getState) {
  const response = await removeDecksStorage();
  dispatch({
    type: REMOVE_DECKS,
    payload: {},
  });
  return response;
}

export async function loadInitialData(dispatch, getState) {
  const decks = await getDecks();
  dispatch({
    type: LOAD_INITIAL_DATA,
    payload: decks,
  });
  return decks;
}
