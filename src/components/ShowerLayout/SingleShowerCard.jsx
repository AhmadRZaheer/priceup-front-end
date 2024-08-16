import React from 'react'
import './style.scss';
import { Box } from '@mui/material';
import image from '../../Assets/dummy.png'

const SingleShowerCard = () => {
  return (
    <Box
    sx={{
      width: {lg:"448px", xs: "600px"},
      borderRadius: "8px",
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      padding: "16px",
      backgroundColor: "white",
    }}
  >
   <Box sx={{display:'flex'}}>
    <img src={image} alt='/' style={{width:'59.99px',height:'79px'}} />
    <p className='cardTitle'>Doors</p>
   </Box>
  </Box>
  )
}

export default SingleShowerCard
