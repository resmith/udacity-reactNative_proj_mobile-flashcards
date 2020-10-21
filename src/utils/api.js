import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY } from "./constants";

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function AddDeck({ entry, key }) {
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
