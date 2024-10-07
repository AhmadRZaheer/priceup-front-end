import { useEffect } from "react";
import { socketIoChannel } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { socketClient } from "@/configs/socket";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, getDecryptedToken } from "../common";
import {
  setNotificationsList,
  setUnreadCount,
} from "@/redux/notificationsSlice";
import { getNotificationsRefetch } from "@/redux/refetch";

export const Notifications = () => {
  const routePrefix = `${backendURL}/notifications`;
  const decryptedToken = getDecryptedToken();
  const refetchNotificationsCount = useSelector(getNotificationsRefetch);
  const dispatch = useDispatch();
  const { data, refetch: refetchNotifications } =
    useFetchAllDocuments(routePrefix);
  useEffect(() => {
    if (data) {
      dispatch(setNotificationsList(data.notifications));
      dispatch(setUnreadCount(data.unReadCount));
    }
  }, [data]);

  useEffect(() => {
    if (decryptedToken) {
      refetchNotifications();
    }
  }, [decryptedToken, refetchNotificationsCount]);

  // Setup socket listener for notifications
  useEffect(() => {
    const handleNotification = (msg) => {
      console.log("notification received", msg);
      if (decryptedToken && msg) {
        refetchNotifications();
      }
    };

    socketClient.on(socketIoChannel.NOTIFICATIONS, handleNotification);

    return () => {
      socketClient.off(socketIoChannel.NOTIFICATIONS, handleNotification);
    };
  }, [decryptedToken, socketClient]);
  return null;
};
