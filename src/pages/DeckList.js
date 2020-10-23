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

// import { RECEIVE_DECKS } from "../redux/actionTypes";
import CustomButton from "../components/CustomButton";
import PageHeading from "../components/PageHeading";
import { BUTTON_PRIMARY_COLOR, CARD_BORDER } from "../res/colors";
import { getDecks } from "../redux/selectors";

// navigation.navigate("DeckView", {
//   id: item.id,
// });

class DeckList extends Component {
  renderDeck = ({ item }) => {
    return (
      <View style={styles.deck}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DeckView", {
                id: item.id,
              });
            }}
          >
            <Text style={styles.deckText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numOfCards}>
          <Text>{item.numOfCards} cards</Text>
        </View>
      </View>
    );
  };

  render() {
    const { navigation, decks } = this.props;
    console.log("DeckList BUTTON_PRIMARY_COLOR: ", BUTTON_PRIMARY_COLOR);

    return (
      <SafeAreaView>
        <PageHeading title="Deck List" />
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={(deck) => deck.id.toString()}
          numColumns={1}
        />
        <CustomButton
          title="Add Deck"
          onPress={() => navigation.navigate("DeckAdd")}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
      </SafeAreaView>
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
  deckHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  deckHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  deckText: {
    fontSize: 32,
  },
  numOfCards: {
    fontSize: 20,
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
