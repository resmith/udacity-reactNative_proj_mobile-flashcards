import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CARD_BORDER } from "../../res/colors";

const DeckCard = ({ deck, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DeckView", {
          id: deck.id,
        });
      }}
    >
      <View style={styles.deck}>
        <View>
          <Text style={styles.deckText}>{deck.title}</Text>
        </View>
        <View style={styles.numOfCards}>
          <Text>{deck.questions.length} cards</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
});

export default DeckCard;
