// useWebSocket.ts

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  initializeWebSocket,
  disconnectWebSocket,
} from "@/store/WebsocketSlice/WebsocketSlice";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeWebSocket());

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);
};
