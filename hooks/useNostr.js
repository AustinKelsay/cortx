import { useState, useEffect, useRef } from "react";
import { SimplePool } from "nostr-tools";
import { useDispatch } from "react-redux";
import { setEvents } from "../redux/reducers/eventsReducer";

const useNostr = (initialRelays) => {
  const [relays, setRelays] = useState(initialRelays);
  const [relayStatuses, setRelayStatuses] = useState({});

  const dispatch = useDispatch();

  const pool = useRef(new SimplePool());
  const subscriptions = useRef([]);

  const getRelayStatuses = () => {
    if (pool.current && pool.current._conn) {
      const statuses = {};

      for (const url in pool.current._conn) {
        const relay = pool.current._conn[url];
        statuses[url] = relay.status; // Assuming 'status' is an accessible field in Relay object
      }

      setRelayStatuses(statuses);
    }
  };

  const updateRelays = (newRelays) => {
    // Set new relays
    setRelays(newRelays);

    // Update the pool
    pool.current.addRelays(newRelays);
  };

  const subscribeToEvents = (criteria) => {
    const sub = pool.current.sub(relays, criteria);
    sub.on("event", (event) => {
      dispatch(setEvents(event));
    });

    subscriptions.current.push(sub); // store the subscription
    return sub;
  };

  const publishEvent = async (event) => {
    const pubs = await pool.current.publish(relays, event);
    pubs.on("ok", () => {
      console.log("Event accepted by a relay");
    });
    pubs.on("failed", (reason) => {
      console.log(`Failed to publish: ${reason}`);
    });
  };

  useEffect(() => {
    getRelayStatuses(); // Get initial statuses on mount
    return () => {
      // Unsubscribe from all subscriptions
      subscriptions.current.forEach((sub) => sub.unsub());
    };
  }, []);

  return {
    updateRelays,
    subscribeToEvents,
    publishEvent,
    relayStatuses, // Expose the relay statuses
    getRelayStatuses, // Expose the function to fetch/refetch statuses
  };
};

export default useNostr;
