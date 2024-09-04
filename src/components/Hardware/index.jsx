
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.scss";
import CheckIcon from "@mui/icons-material/Check";
import { backendURL } from "@/utilities/common";
import { useFetchDatahardware, useFetchDatahardwareCategory } from "../../utilities/ApiHooks/hardware";
import HardwaerTable from "./HardwaerTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddEditHardware from "../Modal/addEditHardware";
import AddEditModelHardware from "../Modal/AddEditModelHardware";


const ShowersHardWare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get("slug");
  const { data: hardwareCategoryData, refetch: refetchAllCategory, } = useFetchDatahardwareCategory()
  const [selectedlayoutSlug, setSelectedLayoutSlug] = useState(layoutId ?? 'handles');
  
  //Edit
  const [openModel, setOpenModel] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleCloseModel = () => {
    setOpenModel(false);
  };
  const handleOpenModel = (data) => {
    setOpenModel(true);
    setIsEdit(false);
  };

  const {
    data: hardwareData,
    isFetching: hardwareFetching,
    refetch: hardwareRefetch,
  } = useFetchDatahardware(selectedlayoutSlug);

  const handleChangeLayout = (event) => {
    setSelectedLayoutSlug(event.target.value);
    navigate(`/hardware?slug=${event.target.value}`)
  };

  useEffect(() => {
    hardwareRefetch();
  }, [selectedlayoutSlug])
  useEffect(() => {
    refetchAllCategory();
  }, [])
  // const handleStatusChange = ({ id, data }) => {
  //   const updatedData = data?.map(item =>
  //     item._id === id ? { ...item, status: !item.status } : item
  //   );
  //   setStatus(updatedData);
  // };
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px",}}>
          <Typography
            className='headingTxt'
            sx={{
              color: "#5D6164",
              display: 'flex'
            }}
          >
            Showers &nbsp;
            <Box
              className='headingTxt'
              sx={{
                color: "#000000",
              }}
            >
              / Hardware
            </Box>
          </Typography>

          <FormControl
            sx={{ width: "212px" }}
            size="small"
            className="custom-textfield"
          >
            <Select
              value={selectedlayoutSlug}
              size="small"
              labelId="demo-select-small-label"
              id="demo-select-small"
              sx={{ height: "40px", background: "#F6F5FF", }}
              onChange={handleChangeLayout}
              displayEmpty
              renderValue={(value) => {
                const selectedItem = hardwareCategoryData?.find(item => item?.slug === value);
                return <Typography sx={{ fontSize: "14px", textOverflow: 'ellipsis', overflow: 'hidden', textWrap: 'nowrap' }}>{selectedItem?.name}</Typography>;
              }}
            >
              {hardwareCategoryData?.map((data, index) => (
                <MenuItem key={index} value={data?.slug} sx={{
                  p: '10px 12px', ':hover': {
                    background: '#EFF2F6'
                  }
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: '10px'
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {data?.name}
                    </Typography>
                    {data?.slug === selectedlayoutSlug ? (
                      <CheckIcon sx={{ color: "#8477DA" }} />
                    ) : null}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 1.5,
            pb: 1.5,
          }}
        >
          <Typography className="handleTitle">Handles</Typography>
          <Button
            variant="contained"
            onClick={handleOpenModel}
            sx={{
              background: "#8477DA",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '0px',
              ':hover': {
                background: "#8477DA",
              }
            }}
          >
            Add New
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {hardwareFetching ? (
            <Box
              sx={{
                width: 40,
                m: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxHeight: "70vh",
                minHeight: "20vh",
              }}
            >
              <CircularProgress sx={{
                width: "100%", '.MuiDataGrid-virtualScroller': {
                  overflow: "hidden !important",
                }
              }} />
            </Box>
          ) : hardwareData && hardwareData?.length <= 0 ? (
            <Typography sx={{ color: "#667085", p: 2, textAlign: "center", background: '#FFFF' }}>
              No Hardwear Found
            </Typography>
          ) : hardwareData.map((data, index) => (
            <HardwaerTable data={data} key={index} refetchData={hardwareRefetch} selectedSlug={selectedlayoutSlug} loading={hardwareFetching} />
          ))
          }

        </Box>
      </Box>
      <AddEditModelHardware
        open={openModel}
        close={handleCloseModel}
        data={edit}
        isEdit={isEdit}
        refetch={hardwareRefetch}
        categorySlug={selectedlayoutSlug}
      />

      {/* <ShowerHardwareModel open={openAddModal}
        close={() => setOpenAddModal(false)}
        recordToModify={recordToModify} />

      <ShowerHardwareModel open={openModifyModal}
        close={() => setOpenModifyModal(false)}
        recordToModify={true} /> */}
    </>
  );
};

export default ShowersHardWare;
