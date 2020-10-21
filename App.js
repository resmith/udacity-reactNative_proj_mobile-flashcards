import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./src/reducers";
import middleware from "./src/middleware";

import DeckList from "./src/pages/DeckList";
import DeckAdd from "./src/pages/DeckAdd";

const Stack = createStackNavigator();

export default function App() {
  // const store = createStore(reducer, middleware);
  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={DeckList} />
          <Stack.Screen
            name="DeckAdd"
            component={DeckAdd}
            options={{ title: "Add Deck" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
