import React, { useState } from "react";
import { WineFinishesColumns } from "@/utilities/DataGridColumns";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  
} from "@mui/material";
// import Pagination from "../Pagination";
import { ArrowForward, DeleteOutlineOutlined, EditOutlined,  } from "@mui/icons-material";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";

const WineFinishesData = [
  {
      "_id": "660507a8a4983e276851dc2b",
      "name": "Polished Nickel",
      "slug": "polished-nickel",
      "image": "images/finishes/polished_nickle.jpeg",
      "partNumber": "1",
      "holesNeeded": 1,
      "cost": 0,
      "status": false,
      "company_id": "660507a8a4983e276851dc28"
  },
  {
      "_id": "770507a9b5983e276851dc3c",
      "name": "Brushed Bronze",
      "slug": "brushed-bronze",
      "image": "images/finishes/brushed_bronze.jpeg",
      "partNumber": "2",
      "holesNeeded": 2,
      "cost": 5,
      "status": true,
      "company_id": "770507a9b5983e276851dc29"
  },
  {
      "_id": "880507a0b6983e276851dc4d",
      "name": "Satin Chrome",
      "slug": "satin-chrome",
      "image": "images/finishes/satin_chrome.jpeg",
      "partNumber": "3",
      "holesNeeded": 3,
      "cost": 10,
      "status": true,
      "company_id": "880507a0b6983e276851dc2a"
  },
  {
      "_id": "990507a1c7983e276851dc5e",
      "name": "Antique Brass",
      "slug": "antique-brass",
      "image": "images/finishes/antique_brass.jpeg",
      "partNumber": "4",
      "holesNeeded": 4,
      "cost": 15,
      "status": false,
      "company_id": "990507a1c7983e276851dc2b"
  }
]

const WineFinishComponent = () => {
  // const {
  //   mutate: deleteFinish,
  //   isSuccess: deleteSuccess,
  //   isLoading: loaderForDelete,
  // } = useDeleteFinishes();
  const [open, setOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  // pagination state:
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [activeRow, setActiveRow] = useState(null);

  const handleClickAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row); // Set the current row when the menu is triggered
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };
  // useEffect(() => {
  //   finishesRefetch();
  // }, [refetchData, page]);
  // useEffect(() => {
  //   finishesRefetch();
  // }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (data) => {
    setOpen(true);
  };

  const handleFinishDelete = () => {
    // deleteFinish(deleteRecord);
    console.log(deleteRecord);
    setDeleteModalOpen(false);
  };

  // useEffect(() => {
  //   if (deleteSuccess) {
  //     finishesRefetch();
  //   }
  // }, [deleteSuccess]);

  const handleCreateItem = (props) => {
    console.log(props)
    setOpen(false)
    // const slug = createSlug(props.name);
    // const formData = new FormData();
    // if (props.image) {
    //     formData.append("image", props.image);
    // }
    // formData.append("name", props.name);
    // formData.append("company_id", decodedToken?.company_id);
    // formData.append("slug", slug);
    // createGlassType({ data: formData, apiRoute: `${routePrefix}/save` });
  }
  const handleUpdateItem = (props) => {
    console.log(props, 'item modified')
    setOpen(false)
    // const isFile = typeof props?.image === 'object';
    // if (props?.options) {
    //     editGlassType({ data: { options: props.options }, apiRoute: `${routePrefix}/${props.id}` });
    //     setUpdateRefetch(true);
    // } else {

    //     const formData = new FormData();
    //     if (props?.name) {
    //         formData.append("name", props.name);
    //     }
    //     if (props?.image && isFile) {
    //         formData.append("image", props.image);
    //     }
    //     if (props?.options) {
    //         formData.append("options", props.options);
    //     }
    //     console.log(formData, 'form data')
    //     editGlassType({ data: formData, apiRoute: `${routePrefix}/${props.id}` });
    //     setUpdateRefetch(true);
    // }
    // localStorage.setItem("scrollToIndex", props.id);
  };

  const actionColumn = [
    {
      field: "Actions",
      headerClassName: "showerHardwareHeader",
      flex: 0.5,
      headerName: "Actions",
      renderHeader: (params) => (
        params.colDef.headerName
      ),

      renderCell: (params) => {
        const id = params.row._id;
        const data = params.row;
        return (
          <div className="cellAction">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => { handleClickAction(event, data); setItemToModify(data) }}
            >
              <ArrowForward sx={{ color: "#8477DA" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && activeRow === data)} // Check if the active row matches the current row
              onClose={handleCloseAction}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "none",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                    border: "1px solid #D0D5DD",
                    p: 0,
                    width: "171px",
                    "& .MuiList-padding": {
                      p: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseAction();
                  setUpdateModalOpen(true); // Pass data directly
                  setItemToModify(data);
                }}
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: "#EDEBFA",
                  },
                }}
              >
                <p>Edit</p>
                <EditOutlined sx={{ color: "#5D6164", height: '20px', width: '20px' }} />

              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAction();
                  handleOpenDeleteModal(id); // Pass id directly
                }}
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  borderTop: "1px solid #D0D5DD",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Delete</p>
                <DeleteOutlineOutlined sx={{ color: "#E22A2D", height: '20px', width: '20px' }} />

              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <div
            style={{ fontSize: "24px", fontWeight: 600, lineHeight: "32.78px" }}
          >
            <p style={{ color: "#5D6164" }}>
              Wine Cellar <span style={{ color: "black" }}> / Finishes</span>
            </p>
          </div>
          <div>
            <Button
              onClick={handleOpen}
              sx={{
                backgroundColor: "#8477DA",
                color: "white",
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#8477DA",
                },
              }}
            >
              Add New
            </Button>
          </div>
        </Box>
        <Box
          sx={{
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            background: "#FFFF",
            width: "99.88%",
            mt: 4,
            overflow: "hidden",
          }}
        >
          <Box>
            {false ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              </Box>
            ) : WineFinishesData.length === 0 ? (
              <Typography sx={{ color: "#667085", textAlign: "center", p: 1 }}>
                No Finishes Found
              </Typography>
            ) : (
              <div className="hardwareTable">
                <DataGrid
                  loading={false}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={WineFinishesData}
                  columns={WineFinishesColumns.concat(actionColumn)}
                  page={page}
                  rowCount={WineFinishesData.length}
                  sx={{ width: "100%" }}
                  hideFooter
                  rowHeight={70}
                  disableColumnFilter
                  disableColumnMenu
                />
              </div>
            )}
          </Box>
        </Box>
        <Box />
        <DeleteModal
          open={deleteModalOpen}
          text={"Finishes"}
          close={() => {
            setDeleteModalOpen(false);
          }}
          isLoading={false}
          handleDelete={handleFinishDelete}
        />
        <HardwareCreateModal
          open={open}
          close={handleClose}
          isLoading={false}
          handleCreate={handleCreateItem}
          hardwareType={'Finish Type'}
        />
        <HardwareEditModal
          open={updateModalOpen}
          close={() => { setUpdateModalOpen(false) }}
          data={itemToModify}
          isLoading={false}
          handleEdit={handleUpdateItem}
          hardwareType={'Finish Type'}
        />

      </Box>
    </>
  );
};

export default WineFinishComponent;
