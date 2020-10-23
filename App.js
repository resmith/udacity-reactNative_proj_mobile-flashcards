import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import store from "./src/redux/store";

import DeckList from "./src/pages/DeckList";
import DeckAdd from "./src/pages/DeckAdd";
import DeckView from "./src/pages/DeckView";
import CardAdd from "./src/pages/CardAdd";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.app}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={DeckList} />
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
