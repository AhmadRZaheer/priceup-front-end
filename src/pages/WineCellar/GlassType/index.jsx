import CommonLayout from '@/components/CommonLayout'
import WineGlassTypeComponent from '@/components/WineCellar/GlassType'
import { Box } from '@mui/material'
import React from 'react'

const WineCellarGlassType = () => {
    return (
        <CommonLayout>
            <Box>
                <WineGlassTypeComponent />
            </Box>
        </CommonLayout>
    )
}

export default WineCellarGlassType
