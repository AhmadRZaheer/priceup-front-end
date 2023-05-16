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
export const types = [
  "Finishes",
  "Handles",
  "Hinges",
  "Finishes",
  "Handles",
  "Hinges",
  "Finishes",
  "Handles",
  "Hinges",
  "Finishes",
  "Handles",
  "Hinges",
  "Finishes",
  "Handles",
  "Hinges",
];
const HardwareTable = () => {
  const hardwareData = useSelector((state) => state.hardware);
  const dispatch = useDispatch();

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

  const actionColumn = [
    {
      field: "actions",
      headerName: <img src={plus} alt="Add More" />,
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
