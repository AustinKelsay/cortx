import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const Streams = () => {
  const events = useSelector((state) => state.events.events);

  return (
    <View style={styles.container}>
      {events.map((ev) => {
        return (
          <Text style={styles.text} key={ev.sig}>
            {JSON.stringify(ev)}
          </Text>
        );
      })}
    </View>
  );
};

export default Streams;

const styles = StyleSheet.create({
  container: {
    maxWidth: "60%",
    backgroundColor: "black",
    color: "ghostwhite",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "ghostwhite",
  },
});
