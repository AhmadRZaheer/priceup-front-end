import { FiberManualRecord } from '@mui/icons-material'
import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const ActivityLogs = ({ logsFetching, logsData }) => {
    const getHumanReadableDate = (date) => {
        const newDate = new Date(date);
        const formattedDateTime = newDate.toLocaleString("en-US", {
            weekday: "long", // Full weekday name
            month: "long", // Full month name
            day: "numeric", // Numeric day
            year: "numeric", // Full year
            hour: "numeric", // Hour
            minute: "2-digit", // Minute
            hour12: true, // 12-hour format
        });
        return formattedDateTime;
    };
    return (
        <>
            {logsFetching ? (
                <Box
                    sx={{
                        height: "200px",
                        alignContent: "center",
                        textAlign: "center",
                    }}
                >
                    <CircularProgress
                        size={30}
                        sx={{ color: "#8477DA" }}
                    />
                </Box>
            ) : logsData?.length > 0 ? (
                logsData?.map((data, index) => (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                        }}
                    >
                        <FiberManualRecord
                            sx={{ color: "#8477DA", fontSize: "15px" }}
                        />
                        <Typography sx={{ fontSize: 16 }} key={index}>
                            {data?.title +
                                getHumanReadableDate(data?.createdAt)}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography
                    sx={{
                        fontSize: 16,
                        pb: 1,
                        height: "200px",
                        alignContent: "center",
                        textAlign: "center",
                    }}
                >
                    No Activity Log Found!
                </Typography>
            )}</>
    )
}

export default ActivityLogs