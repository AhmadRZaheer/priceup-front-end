import React, { useEffect, useState } from "react";
import { WineFinishesColumns } from "@/utilities/DataGridColumns";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  // CircularProgress,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ArrowForward,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import {
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
import { setWineCellarsHardwareRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";

const WineFinishComponent = () => {
  const apiUrl = `${backendURL}/wineCellars/finishes/`;
  const decodedToken = getDecryptedToken();
  const [open, setOpen] = React.useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  // pagination state:
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  //Fetch All Documents
  const {
    data: WineFinishesData,
    refetch: finishesWineRefetch,
    isFetching,
    isFetched,
  } = useFetchAllDocuments(apiUrl);
  // Create New Finish
  const {
    mutate: createWineFinish,
    isLoading: createWineFinishLoading,
    isSuccess: createWineFinishSuccess,
  } = useCreateDocument();
  //Edit Item
  const {
    mutate: editWineFinish,
    isLoading: editWineFinishLoading,
    isSuccess: editWineFinishSuccess,
  } = useEditDocument();
  //Delete Item
  const {
    mutate: deleteWineFinishType,
    isLoading: deleteWineFinishTypeLoading,
    isSuccess: deleteWineFinishSuccess,
  } = useDeleteDocument();

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // const handleOpenEdit = (data) => {
  //   setOpen(true);
  // };

  const handleFinishDelete = () => {
    deleteWineFinishType({ apiRoute: `${apiUrl}/${deleteRecord}` });
  };

  const handleCreateItem = (props) => {
    const slug = createSlug(props.name);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("slug", slug);
    createWineFinish({ data: formData, apiRoute: `${apiUrl}/save` });
  };
  const handleUpdateItem = (props) => {
    const isFile = typeof props?.image === "object";
    const formData = new FormData();
    const slug = createSlug(props?.name);
    if (props?.image && isFile) {
      formData.append("image", props?.image);
    }
    formData.append("name", props?.name);
    formData.append("slug", slug);
    editWineFinish({
      data: formData,
      apiRoute: `${apiUrl}/${props.id}`,
    });
  };

  useEffect(() => {
    finishesWineRefetch();
    if (createWineFinishSuccess) {
      setOpen(false);
      dispatch(setWineCellarsHardwareRefetch());
    }
    if (deleteWineFinishSuccess) {
      setDeleteModalOpen(false);
      dispatch(setWineCellarsHardwareRefetch());
    }
    if (editWineFinishSuccess) {
      setUpdateModalOpen(false);
      dispatch(setWineCellarsHardwareRefetch());
    }
  }, [createWineFinishSuccess, deleteWineFinishSuccess, editWineFinishSuccess]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  const actionColumn = [
    {
      field: "Actions",
      headerClassName: "showerHardwareHeader",
      flex: 0.5,
      headerName: "Actions",
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,

      renderCell: (params) => {
        const id = params.row._id;
        const data = params.row;
        return (
          <div className="cellAction">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                handleClickAction(event, data);
                setItemToModify(data);
              }}
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
                <EditOutlined
                  sx={{ color: "#5D6164", height: "20px", width: "20px" }}
                />
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
                <DeleteOutlineOutlined
                  sx={{ color: "#E22A2D", height: "20px", width: "20px" }}
                />
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const SkeletonColumnsGenerated = GenrateColumns(["Finish Type", "Actions"]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
            {isLoading ? (
              <Box>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={SkeletonRowsGenerated}
                  columns={SkeletonColumnsGenerated}
                  page={1}
                  pageSize={10}
                  className="table"
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
              </Box>
            ) : WineFinishesData.length > 0 ? (
              <Box className="hardwareTable">
                <DataGrid
                  loading={isFetching}
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
              </Box>
            ) : (
              <Typography sx={{ color: "#667085", textAlign: "center", p: 1 }}>
                No Finishe Found
              </Typography>
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
          isLoading={deleteWineFinishTypeLoading}
          handleDelete={handleFinishDelete}
        />
        <HardwareCreateModal
          open={open}
          close={handleClose}
          isLoading={createWineFinishLoading}
          handleCreate={handleCreateItem}
          hardwareType={"Finish Type"}
        />
        <HardwareEditModal
          open={updateModalOpen}
          close={() => {
            setUpdateModalOpen(false);
          }}
          data={itemToModify}
          isLoading={editWineFinishLoading}
          handleEdit={handleUpdateItem}
          hardwareType={"Finish Type"}
        />
      </Box>
    </>
  );
};

export default WineFinishComponent;
