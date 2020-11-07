import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { addCard } from "../../redux/decks/deckActions";
import { convertTitleToKey } from "../../utils/helpers";
import CustomButton from "../../components/CustomButton";
import InputLabel from "../../components/InputLabel";
import { BUTTON_PRIMARY_COLOR, BUTTON_SECONDARY_COLOR } from "../../res/colors";

class CardAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  submit = () => {
    this.props.addCard({
      deckId: this.props.id,
      question: this.state.question,
      answer: this.state.answer,
    });

    // Write to API submitEntry({ key, entry });
    this.setState(() => ({ question: "", answer: "" }));

    this.props.navigation.goBack();

    // Clear local notification
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <InputLabel title="Question" />
        <TextInput
          style={styles.TextInput}
          onChangeText={(question) => this.setState(() => ({ question }))}
          value={this.state.question}
        />
        <InputLabel title="Answer" />
        <TextInput
          style={styles.TextInput}
          onChangeText={(answer) => this.setState(() => ({ answer }))}
          value={this.state.answer}
        />
        <CustomButton
          title="Submit"
          onPress={this.submit}
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
      </View>
    );
  }
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

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  return {
    id,
  };
}

// export default connect(mapStateToProps, mapDispatchToProps, { addCard })(
export default connect(mapStateToProps, { addCard })(CardAdd);
