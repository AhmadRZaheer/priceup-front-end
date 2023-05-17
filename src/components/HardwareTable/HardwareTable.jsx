import React from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  addHardware,
  deleteHardware,
  editHardware,
} from "../../redux/hardwareSlice";
import { Add, ContentCopy } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import plus from "../../Assets/plus.svg";
import Header from "../TableHeader/TableHeader";
import { types } from "../../data/data";
import BasicModal from "../Model/Model";

const HardwareTable = () => {
  const hardwareData = useSelector((state) => state.hardware);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = (id) => {
    console.log(id, "clicked deleted button");

    dispatch(deleteHardware(id));
  };

  const handleEdit = (updatedHardware) => {
    console.log(updatedHardware, "clicked Edit button");

    dispatch(editHardware(updatedHardware));
  };

  const handleAddClick = () => {
    const newId = Date.now() % 10000;
    const newHardware = {
      id: newId,
      name: "new ",
      img: userImg,
      username: "New",
      PartNumber: "",
      Cost: "",
      Price: "",
      Status: "",
    };

    dispatch(addHardware(newHardware));
  };

  const handleHeaderClick = (selectedImage) => {
    console.log("handleHeaderClick Edit button");
    const newId = Date.now() % 10000;
    const newHardware = {
      id: newId,
      name: "new ",
      img: userImg,
      username: "New",
      PartNumber: "",
      Cost: "",
      Price: "",
      Status: "",
    };

    dispatch(addHardware(newHardware));
  };

  const actionColumn = [
    {
      field: "actions",
      headerName: (
        <div onClick={handleOpen}>
          <img src={plus} alt="Add More" />
        </div>
      ),
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <div className="cellAction">
            <div className="viewButton">
              <ContentCopy />
            </div>
            <div className="deleteButton" onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </div>
            <div className="viewButton" onClick={() => handleEdit(params.row)}>
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
        <h2>Hardware</h2>
        <div>
          <IconButton onClick={handleAddClick}>
            <Add style={{ color: "Black" }} />
          </IconButton>
        </div>
      </div>
      <div className="CustomerTable">
        <div style={{ padding: "15px" }}>
          <Header types={types} />
        </div>

        <BasicModal
          open={open}
          close={handleClose}
          handleHeaderClick={handleHeaderClick}
        />

        <DataGrid
          rows={hardwareData}
          columns={userColumnsHardware.concat(actionColumn)}
          paginationModel={{ page: 0, pageSize: 8 }}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default HardwareTable;
