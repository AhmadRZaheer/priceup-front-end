import CommonLayout from '@/components/CommonLayout'
import WineGlassAddonComponent from '@/components/WineCellar/GlassAddon'
import { Box } from '@mui/material'
import React from 'react'

const WineCellarGlassAddon = () => {
  return (
    <CommonLayout>
      <Box>
        <WineGlassAddonComponent />
      </Box>
    </CommonLayout>
  )
}

export default WineCellarGlassAddon
