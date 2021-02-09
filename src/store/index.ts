import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./character";
import episodeReducer from "./episode";
import locationReducer from "./location";

export const store = configureStore({
  reducer: {
    character: characterReducer,
    episode: episodeReducer,
    location: locationReducer,
  }
});
