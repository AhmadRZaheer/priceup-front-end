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
import CheckIcon from "@mui/icons-material/Check";
import WineHardwareTable from "./WineHardwareTable";
import AddEditWineHardwareModel from "@/components/Modal/AddEditModelWineHardware";
import { backendURL } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { useNavigate, useSearchParams } from "react-router-dom";

// const hardwareWineData = [
//   {
//     _id: "66d6f8a6a82554091c3f2341",
//     name: "Google ddd",
//     slug: "google-ddd",
//     image: "images/hardwares/uploads/1725364388791-2024-03-11.png",
//     operableTransom: false,
//     hardware_category_slug: "handles",
//     oneInchHoles: null,
//     hingeCut: null,
//     clampCut: null,
//     notch: null,
//     outages: null,
//     company_id: "660507a8a4983e276851dc28",
//     finishes: [
//       {
//         name: "Polished Nickel",
//         image: "images/finishes/polished_nickle.jpeg",
//         partNumber: "1",
//         cost: 0,
//         status: false,
//         finish_id: "660507a8a4983e276851dc2b",
//         _id: "66d6f8a6a82554091c3f2343",
//       },
//       {
//         name: "Brushed Nickel",
//         image: "images/finishes/brushed_nickle.jpeg",
//         partNumber: "2",
//         cost: 5,
//         status: true,
//         finish_id: "660507a8a4983e276851dc2f",
//         _id: "66d6f8a6a82554091c3f2344",
//       },
//       {
//         name: "Satin Brass",
//         image: "images/finishes/satin_brass.jpeg",
//         partNumber: "3",
//         cost: 10,
//         status: true,
//         finish_id: "660507a8a4983e276851dc2c",
//         _id: "66d6f8a6a82554091c3f2345",
//       },
//       {
//         name: "Brushed Bronze",
//         image: "images/finishes/brushed_bronze.jpeg",
//         partNumber: "4",
//         cost: 15,
//         status: true,
//         finish_id: "660507a8a4983e276851dc2a",
//         _id: "66d6f8a6a82554091c3f2346",
//       },
//       {
//         name: "Matte Black",
//         image: "images/finishes/matte_black.jpeg",
//         partNumber: "5",
//         cost: 20,
//         status: true,
//         finish_id: "660507a8a4983e276851dc2d",
//         _id: "66d6f8a6a82554091c3f2347",
//       },
//       {
//         name: "Polished Chrome",
//         image: "images/finishes/polished_chrome.jpeg",
//         partNumber: "6",
//         cost: 25,
//         status: true,
//         finish_id: "660507a8a4983e276851dc30",
//         _id: "66d6f8a6a82554091c3f2348",
//       },
//       {
//         name: "Oil Rubbed Bronze",
//         image: "images/finishes/oil_rubbed_bronze.jpeg",
//         partNumber: "7",
//         cost: 30,
//         status: true,
//         finish_id: "660507a8a4983e276851dc2e",
//         _id: "66d6f8a6a82554091c3f2349",
//       },
//     ],
//   },
//   {
//     _id: "77d6f8a6a82554091c3f2342",
//     name: "Example Hardware",
//     slug: "example-hardware",
//     image: "images/hardwares/uploads/example_hardware.png",
//     operableTransom: true,
//     hardware_category_slug: "handles",
//     oneInchHoles: true,
//     hingeCut: true,
//     clampCut: null,
//     notch: null,
//     outages: null,
//     company_id: "770507a8a4983e276851dc29",
//     finishes: [
//       {
//         name: "Antique Gold",
//         image: "images/finishes/antique_gold.jpeg",
//         partNumber: "8",
//         cost: 35,
//         status: true,
//         finish_id: "770507a8a4983e276851dc31",
//         _id: "77d6f8a6a82554091c3f234a",
//       },
//       {
//         name: "Bright Silver",
//         image: "images/finishes/bright_silver.jpeg",
//         partNumber: "9",
//         cost: 40,
//         status: true,
//         finish_id: "770507a8a4983e276851dc32",
//         _id: "77d6f8a6a82554091c3f234b",
//       },
//     ],
//   },
// ];

const WineHardwareComponent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHardwareName, setSelectedHardwareName] = useState("");
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("slug");
  const [openModel, setOpenModel] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const { data: WineCategoryData, refetch: refetchAllCategory } =
    useFetchAllDocuments(`${backendURL}/wineCellars/hardwareCategory`);
  const {
    data: hardwareData,
    isFetching: hardwareFetching,
    refetch: hardwareRefetch,
  } = useFetchAllDocuments(
    `${backendURL}/wineCellars/hardwares/category/${selectedCategory}`
  );

  const handleCloseModel = () => {
    setOpenModel(false);
  };
  const handleOpenModel = (data) => {
    setOpenModel(true);
    setIsEdit(false);
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value.slug);
    setSelectedHardwareName(event.target.value.name);
    navigate(`/wine-cellar/hardwares?slug=${event.target.value.slug}`);
  };
  useEffect(() => {
    setSelectedCategory(categorySlug || "handles");
  }, [categorySlug]);
  useEffect(() => {
    refetchAllCategory();
  }, []);
  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategory.length &&
      WineCategoryData?.length
    ) {
      const record = WineCategoryData?.find(
        (item) => item.slug === selectedCategory
      );
      setSelectedHardwareName(record?.name);
      hardwareRefetch();
      setPageLoading(false);
    }
  }, [selectedCategory, WineCategoryData]);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Typography
            className="headingTxt"
            sx={{
              color: "#5D6164",
              display: "flex",
            }}
          >
            Wine Cellar &nbsp;
            <Box
              className="headingTxt"
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
              className="hardwareSelect"
              sx={{
                height: "40px",
                background: "#F6F5FF",
                ".MuiOutlinedInput-input": {
                  p: "10px !important",
                },
              }}
              onChange={handleChangeCategory}
              displayEmpty
              renderValue={(value) => {
                const selectedItem = WineCategoryData?.find(
                  (item) => item?.slug === value
                );
                return (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontFamily: '"Roboto", sans-serif !important',
                      color: "#000000",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textWrap: "nowrap",
                      pt: "2px",
                    }}
                  >
                    {selectedItem?.name}
                  </Typography>
                );
              }}
            >
              {WineCategoryData?.map((data, index) => (
                <MenuItem
                  key={index}
                  value={data}
                  sx={{
                    p: "10px 12px",
                    ":hover": {
                      background: "#EFF2F6",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: "10px",
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
          <Typography className="handleTitle">
            {selectedHardwareName}
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenModel}
            sx={{
              background: "#8477DA",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: "0px",
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            Add New
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              <CircularProgress
                sx={{
                  width: "100%",
                  ".MuiDataGrid-virtualScroller": {
                    overflow: "hidden !important",
                  },
                }}
              />
            </Box>
          ) : hardwareData && hardwareData?.length <= 0 ? (
            <Typography
              sx={{
                color: "#667085",
                p: 2,
                textAlign: "center",
                background: "#FFFF",
              }}
            >
              No Hardware Found
            </Typography>
          ) : (
            hardwareData.map((data, index) => (
              <WineHardwareTable
                data={data}
                key={index}
                refetchData={hardwareRefetch}
                selectedSlug={selectedCategory}
              />
            ))
          )}
        </Box>
      </Box>
      <AddEditWineHardwareModel
        open={openModel}
        close={handleCloseModel}
        // data={edit}
        isEdit={isEdit}
        refetch={hardwareRefetch}
        categorySlug={selectedCategory}
      />
    </div>
  );
};
export default WineHardwareComponent;
