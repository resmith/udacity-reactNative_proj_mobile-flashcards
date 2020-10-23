import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { getDeckById } from "../redux/selectors";

import CustomButton from "../components/CustomButton";
import PageHeading from "../components/PageHeading";
import { BUTTON_PRIMARY } from "../utils/constants";

class DeckView extends Component {
  render() {
    const { deck } = this.props;

    return (
      <View>
        <PageHeading>{deck.title}</PageHeading>
        <Text>Deck Title: Deck</Text>
        <Text>{deck.numOfCards} cards</Text>
        <CustomButton
          title="Add Card"
          onPress={() => {
            this.props.navigation.navigate("CardAdd", {
              id: deck.id,
            });
          }}
        />
        <CustomButton
          title="Start Quiz"
          onPress={() => {
            this.props.navigation.navigate("QuizStart", {
              id: deck.id,
            });
          }}
        ></CustomButton>
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  const deck = getDeckById(state, id);
  return {
    deck,
  };

  //  return {
  //   remove: () =>
  //     dispatch(
  //       addEntry({
  //         [entryId]:
  //           timeToString() === entryId ? getDailyReminderValue() : null,
  //       })
  //     ),
  //   goBack: () => navigation.goBack(),
  // };
}

// function mapDispatchToProps(dispatch, { route, navigation }) {
//   const { entryId } = route.params;
//   return {
//     remove: () =>
//       dispatch(
//         addEntry({
//           [entryId]:
//             timeToString() === entryId ? getDailyReminderValue() : null,
//         })
//       ),
//     goBack: () => navigation.goBack(),
//   };
// }

export default connect(mapStateToProps)(DeckView);
