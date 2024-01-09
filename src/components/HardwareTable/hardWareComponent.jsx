import React, { useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useFetchDatahardware } from "../../utilities/ApiHooks/hardware";
import AddEditHardware from "../Modal/addEditHardware";
import "./hardwareTable.scss";
import HardwareItem from "./hardwreItem";
import AddIcon from "../../Assets/plus.svg";
import { useSelector } from "react-redux";
import { getDataRefetch } from "../../redux/staff";

const HardWareComponent = ({ type }) => {
  const refetchData = useSelector(getDataRefetch);

  const {
    data: hardwareData,
    isFetching: hardwareFetching,
    refetch: hardwareRefetch,
  } = useFetchDatahardware(type);

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  useEffect(() => {
    hardwareRefetch();
  }, [refetchData]);
  const handleOpen = (data) => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          backgroundColor: "#EAECF0",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: 15,
        }}
      >
        {" "}
        <div
          style={{
            width: "27%",
            padding: 8,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        <div
          style={{
            width: "30%",
            padding: 8,
          }}
        >
          Part Number{" "}
        </div>{" "}
        <div
          style={{
            width: "38%",
            padding: 8,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "20%",
            padding: 8,
          }}
        >
          Status
        </div>{" "}
        <div style={{ width: "22%", textAlign: "right" }}>
          <IconButton
            onClick={handleOpen}
            sx={{
              color: "#8477DA",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 17,
            }}
          >
            <img width={"25px"} height={"20px"} src={AddIcon} alt="add icon" />
            Add
          </IconButton>
        </div>{" "}
      </div>
      {hardwareFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",
            height: "60%",
          }}
        >
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
        </Box>
      ) : hardwareData?.length >= 1 ? (
        <Box
          className="HardwareTable"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowY: "scroll",
          }}
        >
          {hardwareData?.map((entry, mainIndex) => (
            <HardwareItem
              key={mainIndex}
              entry={entry}
              mainIndex={mainIndex}
              hardwareRefetch={hardwareRefetch}
              type={type}
            />
          ))}
        </Box>
      ) : (
        <Typography
          sx={{ textAlign: "center", py: 2, fontSize: 20, color: "gray" }}
        >
          No {type} Found
        </Typography>
      )}

      <AddEditHardware
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={hardwareRefetch}
        categorySlug={type}
      />
    </>
  );
};

export default HardWareComponent;
