import { AsyncStorage } from "react-native";
import { SCHEDULED_NOTIFICATION } from "./notificationConstants";

// Defined here instead of constants because this API is the only user of the constants
const NOTIFICATION_STORAGE_KEY = "MobileFlashcard:notifications";

export async function loadNotificationsStorage() {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const dataParsed = JSON.parse(data);
    return dataParsed;
  } catch (error) {
    console.log("api/loadNotificationsStorage error: ", error);
    return null;
  }
}

export async function addNotificationStorage(dateTime) {
  try {
    const itemToStore = JSON.stringify({
      [dateTime]: { id: dateTime, status: SCHEDULED_NOTIFICATION },
    });
    const response = await AsyncStorage.mergeItem(
      NOTIFICATION_STORAGE_KEY,
      itemToStore
    );
    return response;
  } catch (error) {
    console.log("api/addNotificationStorage error: ", error);
    return null;
  }
}

export async function removeNotificationsStorage(removeDateTime) {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const dataParsed = JSON.parse(data);
    const filteredNotifications = Object.keys(dataParsed)
      .filter((key) => key > removeDateTime)
      .reduce((obj, key) => {
        obj[key] = dataParsed[key];
        return obj;
      }, {});
    filteredNotificationsStr = JSON.stringify(filteredNotifications);
    await AsyncStorage.setItem(
      NOTIFICATION_STORAGE_KEY,
      filteredNotificationsStr
    );
    return { status: "successfull" };
  } catch (error) {
    console.log("api/removeNotificationsStorage error: ", error);
    return null;
  }
}

export async function removeAllNotificationsStorage() {
  try {
    const data = await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    return data;
  } catch (error) {
    console.log("api/removeAllNotificationsStorage error: ", error);
    return null;
  }
}

// Purpose of this function is to list the notifications to the console
export async function listNotificationsStorage() {
  try {
    const data = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return { completion: "successfull" };
  } catch (error) {
    console.log("api/listNotificationsStorage error: ", error);
    return null;
  }
}
