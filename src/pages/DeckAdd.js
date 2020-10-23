import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";

import { addDeck } from "../redux/actions";
import CustomButton from "../components/CustomButton";
import InputLabel from "../components/InputLabel";
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from "../utils/constants";

class DeckAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  submit = () => {
    this.props.addDeck(this.state.input);
    this.setState({ input: "" });

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
          value={this.state.input}
        />
        <CustomButton
          title="Submit"
          onPress={this.submit}
          buttonType={PRIMARY_BUTTON}
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

function mapStateToProps({ navigation }) {
  return {
    navigation,
  };
}

export default connect(mapStateToProps, { addDeck })(DeckAdd);
