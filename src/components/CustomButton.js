import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { BUTTON_PRIMARY_TEXT_COLOR } from "../res/colors";

class CustomButton extends Component {
  render() {
    const { title, onPress, buttonColor, disabled } = this.props;
    let myStyleSheet = StyleSheetWithProps(buttonColor);

    return (
      <View style={myStyleSheet.container}>
        <Pressable
          onPress={onPress}
          style={
            Platform.OS === "ios"
              ? myStyleSheet.iosSubmitBtn
              : myStyleSheet.AndroidSubmitBtn
          }
          disabled={disabled ? disabled : false}
        >
          <Text style={myStyleSheet.text}>{title}</Text>
        </Pressable>
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
