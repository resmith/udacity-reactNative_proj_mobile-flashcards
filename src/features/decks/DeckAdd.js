import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

// Redux
import { connect } from "react-redux";
import { addDeck } from "../../redux/decks/deckActions";
import { convertTitleToKey } from "../../utils/helpers";
import { getDeckList } from "../../redux/decks/deckSelectors";

// App
import CustomButton from "../../components/CustomButton";
import InputLabel from "../../components/InputLabel";
import { BUTTON_PRIMARY_COLOR } from "../../res/colors";

class DeckAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "", duplicateDeckid: false };
  }

  submit = () => {
    const { deckIds } = this.props;
    const newDeckTitle = this.state.input;
    const newDeckId = convertTitleToKey(newDeckTitle);

    if (!deckIds.includes(newDeckId)) {
      this.setState({ duplicateDeckid: false });
      this.props.addDeck(newDeckTitle);
      this.props.navigation.navigate("DeckView", {
        id: newDeckId,
      });
      this.setState({ input: "" });
    } else {
      this.setState({ duplicateDeckid: true });
    }
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
          buttonColor={BUTTON_PRIMARY_COLOR}
        />
        {this.state.duplicateDeckid ? (
          <Text style={styles.error}>Duplicate Deck Title</Text>
        ) : null}
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
  error: {
    paddingTop: 10,
    color: "red",
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
  const deckIds = getDeckList(state);
  return { deckIds };
};

export default connect(mapStateToProps, { addDeck })(DeckAdd);
