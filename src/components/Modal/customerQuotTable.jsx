import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid"; // Import DataGrid
import { CustomerQuoteColumns } from "../../customerTableSource";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import {
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
  background: "white", // Set the background to white
};
export default function AddEditFinish({ open, close, data }) {
  const dispatch = useDispatch();
  const handleIconButtonClick = (param) => {
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
            <IconButton
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 15,
            }}
            >Update</IconButton>
          </>
        );
      },
    },
  ];
console.log(data)
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
          {data && (
            <DataGrid
              getRowId={(row) => row._id}
              rows={[data]} // Pass the selected row data as an array
              columns={CustomerQuoteColumns.concat(actionColumn)}
              pageSize={1} // Display only one row
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
