import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR,
  BUTTON_PRIMARY_TEXT_COLOR,
  BUTTON_SECONDARY_TEXT_COLOR,
} from "../res/colors";
import { PRIMARY_BUTTON } from "../utils/constants";

class CustomButton extends Component {
  render() {
    const { title, onPress, buttonColor } = this.props;
    let myStyleSheet = StyleSheetWithProps(buttonColor);

    return (
      <View style={myStyleSheet.container}>
        <TouchableOpacity
          onPress={onPress}
          style={
            Platform.OS === "ios"
              ? myStyleSheet.iosSubmitBtn
              : myStyleSheet.AndroidSubmitBtn
          }
        >
          <Text style={myStyleSheet.text}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function StyleSheetWithProps(buttonColor) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      color: BUTTON_PRIMARY_TEXT_COLOR,
    },
    iosSubmitBtn: {
      backgroundColor: buttonColor,
      padding: 10,
      borderRadius: 5,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
    },
    AndroidSubmitBtn: {
      backgroundColor: buttonColor,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 5,
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default CustomButton;
