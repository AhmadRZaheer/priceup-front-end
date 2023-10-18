import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { CustomerQuoteColumns } from "../../customerTableSource";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
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
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 3,
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
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to store error
  const {
    data: estimateListData,
    isFetching: estimateDataFetching,
    refetch: Refetched,
  } = useFetchDataEstimate();
  console.log("qutid", estimates);
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

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, quoteId]);

  const handleIconButtonClick = (params) => {
    console.log("qutitem", params.row);
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
      minWidth: "280px",
      renderCell: (params) => {
        return (
          <>
            <Link to="/customers/steps">
              <IconButton
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": { backgroundColor: "#8477DA" },
                  color: "white",
                  textTransform: "capitalize",
                  borderRadius: 2,
                  fontSize: 15,
                }}
                onClick={() => handleIconButtonClick(params)}
                disabled={estimateDataFetching}
              >
                Update
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

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
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItem: "center" }}>
            <Typography sx={{fontSize: 24, fontWeight: "bold"}}>Estimates</Typography>
            <Close
              onClick={close}
              sx={{ color: "gray", fontSize: 24, cursor: "pointer" }}
            />
          </Box>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <DataGrid
              getRowId={(row) => row._id}
              rows={estimates} // Pass the fetched data as an array
              columns={CustomerQuoteColumns.concat(actionColumn)}
              autoHeight
              pageSizeOptions={[10]}
              disableColumnFilter
              style={dataGridStyle}
            />
          )}
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Button
              variant="outlined"
              onClick={close}
              sx={{ color: "black", border: "1px solid black", width: "120px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
