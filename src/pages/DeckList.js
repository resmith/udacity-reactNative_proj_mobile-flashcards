import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import CustomButton from "../components/CustomButton";
import { BUTTON_PRIMARY } from "../utils/constants";

const DeckList = ({ navigation, decks }) => {
  // console.log("Dashboard props: ", this.props);
  dispatch(RECEIVE_DECKS);
  return (
    <View>
      <Text>Deck List</Text>

      <Text>--> Deck Title</Text>
      <Text>--> # of Cards in Deck</Text>
      <Text>--> Start Quiz</Text>
      <Text>--> Add Card (new question)</Text>
      {decks.map((deck) => (
        <Text>{deck.title}</Text>
      ))}
      <CustomButton
        title="Add Deck"
        buttonType={BUTTON_PRIMARY}
        onPress={() => navigation.navigate("DeckAdd")}
      />
    </View>
  );
};

function mapStateToProps({ decks, navigation }) {
  return {
    decks,
    navigation,
  };
}

// decksIds: Object.keys(decks).sort(
//   (a, b) => decks[b].title - decks[a].title
// ),

export default connect(mapStateToProps)(DeckList);
