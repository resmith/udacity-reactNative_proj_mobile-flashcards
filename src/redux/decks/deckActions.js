// import { useDispatch } from "react-redux";

import {
  ADD_DECK,
  REMOVE_DECKS,
  ADD_CARD,
  ANSWER_QUIZ,
  RESET_QUIZ,
  LOAD_DECKS,
} from "./deckActionTypes";
import { convertTitleToKey } from "../../utils/helpers";
import {
  getDecks,
  addDeckStorage,
  addCardStorage,
  removeDecksStorage,
} from "../../utils/deckApi";

import { removeNotifications } from "../notifications/notificationActions";

export async function loadDecks(dispatch, getState) {
  const decks = await getDecks();
  dispatch({
    type: LOAD_DECKS,
    payload: decks,
  });
  return decks;
}

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

export function answerQuiz({
  deckId,
  questionAnsweredCorrectly,
  removeDateTime,
}) {
  return async function answerQuizInner(dispatch, getState) {
    console.log("Answer Quiz called");
    dispatch({
      type: ANSWER_QUIZ,
      payload: {
        deckId: deckId,
        questionAnsweredCorrectly,
      },
    });
    const deck = getState().decks.byIds[deckId];
    if (deck.questionsAnswered === deck.questions.length) {
      removeNotifications(dispatch, getState, removeDateTime);
    }
  };
}

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
