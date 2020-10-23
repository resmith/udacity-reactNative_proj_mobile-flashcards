import React from "react";
import { View, Text, StyleSheet } from "react-native";

function PageHeading({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
  },
});

export default PageHeading;
