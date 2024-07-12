import { Badge, Box, Grid, Typography, Stack, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import TabButton from "@/components/ui-components/TabButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./style.scss";
import { ActivitySection } from "./Activity";
import { ArchiveSection } from "./Archive";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsList } from "@/redux/notificationsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteDocument } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { setNotificationsRefetch } from "@/redux/refetch";

const tabData = [
  { id: 1, title: "Activity" },
  { id: 2, title: "Archive" },
];
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Notifications = () => {
  const routePrefix = `${backendURL}/notifications`;
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(query.get('tab') ?? "Activity");
  const notificationsList = useSelector(getNotificationsList);
  const { mutateAsync: deleteNotifications, isLoading: deleteLoading, isSuccess: deleteSuccess } =
    useDeleteDocument();
  const activitySectionList = useMemo(() => {
    const result = notificationsList?.filter((item) => !item.archived);
    return result ? result : [];
  }, [notificationsList]);
  const archiveSectionList = useMemo(() => {
    const result = notificationsList?.filter((item) => item.archived);
    return result ? result : [];
  }, [notificationsList])
  const handleTabSwitch = (data) => {
    setSelected(data);
    navigate(`/notification?tab=${data}`);
  };
  const handClearClick = async () => {
    if (selected === 'Activity') {
      await deleteNotifications({ apiRoute: `${routePrefix}/delete-all` });
    }
    else {
      await deleteNotifications({ apiRoute: `${routePrefix}/delete-all-archived` });
    }
    dispatch(setNotificationsRefetch());
  }
  return (
    <Box>
      {/* <TopBar /> */}
      <Grid sx={{ pt: 3, pb: 2, background: "#FFFFFF", px: 4 }}>
        <Stack direction="row" gap={1} sx={{ pt: 9 }}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 500,
              lineHeight: "38px",
              color: "#101828",
            }}
          >
            Notifications
          </Typography>
          <Box sx={{ alignContent: "center" }}>
            <Badge
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  minWidth: "6px",
                  height: "6px",
                  background: "#FF6174",
                  top: "2px",
                  right: "6px",
                },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </Box>
        </Stack>
      </Grid>
      <Stack direction='row' sx={{ borderBottom: "1px solid #D9D9D9", px: 4, justifyContent: 'space-between' }}>
        <Stack direction='row'>
          {tabData.map((data, index) => (
            <TabButton
              key={index}
              title={data.title}
              onClick={() => handleTabSwitch(data.title)}
              selected={data.title === selected ? true : false}
              sx={{ mr: 3 }}
            />
          ))}
        </Stack>
        <Button
          onClick={handClearClick}
          disabled={deleteLoading || (selected === 'Activity' && !activitySectionList?.length) || (selected === 'Archive' && !archiveSectionList?.length)}
          variant="contained"
          startIcon={<DeleteOutlineOutlinedIcon />}
          className="estimatebtn"
          sx={{
            py: 1,
            ":hover": {
              background: "#8477DA",
            },
          }}
        >
          Clear Log
        </Button>
      </Stack>
      {selected === "Activity" ? (
        <ActivitySection data={activitySectionList} />
      ) : (
        <ArchiveSection data={archiveSectionList} />
      )}
    </Box>
  );
};

export default Notifications;
