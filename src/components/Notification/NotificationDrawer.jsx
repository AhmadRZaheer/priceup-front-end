import { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography, Checkbox, CircularProgress } from "@mui/material";
import SingleNotificationItem from "./SingleNotificationItem";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsList, getUnreadCount, setNotificationsList, setUnreadCount } from "@/redux/notificationsSlice";
import { useEditDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { setNotificationsRefetch } from "@/redux/refetch";
import { useNavigate } from "react-router-dom";

export default function NotificationDrawer({ state, toggleDrawer }) {
  const routePrefix = `${backendURL}/notifications`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationsList = useSelector(getNotificationsList);
  const unReadCount = useSelector(getUnreadCount);
  const { mutateAsync: markAllAsRead, isLoading: editLoading, isSuccess: editSuccess } =
    useEditDocument();
  console.log(notificationsList, 'list');
  const list = useMemo(() => {
    return notificationsList ? notificationsList : [];
  }, [notificationsList]);

  const handleCheckboxChange = async (event) => {
    if (event.target.checked) {
      console.log('checked');
      await markAllAsRead({ data: {}, apiRoute: `${routePrefix}/mark-all-as-read` });
      dispatch(setNotificationsRefetch);
    }
    else {
      console.log('not checked');
    }
  }
  const handleItemClick = (activeTab = 'Activity', id) => {
    navigate(`/notification?tab=${activeTab}&id=${id}`);
  }
  return (
    <div>
      <SwipeableDrawer
        className="customModel"
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiDrawer-paper": {
            top: { sm: "75px", xs: '57px' },
          },
          "& .MuiModal-backdrop": {
            top: "74px",
            left: "304px",
          },
        }}
      >

        <Box
          className="customModel"
          sx={{ width: { sm: "496px", xs: "100%" } }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", px: 2, mt: { sm: 5, xs: 3 } }}
          >
            <Stack direction="row" gap={1}>
              <Typography className="notificationText">
                Notifications
              </Typography>
              <Box sx={{ alignContent: "center" }}>
                <NotificationsNoneIcon />
              </Box>
            </Stack>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon className="closeIcon" />
            </IconButton>
          </Stack>
          <Stack direction="row" sx={{ pt: 2, pb: 1, px: 2, justifyContent: 'space-between' }}>
            <Typography className="todayText">Earlier</Typography>
            <Stack direction="row" gap={0.5}>
              {editLoading ? <CircularProgress size={24} sx={{ color: "#8477DA" }} /> : unReadCount > 0 ? <Checkbox
                onChange={handleCheckboxChange}
                sx={{
                  padding: "0px !important",
                  color: "rgba(0, 0, 0, 0.49)",
                  "&.Mui-checked": {
                    color: "rgba(0, 0, 0, 0.49)",
                  },
                }}
              /> : ''}
              <Typography className="archText">{unReadCount > 0 ? 'Mark all as read' : 'No new message'}</Typography>
            </Stack>
          </Stack>
          <Box
            className="drawerContainer"
            sx={{
              mb: 2,
            }}
          >
            {list.map((data, index) => (
              <SingleNotificationItem handleItemClick={handleItemClick} data={data} key={index} />
            ))}
          </Box>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
