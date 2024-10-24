import CommonLayout from '@/components/CommonLayout'
import WineHardwareComponent from '@/components/WineCellar/Hardware'
import { Box } from '@mui/material'
import React from 'react'

const WineCellarHardware = () => {
    return (
        <CommonLayout>
            <Box>
                <WineHardwareComponent />
            </Box>
        </CommonLayout>
    )
}

export default WineCellarHardware
