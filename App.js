import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import useNostr from "./hooks/useNostr";
import { Provider } from "react-redux";
import Streams from "./components/streams";
import { store } from "./redux/store";

const initialRelays = [
  "wss://nostrue.com/",
  "wss://relay.damus.io/",
  "wss://relay.nostr.band/",
  "wss://relay.snort.social/",
  "wss://nostr21.com/",
  // "wss://nos.lol/",
  // "wss://relay.primal.net/",
];

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  const {
    updateRelays,
    subscribeToEvents,
    publishEvent,
    relayStatuses,
    getRelayStatuses,
  } = useNostr(initialRelays);

  useEffect(() => {
    const subscription = subscribeToEvents([
      {
        kinds: [30311],
        limit: 10,
      },
    ]);

    return () => {
      subscription.unsub(); // Cleanup: unsubscribe when the component is unmounted
    };
  }, [subscribeToEvents]);

  console.log(relayStatuses);

  return (
    <View style={styles.container}>
      <Streams />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "ghostwhite",
    alignItems: "center",
    justifyContent: "center",
  },
});
