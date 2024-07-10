import { useEffect } from "react";
import { socketIoChannel } from "../constants";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useDispatch } from "react-redux";
import { socketClient } from "../../configs/socket";

export const Notifications = () => {
  //   const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    socketClient.on(socketIoChannel.NOTIFICATIONS, (data) => {
      console.log("notification received", data);
      dispatch(
        showSnackbar({
          message: data,
          severity: "success",
        })
      );
      //   setNotifications((prev) => [...prev, data]);
    });
    return () => {
      socketClient.disconnect();
    };
  }, [socketClient]);
  return null;

  //   return (
  //     <div>
  //       <h1>Real-time Notifications</h1>
  //       <ul>
  //         {notifications.map((notification, index) => (
  //           <li key={index}>{notification}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
};
