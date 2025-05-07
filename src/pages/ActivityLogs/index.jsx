import ActivityLogsComponent from '@/components/ActivityLogs'
import CommonLayout from '@/components/CommonLayout'
import { useFetchAllDocuments } from '@/utilities/ApiHooks/common'
import { backendURL } from '@/utilities/common'
import { Box, Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const ActivityLogs = () => {
    const { data: logs, isFetching, refetch } = useFetchAllDocuments(`${backendURL}/logs`);
    useEffect(() => {
        refetch();
    }, [])
    return (
        <CommonLayout>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography
                    sx={{ fontSize: 21, fontWeight: "bold", pb: 1 }}
                >
                    Activity Logs
                </Typography>
                <Box>Filter</Box>
            </Box>
            <Card sx={{ p: 2 }}>
                <Box sx={{ maxHeight: "78vh", overflow: "auto" }}>
                    <ActivityLogsComponent logsData={logs} logsFetching={isFetching} key={'logs-component'} />
                </Box>
            </Card>
        </CommonLayout>
    )
}

export default ActivityLogs