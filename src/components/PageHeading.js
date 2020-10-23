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
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 2,
    fontWeight: "700",
    fontSize: 16,
  },
});

export default PageHeading;
