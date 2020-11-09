import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PageHeading from "../../components/PageHeading";
import { CARD_BORDER } from "../../res/colors";
import { getDecks } from "../../redux/decks/deckSelectors";
import DeckAdd from "./DeckAdd";
import DeckCard from "./DeckCard";

const Tab = createBottomTabNavigator();

function DeckListBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DeckAdd"
        component={DeckAdd}
        options={{ title: "Add Deck" }}
      />
    </Tab.Navigator>
  );
}

class DeckList extends Component {
  // renderDeckCards wrapper is needed to pass the navigation
  renderDeckCards = ({ item }) => (
    <DeckCard deck={item} navigation={this.props.navigation} />
  );

  render() {
    const { navigation, decks } = this.props;

    return (
      <View>
        <PageHeading title="Deck List" />
        <FlatList
          data={decks}
          renderItem={this.renderDeckCards}
          keyExtractor={(deck) => deck.id.toString()}
          numColumns={1}
          ListEmptyComponent={<Text>No decks created yet! Try DeckAdd</Text>}
        />
        <DeckListBottomTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,

    marginTop: 5,
    marginBottom: 5,
    borderColor: CARD_BORDER,
    borderRadius: 5,
    borderWidth: 2,
  },
  deckText: {
    fontSize: 32,
  },
  numOfCards: {
    fontSize: 20,
  },
  centeredText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  quiz: {
    width: 30,
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => {
  const decks = getDecks(state);
  return { decks };
};

export default connect(mapStateToProps)(DeckList);
