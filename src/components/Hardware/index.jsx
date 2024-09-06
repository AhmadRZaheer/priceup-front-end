
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
import HardwareTable from "./HardwareTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddEditHardware from "../Modal/addEditHardware";
import AddEditModelHardware from "../Modal/AddEditModelHardware";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";


const ShowersHardWare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("slug");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const { data: hardwareCategoryData, refetch: refetchAllCategory } = useFetchAllDocuments(`${backendURL}/hardwareCategory`);
  const { data: hardwareData, isFetching: hardwareFetching, refetch: hardwareRefetch } = useFetchAllDocuments(`${backendURL}/hardwares/category/${selectedCategory}`);
  const [selectedHardwareName, setSelectedHardwareName] = useState('');
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

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value.slug);
    navigate(`/hardware?slug=${event.target.value.slug}`)
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory.length && hardwareCategoryData?.length) {
      const record = hardwareCategoryData?.find((item) => item.slug === selectedCategory);
      setSelectedHardwareName(record?.name);
      hardwareRefetch();
      setPageLoading(false);
    }
  }, [selectedCategory, hardwareCategoryData])
  useEffect(() => {
    refetchAllCategory();
  }, []);
  useEffect(() => {
    setSelectedCategory(categorySlug || 'handles');
  }, [categorySlug])
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
        <Box sx={{ display: "flex", gap: "12px", }}>
          <Typography
            className='headingTxt'
            sx={{
              color: "#5D6164",
              display: 'flex'
            }}
          >
            Shower &nbsp;
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
              value={selectedCategory}
              size="small"
              labelId="demo-select-small-label"
              id="demo-select-small"
              sx={{
                height: "40px", background: "#F6F5FF", '.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                  pr: '0px !important',
                },
                '.MuiOutlinedInput-input': {
                  p: '10px !important'
                }
              }}
              onChange={handleChangeCategory}
              displayEmpty
              renderValue={(value) => {
                const selectedItem = hardwareCategoryData?.find(item => item?.slug === value);
                return <Typography sx={{
                  fontSize: "14px",
                  fontFamily: '"Roboto", sans-serif !important',
                  color: '#000000',
                  textOverflow: 'ellipsis', overflow: 'hidden',
                  textWrap: 'nowrap',
                  pt:'2px'
                }}>{selectedItem?.name}</Typography>;
              }}
            >
              {hardwareCategoryData?.map((data, index) => (
                <MenuItem key={index} value={data} sx={{
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
                    {data?.slug === selectedCategory ? (
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
          <Typography className="handleTitle">{selectedHardwareName}</Typography>
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
          {hardwareFetching || pageLoading ? (
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
              No Hardware Found
            </Typography>
          ) : hardwareData.map((data, index) => (
            <HardwareTable data={data} key={index} refetchData={hardwareRefetch} selectedSlug={selectedCategory} />
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
        categorySlug={selectedCategory}
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
