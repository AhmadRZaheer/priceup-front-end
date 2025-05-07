import CommonLayout from '@/components/CommonLayout'
import WineLayoutsComponent from '@/components/WineCellar/Layouts'
import { Box } from '@mui/material'
import React from 'react'

const WineCellarLayouts = () => {
    return (
        <CommonLayout>
            <Box>
                <WineLayoutsComponent />
            </Box>
        </CommonLayout>
    )
}

export default WineCellarLayouts
