import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { CARD_BORDER } from "../res/colors";

class CustomCard extends Component {
  render() {
    const { title, onPress, buttonColor } = this.props;

    return <View style={styles.deck}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  deck: {
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
});

export default CustomCard;
