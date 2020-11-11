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
import {
  addNotification,
  removeNotifications,
} from "../notifications/notificationActions";
import { dateEOD, dateNextDay } from "../../utils/helpers";

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

export function answerQuiz({ deckId, questionAnsweredCorrectly }) {
  return async function answerQuizInner(dispatch, getState) {
    dispatch({
      type: ANSWER_QUIZ,
      payload: {
        deckId: deckId,
        questionAnsweredCorrectly,
      },
    });
    const deck = getState().decks.byIds[deckId];
    if (deck.questionsAnswered === deck.questions.length) {
      const removeDateTime = dateEOD();
      removeNotifications(dispatch, getState, removeDateTime);
    }
    if (
      (deck.questionsAnswered === deck.questions.length) &
      (deck.questions.length > 0)
    ) {
      const dateTommorow = dateNextDay();
      dispatch(addNotification(dateTommorow));
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
