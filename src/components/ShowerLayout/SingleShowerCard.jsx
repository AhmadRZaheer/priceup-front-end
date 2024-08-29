import { useState } from "react";
import "./style.scss";
import { Box, Button, Divider, Typography } from "@mui/material";
// import image from "../../Assets/dummy.png";
import ViewDrawer from "./ViewDrawer";
import { useNavigate } from "react-router-dom";
import { backendURL } from "@/utilities/common";
import { useDispatch } from "react-redux";
// import { setDefaultId } from "@/redux/defaultSlice";

const SingleShowerCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const handleOpenDrawer = () => {
    setSelectedLayout(data);
    setOpenDrawer(true);
  }
  const handleCloseDrawer = () => {
    setSelectedLayout(null);
    setOpenDrawer(false);
  };

  return (
    <>
      {data && (
        <Box
          sx={{
            width: { lg: "414px", xs: "600px" },
            borderRadius: "8px",
            border: "1px solid #D0D5DD",
            // height: "319px",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            padding: "16px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
            <img
              src={`${backendURL}/${data?.image}`}
              alt={data?.name}
              style={{ width: "59.99px", height: "79px" }}
            />
            <p className="cardTitle">{data?.name}</p>
          </Box>
          <Divider sx={{ borderColor: "#D0D5DD" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box className="cardTitleContainer" sx={{ gap: "14px" }}>
              <Box className="cardTitleContainer">
                <Typography className="descTitle">Hardware Finishes</Typography>
                <Typography className="descBoldTitle">
                  {data.settings?.hardwareFinishes?.name ? data.settings?.hardwareFinishes?.name : '---'}
                </Typography>
              </Box>

              <Box className="cardTitleContainer">
                <Typography className="descTitle">Hinges</Typography>
                <Typography className="descBoldTitle">
                  {data.settings?.hinges?.hingesType?.name ? `${data.settings?.hinges?.hingesType?.name}(
                    ${data.settings?.hinges?.count})` : '---'
                  }
                </Typography>
              </Box>
            </Box>

            <Box className="cardTitleContainer">
              <Typography className="descTitle">Handles</Typography>
              <Typography className="descBoldTitle">
                {data.settings?.handles?.handleType?.name ? `${data.settings?.handles?.handleType?.name}(
                  ${data.settings?.handles?.count})` : '---'
                }
              </Typography>
            </Box>
            <Box className="cardTitleContainer">
              <Typography className="descTitle">Glass Type</Typography>
              <Typography className="descBoldTitle">
                {data.settings?.glassType?.type?.name ? `${data.settings?.glassType?.type?.name}(
                  ${data.settings?.glassType?.thickness})` : '---'
                }
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ borderColor: "#D0D5DD" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <Button
              onClick={handleOpenDrawer}
              variant="text"
              className="cardBtn"
              sx={{
                border: "1px solid #8477DA",
                color: "#8477DA",
                width: "100%",
              }}
            >
              View
            </Button>
            <Button
              onClick={() => {
                // dispatch(setDefaultId(data._id));
                navigate(`/layouts/edit?id=${data._id}`);
              }}
              variant="contained"
              className="cardBtn"
              sx={{
                background: "#8477DA",
                ":hover": { background: "#8477DA" },
                width: "100%",
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      )}
      <ViewDrawer
        open={openDrawer}
        handleClose={handleCloseDrawer}
        data={selectedLayout}
      />
    </>
  );
};

export default SingleShowerCard;
