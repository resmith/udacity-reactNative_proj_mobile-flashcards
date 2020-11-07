import { AsyncStorage } from "react-native";
import { convertTitleToKey } from "../utils/helpers";

// Defined here instead of constants because this API is the only user of the constants
export const DECK_STORAGE_KEY = "MobileFlashcard:deck";

export function getDecks() {
  console.log(
    "getDecks  AsyncStorage.getItem:",
    AsyncStorage.getItem(DECK_STORAGE_KEY)
  );
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((data) =>
    data.filter((item) => item.id === id)
  );
}

export function saveDeckTitle(title) {
  console.log("api saveDeckTitle title:", title);
  const deckId = convertTitleToKey(title);
  console.log("api saveDeckTitle deckId: ", deckId);
  const entry = {
    title,
    numOfCards: 0,
    indexCurrentQuestion: 0,
    questionsAnswered: 0,
    questionsAnsweredCorrectly: 0,
    questions: [],
  };

  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [deckId]: entry,
    })
  );
}

export function addCardToDeck({ title, card }) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [key]: entry,
    })
  );
}

export function removeDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}
