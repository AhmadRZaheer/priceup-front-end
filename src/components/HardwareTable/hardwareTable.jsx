import React from "react";
import "./hardwareTable.scss";

import { useDispatch } from "react-redux";
import { addHardware } from "../../redux/hardwareSlice";
import { Box, Typography } from "@mui/material";
import userImg from "../../Assets/username1.svg";
import Header from "../TableHeader/tableHeader";
import HardWareComponent from "./hardWareComponent";
import AddEditModel from "../Modal/addEditFinish";
import { useFetchDatahardwareCategory } from "../../utilities/ApiHooks/hardware";

const HardwareTable = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [showNext, SetShowNext] = React.useState("handles");
  const handleClose = () => setOpen(false);

  const handleHeaderClick = () => {
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

  const { data: hardwareCategoryData } = useFetchDatahardwareCategory();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          height: "98.2vh",
        }}
      >
        <div className="h-page-title">
          <Typography style={{ fontSize: 30, paddingLeft: 10 }}>
            Hardware
          </Typography>
        </div>
        <div
          style={{
            border: "1px solid rgb(232, 232, 232)",
            width: "98%",
            borderRadius: "8px",
            margin: "auto",
          }}
        >
          <div
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              width: "auto",
            }}
          >
            <Header types={hardwareCategoryData} showMore={SetShowNext} />
          </div>
          <div>
            <HardWareComponent type={showNext} />
          </div>
        </div>

        <AddEditModel
          open={open}
          close={handleClose}
          handleHeaderClick={handleHeaderClick}
        />
      </Box>
    </>
  );
};
export default HardwareTable;
