import { AsyncStorage } from "react-native";

// Defined here instead of constants because this API is the only user of the constants
export const DECK_STORAGE_KEY = "MobileFlashcard:deck";

export async function getDecks() {
  try {
    const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    const dataParsed = JSON.parse(data);
    return dataParsed;
  } catch (error) {
    console.log("api/getDecks error: ", error);
    return null;
  }
}

export async function getDeck(id) {
  try {
    const data = await AsyncStorage.getItem(DECK_STORAGE_KEY).then((data) =>
      data.filter((item) => item.id === id)
    );
    return data;
  } catch (error) {
    console.log("api/getDeck error: ", error);
    return null;
  }
}

export async function addDeckStorage(deck) {
  const deckId = deck.deckId;
  try {
    const response = await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck,
      })
    );
    return response;
  } catch (error) {
    console.log("api/addDeckStorage error: ", error);
    return null;
  }
}

export async function addCardStorage({ deckId, cards }) {
  try {
    const response = await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [deckId]: { questions: cards },
      })
    );
    return response;
  } catch (error) {
    console.log("api/addCardToDeck error: ", error);
    return null;
  }
}

// -->> For future use
// export async function removeDeck(key) {
//   try {
//     const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
//     const dataParsed = JSON.parse(results);
//     dataParsed[key] = undefined;
//     delete dataParsed[key];
//     AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dataParsed));
//   } catch (error) {
//     console.log("api/removeDeck error: ", error);
//     return null;
//   }
// }

export async function removeDecksStorage() {
  try {
    const data = await AsyncStorage.clear();
    return data;
  } catch (error) {
    console.log("api/removeDecksStorage error: ", error);
    return null;
  }
}
