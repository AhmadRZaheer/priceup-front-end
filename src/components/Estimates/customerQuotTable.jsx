import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { CustomerQuoteColumns } from "../../customerTableSource";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { backendURL } from "../../utilities/common";
import {
  useDeleteEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import {
  initializeStateForEditQuote,
  setListData,
  setNavigationDesktop,
} from "../../redux/estimateCalculations";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward, Close, Edit } from "@mui/icons-material";
import CustomIconButton from "../ui-components/CustomButton";
import { getDataRefetch } from "../../redux/staff";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  borderRadius: "12px",
  p: 4,
  justifyContent: "end",
  alignItem: "end",
};

const dataGridStyle = {
  background: "white",
};

export default function AddEditFinish({ open, close, quoteId }) {
  const [estimates, setEstimates] = useState([]); // State to indicate loading
  const [error, setError] = useState(null);
  const refetchData = useSelector(getDataRefetch); // State to store error
  const {
    data: estimateListData,
    isFetching: estimateDataFetching,
    refetch: Refetched,
  } = useFetchDataEstimate();
  useEffect(() => {
    Refetched();
  }, [refetchData]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${backendURL}/users/getQuote/${quoteId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        if (responseData && responseData.code === 200) {
          // Check if there's valid data in the response
          const data = responseData.data ? responseData.data : null;

          // Here you can use the 'data' as needed, e.g., set it in state
          setEstimates(data);
        } else {
          // Handle other response codes or errors as needed
          setError("Error message or handling for non-200 response");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, quoteId]);

  const handleIconButtonClick = (params) => {
    dispatch(setListData(estimateListData));
    dispatch(
      initializeStateForEditQuote({
        estimateData: params.row,
        quotesId: params.row._id,
      })
    );
    dispatch(setNavigationDesktop("review"));
  };

  const actionColumn = [
    {
      field: "Status",
      align: "left",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Link to="/customers/steps">
              <CustomIconButton
                disable={estimateDataFetching}
                handleClick={() => handleIconButtonClick(params)}
                icon={<Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />}
              />
            </Link>
          </>
        );
      },
    },
  ];
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(estimates.length / itemsPerPage);
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
    <div>
      <Modal
        open={open}
        onClose={close}
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              Estimates
            </Typography>
            <Close
              onClick={close}
              sx={{ color: "gray", fontSize: 24, cursor: "pointer" }}
            />
          </Box>
          {estimateDataFetching ? (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <CircularProgress sx={{ color: "#8477DA" }} />
            </Box>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <Box
              sx={{ border: "1px solid #EAECF0", borderRadius: "8px", mb: 2 }}
            >
              <DataGrid
                style={dataGridStyle}
                getRowId={(row) => row._id}
                rows={estimates.slice(
                  (page - 1) * itemsPerPage,
                  page * itemsPerPage
                )}
                columns={CustomerQuoteColumns.concat(actionColumn)}
                page={page}
                pageSize={itemsPerPage}
                rowCount={estimates.length}
                pageSizeOptions={[1, , 25]}
                sx={{ width: "100%" }}
                hideFooter
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
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
                  disabled={estimates.length === 0}
                >
                  Next
                  <ArrowForward
                    sx={{ color: "#344054", fontSize: 20, ml: 1 }}
                  />
                </Button>
              </Box>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button
              variant="outlined"
              onClick={close}
              sx={{
                color: "#101828",
                border: "1px solid black",
                width: "120px",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
