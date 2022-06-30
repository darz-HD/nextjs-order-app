import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    // when toggle make the state cartIsVisible opposite of what it was
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    // when setNotification make the state notification
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
// export uiSlice.actions toggle
export const uiActions = uiSlice.actions;

export default uiSlice;
