import { createSlice } from "@reduxjs/toolkit";

const WeatherReducer = createSlice({
  name: "WeatherReducer",
  initialState: {},
  reducers: {
    setWeatherCountry: (state, action) => {
      return action.payload;
    },
  },
});


export const { setWeatherCountry } = WeatherReducer.actions;
export default WeatherReducer.reducer;