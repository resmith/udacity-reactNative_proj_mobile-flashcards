import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// Redux code
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { answerQuiz, resetQuiz } from "../../redux/decks/deckActions";
import { getDeckById } from "../../redux/decks/deckSelectors";

// App Code
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../components/CustomCard";
import PageHeading from "../../components/PageHeading";
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR,
  BUTTON_ANSWER_CORRECT,
  BUTTON_ANSWER_INCORRECT,
  BUTTON_DISABLED_COLOR,
} from "../../res/colors";

function Quiz({ deck, navigation }) {
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const dispatch = useDispatch();
  const cardsLeft = deck.questions.length - deck.questionsAnswered;

  return (
    <View>
      <PageHeading title="Quiz" />
      <CustomCard>
        <Text>{deck.questions[deck.indexCurrentQuestion].question}</Text>
      </CustomCard>
      {displayAnswer === true ? (
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
        title={displayAnswer ? "Hide Answer" : "Show Answer"}
        onPress={() => {
          setDisplayAnswer({ displayAnswer: !displayAnswer });
        }}
        buttonColor={BUTTON_PRIMARY_COLOR}
      />

      <CustomCard>
        <View style={styles.spreadRow}>
          <CustomButton
            title="Correct"
            onPress={async () => {
              dispatch(
                answerQuiz({
                  deckId: deck.id,
                  questionAnsweredCorrectly: 1,
                })
              );
            }}
            buttonColor={
              cardsLeft !== 0 ? BUTTON_ANSWER_CORRECT : BUTTON_DISABLED_COLOR
            }
            disabled={cardsLeft === 0}
          />
          <CustomButton
            title="Incorrect"
            onPress={() => {
              dispatch(
                answerQuiz({
                  deckId: deck.id,
                  questionAnsweredCorrectly: 0,
                })
              );
              setDisplayAnswer({ displayAnswer: false });
            }}
            buttonColor={
              cardsLeft !== 0 ? BUTTON_ANSWER_INCORRECT : BUTTON_DISABLED_COLOR
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
              dispatch(resetQuiz({ deckId: deck.id }));
            }}
            buttonColor={BUTTON_SECONDARY_COLOR}
          />
          <CustomButton
            title="Back To Deck"
            onPress={() => {
              navigation.navigate("DeckView", {
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
