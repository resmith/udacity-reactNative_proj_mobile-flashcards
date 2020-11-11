import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function setNotificationHandler() {
  try {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  } catch (error) {
    console.log("notificationsExpoApi/setNotificationHandler error: ", error);
    return null;
  }
}

export async function schedulePushNotification(date) {
  try {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "You need to study!",
        body: "Study every day!",
        data: { data: "goes here" },
      },
      trigger: date,
    });
    return identifier;
  } catch (error) {
    console.log("notificationsExpoApi/schedulePushNotification error: ", error);
    return null;
  }
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export async function removeNotificationsExpo(removeDateTime) {
  try {
    const outstandingNotifications = await Notifications.getAllScheduledNotificationsAsync();
    outstandingNotifications.forEach((obj) => {
      const value = obj.trigger.value.toString();
      if (value < removeDateTime) {
        Notifications.cancelScheduledNotificationAsync(value);
      }
    });
    return outstandingNotifications.length;
  } catch (error) {
    console.log("notificationsExpoApi/removeNotificationsExpo error: ", error);
    return null;
  }
}
