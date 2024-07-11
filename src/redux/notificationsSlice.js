import { createSlice } from "@reduxjs/toolkit";
export const getNotifications = (state) =>
  state.notifications.notificationsList;
export const getUnreadCount = (state) => state.notifications.unReadCount;

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    unReadCount: 0,
    notificationsList: [],
  },
  reducers: {
    setNotificationsList: (state, action) => {
      state.notificationsList = action.payload;
    },
    setUnreadCount: (state, action) => {
      state.unReadCount = action.payload;
    },
  },
});
export const { setNotificationsList, setUnreadCount } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
