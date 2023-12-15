import { useState } from "react";
import {
  Add,
  ArrowBack,
  ArrowForward,
  Delete,
  Edit,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  useDeleteEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@mui/material";
import {
  addSelectedItem,
  initializeStateForEditQuote,
  resetState,
  setDoorWidth,
  setListData,
  setNavigationDesktop,
  setQuoteState,
} from "../../redux/estimateCalculations";
import PlusWhiteIcon from "../../Assets/plus-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { backendURL, calculateAreaAndPerimeter } from "../../utilities/common";
import { useEffect } from "react";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomIconButton from "../ui-components/CustomButton";
import { DataGrid } from "@mui/x-data-grid";
import { getDataRefetch } from "../../redux/staff";
import DefaultImage from "../ui-components/defaultImage";
export default function ExistingTable() {
  const { data, isFetching, refetch } = useGetEstimates();
  const navigate = useNavigate();
  const refetchData = useSelector(getDataRefetch);
  const {
    data: estimateListData,
    isFetching: estimateDataFetching,
    refetch: Refetched,
  } = useFetchDataEstimate();
  const { mutate: deleteEstimates, isSuccess: deletedSuccessfully } =
    useDeleteEstimates();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const filteredData = data?.estimates?.filter((item) =>
    item.customerData.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteEstimate = (id) => {
    deleteEstimates(id);
  };

  useEffect(() => {
    refetch();
  }, [deletedSuccessfully]);
  useEffect(() => {
    refetch();
    Refetched();
  }, [refetchData]);

  const handleIconButtonClick = (item) => {
    dispatch(resetState());
    dispatch(setListData(estimateListData));
    dispatch(
      initializeStateForEditQuote({
        estimateData: item,
        quotesId: item._id,
      })
    );
    dispatch(addSelectedItem(item));
    dispatch(setQuoteState("edit"));
    const result = calculateAreaAndPerimeter(
      item.measurements,
      item?.layoutData?.variant
    );

    dispatch(setDoorWidth(result.doorWidth));
    dispatch(setNavigationDesktop("review"));
  };

  const handleCreateQuote = () => {
    dispatch(setQuoteState("create"));
    dispatch(setNavigationDesktop("layouts"));
    navigate("/estimates/steps");
  };
  const EstiamtesColumn = [
    {
      field: "Creator Name",
      headerClassName: "customHeaderClass",
      width: 260,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "100%",
                  overflow: "hidden",
                }}
              >
                <DefaultImage
                  image={params?.row?.creatorData?.image}
                  name={params?.row?.creatorData?.name}
                />
              </Box>
              <Box>
                <Typography>{params?.row?.creatorData?.name}</Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    p: 0,
                    mt: -0.4,
                    color: "#667085",
                  }}
                >
                  {params?.row?.creatorData?.email}
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      field: "Customer Name",
      headerClassName: "customHeaderClass",
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.name}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Customer Email",
      headerClassName: "customHeaderClass",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.email}
            </Typography>
          </>
        );
      },
    },

    {
      field: "Date quoted",
      headerClassName: "customHeaderClass",
      width: 226,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
              {new Date(params?.row?.updatedAt).toDateString()}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Estimated total",
      headerClassName: "customHeaderClass",
      width: 170,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
              ${params?.row?.cost?.toFixed(2) || 0}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Status",
      headerClassName: "customHeaderClass",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                width: "fit-content",
                bgcolor:
                  params?.row?.status === "pending" ? "#FEF3F2" : "#ECFDF3",
                borderRadius: "16px",
                color:
                  params?.row?.status === "pending" ? "#B42318" : "#027A48",
                pl: 1.8,
                pt: 0.3,
                pr: 1.8,
                pb: 0.5,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  bgcolor:
                    params?.row?.status === "pending" ? "#B42318" : "#027A48",
                  borderRadius: "100%",
                  mt: 0.2,
                }}
              ></Box>
              {params?.row?.status}
            </Box>
          </>
        );
      },
    },
    {
      field: "Action",
      headerClassName: "customHeaderClass",
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => handleDeleteEstimate(params?.row?._id)}
              sx={{
                padding: 1,
                margin: 0,
                borderRadius: "100%",
                mt: -0.5,
                mr: 1,
                "&:hover": { backgroundColor: "white" },
                "&:active": { backgroundColor: "white" },
              }}
            >
              <img
                width={"20px"}
                height={"20px"}
                src={DeleteIcon}
                alt="delete icon"
              />
            </IconButton>
            <Link
              to="/estimates/steps"
              style={{ marginLeft: 2, marginRight: 1, marginTop: 6 }}
            >
              <CustomIconButton
                handleClick={() => handleIconButtonClick(params?.row)}
                disable={estimateDataFetching}
                buttonText="Edit"
                icon={<Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />}
              />
            </Link>
          </>
        );
      },
    },
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const MAX_PAGES_DISPLAYED = 5;

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
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#101828" }}>
          Estimates
        </Typography>
        {/* Search input field */}
        <TextField
          placeholder="Search by Name"
          value={search}
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            ".MuiInputBase-root:after": {
              border: "1px solid #8477DA",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#8477DA" }} />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={handleCreateQuote}
          disabled={estimateDataFetching}
          sx={{
            backgroundColor: "#8477DA",
            color: "white",
            "&:hover": { backgroundColor: "#8477DA" },
            borderRadius: 1,
            padding: 1,
            textTransform: "capitalize",
            fontSize: 16,
            height: 35,
          }}
        >
          <img
            width={"26px"}
            height={"20px"}
            src={PlusWhiteIcon}
            alt="plus icon"
          />
          Add
        </IconButton>
      </Box>
      {/* <Box>
        {/* Table header 
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#F9FAFB",
            p: 2,
          }}
        >
          <Typography sx={{ width: 280, color: "#667085" }}>
            Creator Name
          </Typography>
          <Typography sx={{ width: 220, color: "#667085" }}>
            Customer Name
          </Typography>
          <Typography sx={{ width: 250, color: "#667085" }}>
            Customer Email
          </Typography>
          <Typography sx={{ width: 180, color: "#667085" }}>
            Date Quoted
          </Typography>
          <Typography sx={{ width: 200, color: "#667085" }}>Total</Typography>
          <Typography sx={{ width: 180, color: "#667085" }}>Status</Typography>
          <Typography sx={{ width: 60 }}></Typography>
        </Box>

        {isFetching || estimateDataFetching ? (
          <Box
            sx={{
              width: 40,
              m: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "70vh",
              minHeight: "40vh",
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              border: "1px solid #f0ecec",
            }}
          >
            {filteredData.length >= 1 ? (
              filteredData.map((item) => {
                if (item?.creatorData && item?.creatorData?.name) {
                  var firstNameInitial = item?.creatorData?.name.charAt(0);
                } else {
                  var firstNameInitial = "";
                }
                if (item && item?.creatorData?.name) {
                  var lastNameInitial = item?.creatorData?.name.charAt(1);
                } else {
                  var lastNameInitial = "";
                }
                return (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      borderBottom: "1px solid #f0ecec",
                      p: 2,
                    }}
                  >
                    <Box sx={{ width: 290, display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "100%",
                          overflow: "hidden",
                        }}
                      >
                        {item.creatorData.image ===
                        "images/users/default.jpg" ? (
                          <Typography
                            sx={{
                              backgroundColor: "#F9F5FF",
                              width: 34,
                              height: 34,
                              borderRadius: "100%",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#7F56D9",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            {firstNameInitial}
                            {lastNameInitial}
                          </Typography>
                        ) : (
                          <img
                            width={40}
                            src={`${backendURL}/${item.creatorData.image}`}
                            alt="image person"
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography>{item.creatorData.name}</Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            p: 0,
                            mt: -0.4,
                            color: "#667085",
                          }}
                        >
                          {item.creatorData.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ width: 210, py: 1, color: "#667085" }}>
                      {item.customerData.name}
                    </Typography>
                    <Typography sx={{ width: 250, py: 1, color: "#667085" }}>
                      {item.customerData.email}
                    </Typography>
                    <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
                      {new Date(item?.updatedAt).toDateString()}
                    </Typography>
                    <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
                      ${item?.cost?.toFixed(2) || 0}
                    </Typography>
                    <Typography
                      sx={{
                        width: 170,
                        py: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "fit-content",
                          bgcolor:
                            item?.status === "pending" ? "#FEF3F2" : "#ECFDF3",
                          borderRadius: "16px",
                          color:
                            item?.status === "pending" ? "#B42318" : "#027A48",
                          pl: 1.8,
                          pt: 0.3,
                          pr: 1.8,
                          pb: 0.5,
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "6px",
                            height: "6px",
                            bgcolor:
                              item?.status === "pending"
                                ? "#B42318"
                                : "#027A48",
                            borderRadius: "100%",
                            mt: 0.2,
                          }}
                        ></Box>
                        {item?.status}
                      </Box>
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteEstimate(item._id)}
                      sx={{
                        padding: 1,
                        margin: 0,
                        borderRadius: "100%",
                        mt: -0.5,
                        mr: 1,
                        "&:hover": { backgroundColor: "white" },
                        "&:active": { backgroundColor: "white" },
                      }}
                    >
                      <img
                        width={"20px"}
                        height={"20px"}
                        src={DeleteIcon}
                        alt="delete icon"
                      />
                    </IconButton>
                    <Link
                      to="/estimates/steps"
                      style={{ marginLeft: 2, marginRight: 1, marginTop: 6 }}
                    >
                      <CustomIconButton
                        handleClick={() => handleIconButtonClick(item)}
                        disable={estimateDataFetching}
                        buttonText="Edit"
                        icon={
                          <Edit
                            sx={{ color: "white", fontSize: 18, mr: 0.4 }}
                          />
                        }
                      />
                    </Link>
                  </Box>
                );
              })
            ) : (
              <Box>
                <Typography
                  sx={{
                    py: 1,
                    fontSize: 18,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  No Estimates Found
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box> */}
      {isFetching || estimateDataFetching ? (
        <Box
          sx={{
            width: 40,
            m: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "70vh",
            minHeight: "40vh",
          }}
        >
          <CircularProgress sx={{ color: "#8477DA" }} />
        </Box>
      ) : filteredData.length === 0 ? (
        <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
          No Estimates Found
        </Typography>
      ) : (
        <Box>
          <DataGrid
            style={{
              border: "none",
            }}
            getRowId={(row) => row._id}
            rows={filteredData.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )}
            columns={EstiamtesColumn}
            page={page}
            pageSize={itemsPerPage}
            rowCount={filteredData ? filteredData?.length : 0}
            sx={{ width: "100%" }}
            hideFooter
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderTop: "1px solid #EAECF0",
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
              disabled={page === 0}
            >
              <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
              Previous
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              {pageNumbersToShow.map((pagenumber, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor:
                      page === pagenumber
                        ? "rgba(144, 136, 192, 0.2)"
                        : "white",
                    color: page === pagenumber ? "#353050" : "#667085",
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pagenumber}
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
              // disabled={filteredData.creatorData.length === 0}
            >
              Next
              <ArrowForward sx={{ color: "#344054", fontSize: 20, ml: 1 }} />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
