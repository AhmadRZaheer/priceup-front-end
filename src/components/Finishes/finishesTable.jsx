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

  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [isShowInput, setIsShowInput] = useState(false);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getPageNumbersToShow = () => {
    if (totalPages <= MAX_PAGES_DISPLAYED) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pagesToShow = [];
    const startPage = Math.max(1, page - 2); // Display three on the first side
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push("..."); // Display ellipsis if there are skipped pages
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    setIsShowInput(false);
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setIsShowInput(false);
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };
  const HandleShowInput = () => {
    setIsShowInput(true);
  };
  const HandleShowRemoveInput = () => {
    setIsShowInput(false);
  };
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      const pageNumber = parseInt(inputPage, 10);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
        setPage(pageNumber);
        setInputPage("");
        setIsShowInput(false);
      }
    }
  };

  const handleInputBlur = () => {
    setInputPage("");
  };

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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                    borderTop: "1px solid #EAECF0",
                    width: "96%",
                  }}
                >
                  <Button
                    sx={{
                      border: "1px solid #D0D5DD",
                      color: "#344054",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      ":hover": {
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                      },
                    }}
                    variant="outlined"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
                    Previous
                  </Button>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {pageNumbersToShow.map((pagenumber, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          if (typeof pagenumber === "number") {
                            setPage(pagenumber);
                            HandleShowRemoveInput();
                          }
                        }}
                        sx={{
                          backgroundColor:
                            page === pagenumber ? "#8477DA" : "white",
                          color: page === pagenumber ? "white" : "#8477DA",
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #8477DA",
                          cursor:
                            typeof pagenumber === "number"
                              ? "pointer"
                              : "default",
                        }}
                      >
                        {isShowInput && pagenumber === "..." ? (
                          <TextField
                            size="small"
                            variant="outlined"
                            type="text"
                            value={inputPage}
                            onChange={handleInputChange}
                            onKeyPress={handleInputKeyPress}
                            onBlur={handleInputBlur}
                            inputProps={{
                              min: 1,
                              max: totalPages,
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                            sx={{ width: 60 }}
                          />
                        ) : pagenumber === "..." ? (
                          <div
                            onClick={HandleShowInput}
                            style={{ cursor: "pointer" }}
                          >
                            {pagenumber}{" "}
                          </div>
                        ) : (
                          pagenumber
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Button
                    sx={{
                      border: "1px solid #D0D5DD",
                      color: "#344054",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      ":hover": {
                        border: "1px solid #D0D5DD",
                        color: "#344054",
                      },
                    }}
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next
                    <ArrowForward
                      sx={{ color: "#344054", fontSize: 20, ml: 1 }}
                    />
                  </Button>
                </Box>
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
