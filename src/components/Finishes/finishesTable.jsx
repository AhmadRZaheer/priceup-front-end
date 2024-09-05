import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "@/utilities/DataGridColumns";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  useDeleteFinishes,
  useFetchDataFinishes,
} from "../../utilities/ApiHooks/finishes";
import AddEditFinish from "../Modal/addEditFinish";
import CustomIconButton from "../ui-components/CustomButton";
import { useSelector } from "react-redux";
import { getDataRefetch } from "../../redux/staff";
import DeleteModal from "../Modal/deleteModal";
import { itemsPerPage } from "@/utilities/constants";
import Pagination from "../Pagination";
import { ArrowForward, DeleteOutlineOutlined, EditOutlined, MoreHoriz } from "@mui/icons-material";
import EditIcon from "@/Assets/d.svg";

const FinishesTable = () => {
  const refetchData = useSelector(getDataRefetch);
  const {
    data: finishesData,
    refetch: finishesRefetch,
    isFetching,
    isLoading,
  } = useFetchDataFinishes();
  const {
    mutate: deleteFinish,
    isSuccess: deleteSuccess,
    isLoading: loaderForDelete,
  } = useDeleteFinishes();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [matchingId, setMatchingId] = useState("");
  const [search, setSearch] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  // pagination state:
  const [page, setPage] = useState(1);
  // const [inputPage, setInputPage] = useState("");
  // const [isShowInput, setIsShowInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Manage menu state in the parent
  const [activeRow, setActiveRow] = useState(null); // State to keep track of which row triggered the menu

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
  useEffect(() => {
    finishesRefetch();
  }, [refetchData, page]);
  // useEffect(() => {
  //   finishesRefetch();
  // }, []);
  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (data) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };

  const handleFinishDelete = () => {
    deleteFinish(deleteRecord);
    setMatchingId(deleteRecord);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    if (deleteSuccess) {
      finishesRefetch();
    }
  }, [deleteSuccess]);

  const actionColumn = [
    {
      field: "Actions",
      headerClassName: "customHeaderClass",
      flex: 0.5,
      renderCell: (params) => {
        const id = params.row._id;
        const data = params.row;

        return (
          <div className="cellAction">
            <IconButton
              aria-haspopup="true"
              onClick={(event) => handleClickAction(event, data)}
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
                  handleOpenEdit(data); // Pass data directly
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

  // Filter the finishesData based on the search input
  // const filteredData = finishesData?.filter((finish) =>
  //   finish.name.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
          // height: "88vh",
          // pl: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // width: "99.5%",
            margin: "auto",
          }}
        >
          <div
            style={{ fontSize: "24px", fontWeight: 600, lineHeight: "32.78px" }}
          >
            <p style={{ color: "#5D6164" }}>
              Shower <span style={{ color: "black" }}> / Finishes</span>
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
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              paddingTop: 15,
              paddingBottom: 15,
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: "18px", fontWeight: 500, color: "#101828" }}
            >
              Finishes
            </Typography>
            <Input
              placeholder="Search by Name"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mb: 2,
                width: "20%", // You can adjust the width as needed
                marginLeft: "30px", // Adjust the margin as needed
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </div> */}

          <Box>
            {isLoading ? (
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
            ) : finishesData.length === 0 ? (
              <Typography sx={{ color: "#667085", textAlign: "center", p: 1 }}>
                No Finishes Found
              </Typography>
            ) : (
              <div className="hardwareTable">
                <DataGrid
                  loading={isFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={finishesData.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={userColumnsHardware.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={finishesData.length}
                  sx={{ width: "100%" }}
                  hideFooter
                  rowHeight={70}
                  disableColumnFilter
                  disableColumnMenu
                />
                <Pagination
                  totalRecords={finishesData.length ? finishesData.length : 0}
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
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
          isLoading={loaderForDelete}
          handleDelete={handleFinishDelete}
        />
        <AddEditFinish
          open={open}
          close={handleClose}
          data={edit}
          isEdit={isEdit}
          finishesRefetch={finishesRefetch}
        />
      </Box>
    </>
  );
};

export default FinishesTable;
