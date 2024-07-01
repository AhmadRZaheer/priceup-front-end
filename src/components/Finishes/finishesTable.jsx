import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "@/utilities/DataGridColumns";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Add } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  TextField,
  Input,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  useDeleteFinishes,
  useFetchDataFinishes,
} from "../../utilities/ApiHooks/finishes";
import AddEditFinish from "../Modal/addEditFinish";
import CustomIconButton from "../ui-components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackBarSlice";
import { getDataRefetch } from "../../redux/staff";
import DeleteModal from "../Modal/deleteModal";
import { MAX_PAGES_DISPLAYED, itemsPerPage } from "@/utilities/constants";
import NewPagination from "../Pagination";

const FinishesTable = () => {
  const refetchData = useSelector(getDataRefetch);
  const {
    data: finishesData,
    refetch: finishesRefetch,
    isFetching,
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
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);
  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };
  useEffect(() => {
    finishesRefetch();
  }, [refetchData]);
  useEffect(() => {
    finishesRefetch();
  }, []);
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
      field: "Status",
      headerClassName: "customHeaderClass-finishes",
      flex: 1,
      renderCell: (params) => {
        const id = params.row._id;
        const isMatchingId = id === matchingId;
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleOpenDeleteModal(id)}
            >
              {isMatchingId && loaderForDelete ? (
                <CircularProgress size={24} color="warning" />
              ) : (
                <img src={DeleteIcon} alt="delete icon" />
              )}
            </div>
            <div className="viewButton">
              <CustomIconButton
                handleClick={() => handleOpenEdit(params.row)}
                icon={
                  <ModeIcon sx={{ color: "white", fontSize: 18, mr: 0.4 }} />
                }
              />
            </div>
          </div>
        );
      },
    },
  ];

  // Filter the finishesData based on the search input
  const filteredData = finishesData?.filter((finish) =>
    finish.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "100vh",
          pl: 1,
        }}
      >
        <div className="page-title">
          <Typography variant="h4" sx={{ fontWeight: 500, color: "#101828" }}>
            Finishes
          </Typography>
        </div>
        <Box
          sx={{
            border: "1px solid #EAECF0",
            margin: 2,
            p: 0,
            borderRadius: "8px",
          }}
        >
          <div
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
            <div>
              <CustomIconButton
                handleClick={handleOpen}
                icon={<Add style={{ color: "white" }} />}
                buttonText="Add Finishes"
              />
            </div>
          </div>

          <Box>
            {isFetching ? (
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
            ) : filteredData.length === 0 ? (
              <Typography sx={{ color: "#667085", textAlign: "center", p: 1 }}>
                No Finishes Found
              </Typography>
            ) : (
              <div className="hardwareTable">
                <DataGrid
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={userColumnsHardware.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={filteredData.length}
                  sx={{ width: "100%" }}
                  hideFooter
                />
              
                <NewPagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  setIsShowInput={setIsShowInput}
                  isShowInput={isShowInput}
                  setInputPage={setInputPage}
                  inputPage={inputPage}
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
