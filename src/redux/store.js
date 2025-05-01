import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    filters: filtersReducer,
  },
});
