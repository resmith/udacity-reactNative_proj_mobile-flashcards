import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { answerQuiz, resetQuiz } from "../redux/actions";

import { getDeckById, getCardByDeckId } from "../redux/selectors";

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
  constructor(props) {
    super(props);
    this.state = { displayAnswer: false };
  }
  render() {
    const { deck, cards } = this.props;
    console.log("Quiz deck: ", deck);
    console.log("Quiz cards: ", cards);

    return (
      <View>
        <PageHeading title="Quiz" />
        <Text>{cards[deck.indexCurrentQuestion].question}</Text>
        {this.state.displayAnswer === true ? (
          <Text>{cards[deck.indexCurrentQuestion].answer}</Text>
        ) : null}
        <Text>Cards Left: {deck.numOfCards - deck.questionsAnswered}</Text>
        <Text>
          % correct: {deck.questionsAnsweredCorrectly / deck.numOfCards}
        </Text>

        <CustomButton
          title="View Answer"
          onPress={() => {
            this.setState({ displayAnswer: !this.state.displayAnswer });
          }}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
        <CustomButton
          title="Correct"
          onPress={() => {
            this.props.dispatch(
              answerQuiz({ deckId: deck.id, questionAnsweredCorrectly: 1 })
            );
          }}
          buttonColor={BUTTON_ANSWER_CORRECT}
        />
        <CustomButton
          title="Incorrect"
          onPress={() => {
            this.props.dispatch(
              answerQuiz({ deckId: deck.id, questionAnsweredCorrectly: 0 })
            );
          }}
          buttonColor={BUTTON_ANSWER_INCORRECT}
        />
        <CustomButton
          title="Reset Quiz"
          onPress={() => {
            this.props.dispatch(resetQuiz({ deckId: deck.id }));
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
  const { deckId } = route.params;
  const deck = getDeckById(state, deckId);
  const cards = getCardByDeckId(state, deckId);
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
