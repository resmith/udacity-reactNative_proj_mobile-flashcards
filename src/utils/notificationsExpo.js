import * as Notifications from "expo-notifications";

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
    console.log("api/removeNotificationsExpo error: ", error);
    return null;
  }
}
