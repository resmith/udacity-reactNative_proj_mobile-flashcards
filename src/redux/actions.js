import { ADD_DECK, ADD_CARD, ANSWER_QUIZ, RESET_QUIZ } from "./actionTypes";

let nextDeckId = 0;
let nextCardId = 0;
let nextQuizId = 0;

export const addDeck = (title) => ({
  type: ADD_DECK,
  payload: {
    deckId: ++nextDeckId,
    title: title,
    numOfCards: 0,
  },
});

export const addCard = ({ deckId, question, answer }) => ({
  type: ADD_CARD,
  payload: {
    deckId,
    cardId: ++nextCardId,
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
