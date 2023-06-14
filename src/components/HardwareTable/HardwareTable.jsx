import React, { useEffect, useState } from "react";
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
import { ContentCopy } from "@mui/icons-material";
import { Box } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import plus from "../../Assets/plus.svg";
import Header from "../TableHeader/TableHeader";
import { items } from "../../data/data";
import BasicModal from "../Model/Model";
import HardWareComponent from "./HardWareComponent";
import HardWareComponentHeader from "./HardwareComponentHeader";
import axios from "axios";
import { backendURL } from "../../utiles/common";

const HardwareTable = () => {
  const hardwareData = useSelector((state) => state.hardware);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showNext, SetShowNext] = React.useState("handles");
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

  //get header data from api
  const [headerTitle, setHeaderTitle] = React.useState([]);
  const [hardwareDetail, setHardwareDetail] = React.useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}/hardwareCategory`);
        console.log(response, "response form api");

        if (response.status === 200) {
          setHeaderTitle(response.data.data);
        } else {
          setError("An error occurred while fetching the data.");
        }
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // console.log(headerTitle, "data form api");
  // console.log(showNext, "showNext form api");

  return (
    <>
      <div className="page-title">
        <h2>Hardware</h2>
      </div>
      <div
        style={{
          marginLeft: "15px",
          marginRight: "15px",
          background: "rgb(232, 232, 232)",
        }}
      >
        <Header types={headerTitle} showMore={SetShowNext} />
      </div>
      <Box
        sx={{
          border: "1px solid rgb(232, 232, 232)",
          margin: 2,
        }}
      >
        <div className="hardwareTable">
          <div className="hardwareTable">
            <HardWareComponentHeader type={showNext} />
            <HardWareComponent type={showNext} />
          </div>
        </div>
      </Box>
      <BasicModal
        open={open}
        close={handleClose}
        handleHeaderClick={handleHeaderClick}
      />
    </>
  );
};
export default HardwareTable;
