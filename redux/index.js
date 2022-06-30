import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  // reducer in uiSlice cartSlice
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
