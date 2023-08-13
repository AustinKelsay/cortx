import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  middleware: [thunk],
});
