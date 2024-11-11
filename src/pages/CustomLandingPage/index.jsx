import CustomizeLandingPage from '@/components/CustomizeLandingPage'
import { setListData } from '@/redux/estimateCalculations';
import { setLocationInfo } from '@/redux/locationSlice';
import { setMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import { setWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import { useFetchAllDocuments } from '@/utilities/ApiHooks/common';
import { backendURL } from '@/utilities/common';
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const CustomLandingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data,
    refetch: refetchData,
    isFetching,
    isFetched ,
  } = useFetchAllDocuments(`${backendURL}/invoice-preview/${id}`);

  useEffect(()=>{
    if(id){
      refetchData();
    }   
  },[id])

  useEffect(() => {
    if (data?.location) {
      dispatch(setLocationInfo(data?.location));
    }
    if (data?.mirrorsHardware) {
      dispatch(setMirrorsHardware(data?.mirrorsHardware ));
    }
    if (data?.showersHardware) {
      dispatch(setListData(data?.showersHardware));
    }
    if (data?.wineCellarsHardware) {
      dispatch(setWineCellarsHardware(data?.wineCellarsHardware));
    }
  }, [data?.location,data?.mirrorsHardware,data?.showersHardware,data?.wineCellarsHardware]);

  console.log(data,'selectedDataselectedData333')
  return (
    <Box sx={{ background: "#FFFFFF" }}>
       <CustomizeLandingPage
        selectedData={data?.estimatesList} refetchData={refetchData}  isFetched={isFetched} isFetching={isFetching} 
        />
    </Box>
  )
}

export default CustomLandingPage
