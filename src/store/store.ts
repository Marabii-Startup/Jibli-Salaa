import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "./WebsocketSlice/WebsocketSlice";

export const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
