import React, { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Redux
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { loadDecks, removeDecks } from "./src/redux/decks/deckActions";

// Notifications
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  setNotificationHandler,
  registerForPushNotificationsAsync,
} from "./src/utils/notificationsExpoApi";
import { listNotificationsStorage } from "./src/utils/notificationStorageApi";
import {
  loadNotifications,
  removeAllNotifications,
} from "./src/redux/notifications/notificationActions";

// Application
export const DECK_STORAGE_KEY = "MobileFlashcard:deck";
import DeckList from "./src/features/decks/DeckList";
import DeckAdd from "./src/features/decks/DeckAdd";
import DeckView from "./src/features/decks/DeckView";
import CardAdd from "./src/features/cards/CardAdd";
import Quiz from "./src/features/quiz/Quiz";
import NotificationManager from "./src/features/notifications/NotificationManager";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// store.dispatch(removeDecks); // Used to initialize storage
// store.dispatch(removeAllNotifications); // Used to initialize storage
store.dispatch(loadDecks);
store.dispatch(loadNotifications);

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="DeckList" component={DeckList} />
      <Tab.Screen name="DeckAdd" component={DeckAdd} />
      <Tab.Screen name="Notifications" component={NotificationManager} />
    </Tab.Navigator>
  );
}
setNotificationHandler();
export default function App() {
  useEffect(() => {
    // listNotificationsStorage(); // Used to send to console what's in storage
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

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.app}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="DeckList"
              component={DeckList}
              options={{ title: "Decks" }}
            />
            <Stack.Screen
              name="DeckAdd"
              component={DeckAdd}
              options={{ title: "Add Deck" }}
            />
            <Stack.Screen
              name="DeckView"
              component={DeckView}
              options={{ title: "View Deck" }}
            />
            <Stack.Screen
              name="CardAdd"
              component={CardAdd}
              options={{ title: "Add  Card" }}
            />
            <Stack.Screen
              name="Quiz"
              component={Quiz}
              options={{ title: "Quiz" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  app: {
    marginLeft: 20,
    marginRight: 20,
  },
});
