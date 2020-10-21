import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { addDeck } from "../actions";
import { convertTitleToKey } from "../utils/helpers";
import CustomButton from "../components/CustomButton";
import InputLabel from "../components/InputLabel";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "../utils/constants";

class DeckAdd extends Component {
  state = {
    input: "",
  };

  submit = () => {
    console.log("Submit started");
    input = this.state.input;
    const key = convertTitleToKey(input);
    const data = {
      title: input,
      NumCards: 0,
    };
    console.log("input ", input);
    console.log("key ", key);
    console.log("data ", data);

    this.props.dispatch(
      addDeck({
        [key]: data,
      })
    );

    // Write to API submitEntry({ key, entry });
    this.setState(() => ({ input: "" }));

    // this.props.navigation.navigate("Home");

    // Clear local notification
  };

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <InputLabel title="Enter Deck Title" />
        <TextInput
          style={styles.TextInput}
          onChangeText={(text) => this.setState(() => ({ input: text }))}
        />
        <CustomButton
          title="Submit"
          onPress={this.submit}
          buttonType={PRIMARY_BUTTON}
        />
        <CustomButton
          title="Go Home"
          onPress={() => navigation.navigate("Home")}
          buttonType={SECONDARY_BUTTON}
        />
        <Text>{this.state.input}</Text>
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

function mapStateToProps({ navigation }) {
  return {
    navigation,
  };
}

export default connect(mapStateToProps)(DeckAdd);
