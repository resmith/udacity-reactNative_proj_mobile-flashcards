import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { addCard } from "../../redux/decks/deckActions";
import { convertTitleToKey } from "../../utils/helpers";
import CustomButton from "../../components/CustomButton";
import InputLabel from "../../components/InputLabel";
import { BUTTON_PRIMARY_COLOR, BUTTON_SECONDARY_COLOR } from "../../res/colors";

function CardAdd({ id, addCard, navigation }) {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const submit = () => {
    addCard({
      deckId: id,
      question: question,
      answer: answer,
    });

    setInput("");
    setQuestion("");
    setAnswer("");

    navigation.goBack();
  };

  return (
    <View>
      <InputLabel title="Question" />
      <TextInput
        style={styles.TextInput}
        onChangeText={(question) => setQuestion(question)}
        value={question}
      />
      <InputLabel title="Answer" />
      <TextInput
        style={styles.TextInput}
        onChangeText={(answer) => setAnswer(answer)}
        value={answer}
      />
      <CustomButton
        title="Submit"
        onPress={submit}
        buttonColor={BUTTON_PRIMARY_COLOR}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
});

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  return {
    id,
  };
}

export default connect(mapStateToProps, { addCard })(CardAdd);
