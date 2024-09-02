import AlertMessage from "@/components/ui-components/AlertMessage";
import { Box, Button, Popover, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import AlertIcon from "@/Assets/alert-circle.svg";
import { useSelector } from "react-redux";
import { getNotifications } from "@/redux/mirrorsEstimateSlice";

const AlertsAndWarnings = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const notifications = useSelector(getNotifications);

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const alertPopoverOpen = Boolean(anchorEl);
    const alertPopoverid = alertPopoverOpen ? "simple-popover" : undefined;
    const notificationsAvailableStatus = useMemo(() => {
        for (const [key, value] of Object.entries(notifications)) {
            if (
                [
                    "glassAddonsNotAvailable", "hardwaresNotAvailable"
                ].includes(key)
            ) {
                for (const item of value) {
                    if (item.status) {
                        return true;
                    }
                }
            } else {
                if (value.status) {
                    return true;
                }
            }
        }
        return false;
    }, [notifications]);

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    border: "1px solid rgba(93, 97, 100, 1)",
                    p: "5px 8px 5px 8px !important",
                    display: "flex",
                    gap: 0.5,
                    borderRadius: "84px !important",
                    alignItems: "center",
                    color: "black",
                    ":hover": {
                        border: "1px solid rgba(93, 97, 100, 1)",
                    },
                }}
                aria-describedby={alertPopoverid}
                onClick={handleClickPopover}
            >
                <img
                    width={20}
                    height={20}
                    src={AlertIcon} // Ensure AlertIcon is imported or defined
                    alt="alert yellow logo"
                />
                <Typography sx={{ fontSize: "12px", lineHeight: "14.06px", fontFamily: 'Roboto, sans-serif !important' }}>
                    View Alerts
                </Typography>
            </Button>
            <Popover
                id={alertPopoverid}
                open={alertPopoverOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
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
                {notificationsAvailableStatus ?
                    <Box sx={{ p: "8px", maxHeight: "441px", overflow: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {Object.entries(notifications).map(([key, value]) => {
                            if (
                                [
                                    "glassAddonsNotAvailable", "hardwaresNotAvailable"
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
                    </Box> : <Box sx={{ p: "8px", height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '441px' }}>
                        <Typography sx={{ fontSize: '20px', color: '#cccc' }}>No alerts and warnings.</Typography>
                    </Box>}
            </Popover>
        </>
    );
};

export default AlertsAndWarnings;
