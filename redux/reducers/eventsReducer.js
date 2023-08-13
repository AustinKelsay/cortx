import { createSlice } from "@reduxjs/toolkit";

export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
  },
  reducers: {
    setEvents: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.events = [...state.events, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
