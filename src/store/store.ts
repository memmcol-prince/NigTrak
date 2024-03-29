import { configureStore } from "@reduxjs/toolkit";
import deviceSlice from "./devicesReducer";
import offlineSlice from "./offlineReducer";
import rankSlice from "./ranksReducer";
import socketDeviceSlice from "./socketDevicesReducer";

const store = configureStore({
  reducer: {
    socketDevices: socketDeviceSlice.reducer,
    devices: deviceSlice.reducer,
    ranks: rankSlice.reducer,
    offline: offlineSlice.reducer,
  },
});

export default store;
export const sockeDeviceActions = socketDeviceSlice.actions;
export const deviceActions = deviceSlice.actions;
export const rankActions = rankSlice.actions;
export const offlineActions = offlineSlice.actions;
