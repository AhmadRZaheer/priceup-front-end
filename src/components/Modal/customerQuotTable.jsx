import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { CustomerQuoteColumns } from "../../customerTableSource";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { backendURL } from "../../utilities/common";
import {
  initializeStateForEditQuote,
  setListData,
  setNavigationDesktop,
} from "../../redux/estimateCalculations";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "4px",
  p: 4,
};

const dataGridStyle = {
  background: "white",
};

export default function AddEditFinish({ open, close, quoteId }) {
  const [estimates, setEstimates] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to store error
console.log("qutid",estimates)
const dispatch = useDispatch();
useEffect(() => {
  const fetchData = async () => {
    try {
      // Make the API call
      const token = localStorage.getItem("token");
      const response = await fetch(`${backendURL}/users/getQuote/${quoteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      // Map and transform the data from the API response
      const formattedData = responseData.data.map((item) => ({
        id: item._id, // Replace with a unique identifier if available
        name: item.name,
      }));

      setEstimates(formattedData);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (open) {
    fetchData();
  }
}, [open, quoteId]);

const handleIconButtonClick = (params) => {
  dispatch(setListData(estimates));
  dispatch(
    initializeStateForEditQuote({
      estimateData: params.row,
      quotesId: params.row.id,
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
        console.log(params.row.id)
        return (
          <>
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
            >
              Update
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={style}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <DataGrid
            getRowId={(row) => row.id}
              rows={estimates} // Pass the fetched data as an array
              columns={CustomerQuoteColumns.concat(actionColumn)}
              pageSize={1}
              autoHeight
              disableColumnFilter
              style={dataGridStyle}
            />
          )}
          <Button
            variant="outlined"
            onClick={close}
            sx={{ color: "#fff", border: "1px solid #D0D5DD", width: "30%" }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
