import React from 'react'
import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import Notifications from '@/components/Notification';

const Notification = () => {
  return (
   <Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <Notifications />
        </Box>
    </Box>
  )
}

export default Notification