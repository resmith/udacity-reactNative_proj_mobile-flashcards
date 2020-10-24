import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
// import { getDeckById, getCardByDeckId } from "../redux/selectors";

import {
  getDeckById,
  getCardsState,
  getCardList,
  getCardById,
  getCards,
  getCardByDeckId,
} from "../redux/selectors";

import CustomButton from "../components/CustomButton";
import PageHeading from "../components/PageHeading";
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR,
  BUTTON_ANSWER_CORRECT,
  BUTTON_ANSWER_INCORRECT,
  CARD_BORDER,
} from "../res/colors";

class Quiz extends Component {
  render() {
    const { deck, cards } = this.props;
    console.log("Quiz deck: ", deck);
    console.log("Quiz cards: ", cards);

    return (
      <View>
        <PageHeading title="Quiz" />
        <Text>--> Display Card/Question</Text>
        <Text>--> # of Cards Left</Text>
        <Text>--> % correct</Text>

        <CustomButton
          title="Answer"
          onPress={() => {
            this.props.navigation.navigate("CardAdd", {
              id: deck.id,
            });
          }}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
        <CustomButton
          title="Correct"
          onPress={() => {
            this.props.navigation.navigate("Quiz", {
              id: deck.id,
            });
          }}
          buttonColor={BUTTON_ANSWER_CORRECT}
        />
        <CustomButton
          title="Incorrect"
          onPress={() => {
            this.props.navigation.navigate("Quiz", {
              id: deck.id,
            });
          }}
          buttonColor={BUTTON_ANSWER_INCORRECT}
        />
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

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  const deck = getDeckById(state, id);
  const cards = getCardByDeckId(state, id);
  return {
    deck,
    cards,
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

export default connect(mapStateToProps)(Quiz);
