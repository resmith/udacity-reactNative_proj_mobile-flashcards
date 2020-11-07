import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { getDeckById } from "../../redux/decks/deckSelectors";

import CustomButton from "../../components/CustomButton";
import PageHeading from "../../components/PageHeading";
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR,
  CARD_BORDER,
} from "../../res/colors";

class DeckView extends Component {
  render() {
    const { deck } = this.props;

    return (
      <View>
        <PageHeading>{deck.title}</PageHeading>
        <View style={styles.deck}>
          <View>
            <Text style={styles.deckText}>{deck.title}</Text>
          </View>
          <View style={styles.numOfCards}>
            <Text>{deck.questions.length} cards</Text>
          </View>
        </View>

        <CustomButton
          title="Add Card"
          onPress={() => {
            this.props.navigation.navigate("CardAdd", {
              id: deck.id,
            });
          }}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
        <CustomButton
          title="Start Quiz"
          onPress={() => {
            this.props.navigation.navigate("Quiz", {
              deckId: deck.id,
            });
          }}
          buttonColor={BUTTON_SECONDARY_COLOR}
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
