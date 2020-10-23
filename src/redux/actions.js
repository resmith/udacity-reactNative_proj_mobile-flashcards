import { ADD_DECK, ADD_CARD } from "./actionTypes";

let nextDeckId = 0;
let nextCardId = 0;

export const addDeck = (title) => ({
  type: ADD_DECK,
  payload: {
    id: ++nextDeckId,
    title: title,
    numOfCards: 0,
  },
});

export const addCard = ({ deckId, question, answer }) => ({
  type: ADD_CARD,
  payload: {
    deckId,
    id: ++nextCardId,
    question,
    answer,
  },
});
