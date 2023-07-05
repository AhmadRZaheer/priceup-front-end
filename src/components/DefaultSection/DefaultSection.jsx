import React from "react";
import "./hardwareTable.scss";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";

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

import DefaultComponentHeader from "./DefaultComponentHeader";
import DefaultComponent from "./DefaultComponent";
import LayoutHeader from "./LayoutHeader";

import { useFetchDataDefault } from "../../utilities/ApiHooks/DefaultLayouts";
import AddEditFinish from "../Model/AddEditFinish";

const DefaultSection = () => {
  const hardwareData = useSelector((state) => state.hardware);
  const { data: defaultData, refetch: defaultDataRefetch } =
    useFetchDataDefault();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showNext, SetShowNext] = React.useState("defaultData[0]");
  console.log(showNext, "showNext default");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(defaultData, "defaultDatadefaultData");

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
        <h2>Default</h2>
      </div>
      <div
        style={{
          marginLeft: "15px",
          marginRight: "15px",
          background: "rgb(232, 232, 232)",
        }}
      >
        <LayoutHeader types={defaultData} showMore={SetShowNext} />
      </div>
      <Box
        sx={{
          border: "1px solid rgb(232, 232, 232)",
          margin: 2,
        }}
      >
        <div className="hardwareTable">
          <div className="hardwareTable">
            <DefaultComponentHeader selected={showNext} />
            <DefaultComponent id={showNext?._id} />
          </div>
        </div>
      </Box>
      <AddEditFinish
        open={open}
        close={handleClose}
        handleHeaderClick={handleHeaderClick}
      />
    </>
  );
};
export default DefaultSection;
