import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomButton from "../components/CustomButton";
import PageHeading from "../components/PageHeading";
import { BUTTON_PRIMARY_COLOR, CARD_BORDER } from "../res/colors";
import { getDecks } from "../redux/selectors";
import DeckAdd from "./DeckAdd";

// navigation.navigate("DeckView", {
//   id: item.id,
// });

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
  renderDeck = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("DeckView", {
            id: item.id,
          });
        }}
      >
        <View style={styles.deck}>
          <View>
            <Text style={styles.deckText}>{item.title}</Text>
          </View>
          <View style={styles.numOfCards}>
            <Text>{item.numOfCards} cards</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation, decks } = this.props;

    return (
      <View>
        <PageHeading title="Deck List" />
        {decks && decks.length ? (
          <FlatList
            data={decks}
            renderItem={this.renderDeck}
            keyExtractor={(deck) => deck.id.toString()}
            numColumns={1}
          />
        ) : (
          <View style={styles.centeredText}>
            <Text>No decks ;(</Text>
            <Text>Try creating one</Text>
          </View>
        )}
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
