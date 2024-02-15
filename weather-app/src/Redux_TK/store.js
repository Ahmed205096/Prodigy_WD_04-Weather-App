import { configureStore } from "@reduxjs/toolkit";
import WeatherReducer from "./Slice/WeatherReducer";

export const store = configureStore({
  reducer: {
    country: WeatherReducer,
  },
});
