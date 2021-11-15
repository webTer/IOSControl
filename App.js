import React from "react";
import { StyleSheet, View } from "react-native";
import Control from "./src/Control";

export default function App() {
  return (
    <View style={styles.container}>
      <Control />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
