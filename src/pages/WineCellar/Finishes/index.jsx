import CommonLayout from '@/components/CommonLayout'
import WineFinishComponent from '@/components/WineCellar/Finishes'
import { Box } from '@mui/material'
import React from 'react'

const WineCellarFinishes = () => {
  return (
    <CommonLayout>
      <Box>
        <WineFinishComponent />
      </Box>
    </CommonLayout>
  )
}

export default WineCellarFinishes
