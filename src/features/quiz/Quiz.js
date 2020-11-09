import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { answerQuiz, resetQuiz } from "../../redux/decks/deckActions";
import { getDeckById } from "../../redux/decks/deckSelectors";

import CustomButton from "../../components/CustomButton";
import CustomCard from "../../components/CustomCard";
import PageHeading from "../../components/PageHeading";
import { dateEOD } from "../../utils/helpers";
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR,
  BUTTON_ANSWER_CORRECT,
  BUTTON_ANSWER_INCORRECT,
  BUTTON_DISABLED_COLOR,
} from "../../res/colors";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = { displayAnswer: false };
  }
  render() {
    const { deck } = this.props;
    console.log("Quiz deck: ", deck);
    const cardsLeft = deck.questions.length - deck.questionsAnswered;
    return (
      <View>
        <PageHeading title="Quiz" />
        <CustomCard>
          <Text>{deck.questions[deck.indexCurrentQuestion].question}</Text>
        </CustomCard>
        {this.state.displayAnswer === true ? (
          <CustomCard>
            <Text>{deck.questions[deck.indexCurrentQuestion].answer}</Text>
          </CustomCard>
        ) : null}
        <CustomCard>
          <View style={styles.spreadRow}>
            <Text>Cards Left: {cardsLeft}</Text>
            <Text>
              Correct:{" "}
              {(
                (deck.questionsAnsweredCorrectly / deck.questions.length) *
                100
              ).toFixed(2)}
              %
            </Text>
          </View>
        </CustomCard>

        <CustomButton
          title={this.state.displayAnswer ? "Hide Answer" : "Show Answer"}
          onPress={() => {
            this.setState({ displayAnswer: !this.state.displayAnswer });
          }}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />

        <CustomCard>
          <View style={styles.spreadRow}>
            <CustomButton
              title="Correct"
              onPress={() => {
                this.props.dispatch(
                  answerQuiz({
                    deckId: deck.id,
                    questionAnsweredCorrectly: 1,
                    removeDateTime: dateEOD(),
                  })
                );
                this.setState({ displayAnswer: false });
              }}
              buttonColor={
                cardsLeft !== 0 ? BUTTON_ANSWER_CORRECT : BUTTON_DISABLED_COLOR
              }
              disabled={cardsLeft === 0}
            />
            <CustomButton
              title="Incorrect"
              onPress={() => {
                this.props.dispatch(
                  answerQuiz({
                    deckId: deck.id,
                    questionAnsweredCorrectly: 0,
                    removeDateTime: dateEOD(),
                  })
                );
                this.setState({ displayAnswer: false });
              }}
              buttonColor={
                cardsLeft !== 0
                  ? BUTTON_ANSWER_INCORRECT
                  : BUTTON_DISABLED_COLOR
              }
              disabled={cardsLeft === 0}
            />
          </View>
        </CustomCard>

        <CustomCard>
          <View style={styles.spreadRow}>
            <CustomButton
              title="Reset Quiz"
              onPress={() => {
                this.props.dispatch(resetQuiz({ deckId: deck.id }));
              }}
              buttonColor={BUTTON_SECONDARY_COLOR}
            />
            <CustomButton
              title="Back To Deck"
              onPress={() => {
                this.props.navigation.navigate("DeckView", {
                  id: deck.id,
                });
              }}
              buttonColor={BUTTON_SECONDARY_COLOR}
            />
          </View>
        </CustomCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spreadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
});

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  const deck = getDeckById(state, id);
  return {
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);
