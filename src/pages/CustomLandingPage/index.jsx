import CustomizeLandingPage from '@/components/CustomizeLandingPage'
import { useFetchAllDocuments } from '@/utilities/ApiHooks/common';
import { backendURL } from '@/utilities/common';
import { Box } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';

const CustomLandingPage = () => {
  const { id } = useParams();
  const {
    data: selectedData,
    refetch: refetchData,
    isFetching,
    isFetched ,
  } = useFetchAllDocuments(`${backendURL}/projects/all-estimate/${id}`);
  return (
    <Box sx={{ background: "#FFFFFF" }}>
       <CustomizeLandingPage selectedData={selectedData} refetchData={refetchData}  isFetched={isFetched} isFetching={isFetching} />
    </Box>
  )
}

export default CustomLandingPage
