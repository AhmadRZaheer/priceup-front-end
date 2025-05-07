import { Box, Typography } from '@mui/material'
import React from 'react'

const DataNotFound = ({title}) => {
  return (
    <Box sx={{ height: "395px", alignContent: "center" }}>
    <Typography
      sx={{
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "24.59px",
        fontFamily: '"Manrope", sans-serif !important',
        textAlign: "center",
      }}
    >
      No {title} Record found!
    </Typography>
  </Box>
  )
}

export default DataNotFound
