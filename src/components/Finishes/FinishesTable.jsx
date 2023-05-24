import React from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteHardware } from "../../redux/hardwareSlice";
import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

import BasicModal from "../Model/Model";

const FinishesTable = () => {
  const hardwareData = useSelector((state) => state.hardware);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const [showNext, SetShowNext] = React.useState("one");

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const handleDelete = (id) => {
    dispatch(deleteHardware(id));
  };

  const actionColumn = [
    {
      field: " ",
      // headerName: (
      //   // <div onClick={handleOpen}>
      //   //   <img src={plus} alt="Add More" />
      //   // </div>
      // ),
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </div>
            <div
              className="viewButton"
              onClick={() => handleOpenEdit(params.row)}
            >
              <ModeIcon />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="page-title">
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
          {" "}
          <div
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            Finishes
          </div>{" "}
          <div
            style={{
              padding: 4,
            }}
          >
            <IconButton onClick={handleOpen}>
              <Add style={{ color: "rgb(65, 106, 238)" }} />
            </IconButton>
          </div>{" "}
        </div>
      </div>
      <Box sx={{ border: "1px solid #EAECF0", margin: 2 }}>
        <div className="hardwareTable">
          <DataGrid
            rows={hardwareData}
            columns={userColumnsHardware.concat(actionColumn)}
            paginationModel={{ page: 0, pageSize: 8 }}
            // checkboxSelection
          />
        </div>
      </Box>

      <BasicModal open={open} close={handleClose} data={edit} isEdit={isEdit} />
    </>
  );
};

export default FinishesTable;
