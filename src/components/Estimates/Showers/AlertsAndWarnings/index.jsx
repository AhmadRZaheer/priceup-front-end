import AlertMessage from "@/components/ui-components/AlertMessage";
import { Badge, Box, Button, Popover, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import AlertIcon from "@/Assets/alert-circle.svg";
import { getNotifications } from "@/redux/estimateCalculations";
import { useSelector } from "react-redux";
import "./alertAnimation.scss";
import { severityColor } from "@/utilities/constants";
import { notificationsAvailable } from "@/utilities/common";

const AlertsAndWarnings = ({ openPopoverExternally, setOpenPopover }) => {
  const notifications = useSelector(getNotifications);
  // const [anchorEl, setAnchorEl] = useState(notificationStatus);
  // const handleClickPopover = (event) => {
  //     setAnchorEl(event.target);
  // };
  // const handleClosePopover = () => {
  //     setAnchorEl(null);
  // };
  const buttonRef = useRef(null); // Ref for the button in the child
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const notificationsAvailableStatus = useMemo(() => {
    const response = notificationsAvailable(notifications);
    return response;
  }, [notifications]);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  // Open popover when triggered externally from the parent
  useEffect(() => {    
    if (openPopoverExternally && notificationsAvailableStatus?.count > 0) {
      setIsPopoverOpen(true);
      setTimeout(() => {
        setIsPopoverOpen(false);
        setOpenPopover(false);
      }, 3000);
    }
  }, [openPopoverExternally, notificationsAvailableStatus]);
  // const alertPopoverOpen = Boolean(anchorEl);
  // const alertPopoverid = alertPopoverOpen ? "simple-popover" : undefined;

  return (
    <>
      <Badge
        badgeContent={notificationsAvailableStatus?.count}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            padding: "3px !important",
            color: "#FFFF",
            background: severityColor.ERROR,
            top: "4px",
            right: "2px",
            minWidth: "18px",
            height: "18px",
          },
        }}
      >
        <Button
          ref={buttonRef}
          variant="outlined"
          className={
            notificationsAvailableStatus?.status
              ? "btn btn-animated btn-white"
              : ""
          }
          sx={{
            border: `1px solid ${
              notificationsAvailableStatus?.status
                ? severityColor.DEFAULT
                : "rgba(93, 97, 100, 1)"
            }`,
            p: "5px 8px 5px 8px !important",
            display: "flex",
            gap: 0.5,
            borderRadius: "84px !important",
            alignItems: "center",
            color: notificationsAvailableStatus?.status ? "white" : "black",
            backgroundColor: `${
              notificationsAvailableStatus?.status
                ? severityColor.DEFAULT
                : "white"
            } !important`,
            ":hover": {
              border: `1px solid ${
                notificationsAvailableStatus?.status
                  ? severityColor.DEFAULT
                  : "rgba(93, 97, 100, 1)"
              }`,
            },
          }}
          // aria-describedby={alertPopoverid}
          onClick={togglePopover}
        >
          <img
            width={20}
            height={20}
            src={AlertIcon} // Ensure AlertIcon is imported or defined
            alt="alert yellow logo"
          />
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "14.06px",
              fontFamily: "Roboto, sans-serif !important",
            }}
          >
            View Alerts
          </Typography>
        </Button>
      </Badge>
      <Popover
        // id={alertPopoverid}
        open={isPopoverOpen}
        anchorEl={buttonRef.current}
        onClose={togglePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: { borderRadius: "8px" },
        }}
      >
        {notificationsAvailableStatus?.status ? (
          <Box
            sx={{
              p: "8px",
              maxHeight: "441px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {Object.entries(notifications).map(([key, value]) => {
              if (
                [
                  "glassAddonsNotAvailable",
                  "hardwareAddonsNotAvailable",
                  "wallClampNotAvailable",
                  "sleeveOverNotAvailable",
                  "glassToGlassNotAvailable",
                  "cornerWallClampNotAvailable",
                  "cornerSleeveOverNotAvailable",
                  "cornerGlassToGlassNotAvailable",
                ].includes(key)
              ) {
                return value?.map((item) => {
                  if (item.status) {
                    return (
                      <AlertMessage
                        key={item.message}
                        title={item.message}
                        alertMessage={item.message}
                        varient={item.variant}
                      />
                    );
                  }
                  return null;
                });
              } else {
                if (value.status) {
                  return (
                    <AlertMessage
                      key={value.message}
                      title={value.message}
                      alertMessage={value.message}
                      varient={value.variant}
                    />
                  );
                }
              }
              return null;
            })}
          </Box>
        ) : (
          <Box
            sx={{
              p: "8px",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "441px",
            }}
          >
            <Typography sx={{ fontSize: "20px", color: "#cccc" }}>
              No alerts and warnings.
            </Typography>
          </Box>
        )}
      </Popover>
    </>
  );
};

export default AlertsAndWarnings;
