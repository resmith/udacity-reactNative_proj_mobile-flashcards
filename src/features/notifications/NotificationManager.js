import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import { connect } from "react-redux";
import { addNotification } from "../../redux/notifications/notificationActions";
import { getNotifications } from "../../redux/notifications/notificationSelectors";
import { timestampToDate } from "../../utils/helpers";
import { listNotificationsStorage } from "../../utils/notificationApi";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function NotificationManager(props) {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Notification info
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [date, setDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { notifications } = props;
  const notificationsArray = Object.values(notifications).sort(
    (a, b) => a.id - b.id
  );
  console.log("App notificationsArray: ", notificationsArray);
  listNotificationsStorage();

  return (
    <View style={styles.pageContainer}>
      <View style={styles.viewContainer}>
        <View>
          <Button onPress={showDatepicker} title="Select date" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Select time" />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.viewContainer}>
        <Text>Date: {date ? date.toString() : null} </Text>
      </View>
      <View style={styles.viewContainer}>
        <Button
          title="Schedule notification"
          onPress={async () => {
            await schedulePushNotification(
              date.getTime(),
              props.addNotification
            );
          }}
        />
      </View>
      <View style={styles.listContainer}>
        <Text>Notifications</Text>
        <FlatList
          data={notificationsArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {timestampToDate(item.id)} {item.status}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

async function schedulePushNotification(date, addNotification) {
  console.log("App schedulePushNotification date: ", date);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You need to study!",
      body: "Study every day!",
      data: { data: "goes here" },
    },
    trigger: date,
  });
  addNotification(date);
}

async function registerForPushNotificationsAsync() {
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
    console.log(token);
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    marginTop: 12,
  },
  listContainer: {
    justifyContent: "space-between",
    width: "80%",
    marginTop: 12,
  },
  container: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
});

function mapStateToProps(state) {
  const notifications = getNotifications(state);
  console.log(
    "NotificationManager mapStateToProps notifications: ",
    notifications
  );
  return { notifications };
}

export default connect(mapStateToProps, { addNotification })(
  NotificationManager
);
