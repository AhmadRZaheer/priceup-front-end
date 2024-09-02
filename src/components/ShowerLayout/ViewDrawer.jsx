import { Box, Button, Grid, SwipeableDrawer, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getDefaultId } from "@/redux/defaultSlice";
// import { useFetchSingleDefault } from "@/utilities/ApiHooks/defaultLayouts";
import { backendURL } from "@/utilities/common";
import image from "../../Assets/dummy.png";
import "./style.scss";

// const modification = [
//   { id: 1, name: "Hardware Finishes" },
//   { id: 2, name: "Handles" },
//   // Add other modifications as necessary
// ];

const ViewDrawer = ({ open, handleClose, data }) => {
  const navigate = useNavigate();

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDrawer-paper": {
          top: { sm: "69px", xs: "57px" },
          boxShadow: "none",
          borderTopLeftRadius: 16,
          padding: "32px 12px",
          border: "0.5px solid #F3F5F6",
          width: { sm: "573px", xs: "100%" },
        },
      }}
    >
      {/* {data && ( */}
      <Box
        sx={{ pl: 2, gap: "20px" }}
        role="presentation"
        onKeyDown={handleClose}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <img
            src={data?.image ? `${backendURL}/${data.image}` : image}
            alt={data?.name || "Placeholder"}
            style={{ width: "60px", height: "79px" }}
          />
          <p className="cardTitle">{data?.name}</p>
        </Box>
        {data && (
          <Box sx={{ overflowY: "auto", height: "calc(100vh - 265px)" }}>
            <Grid
              container
              // spacing={2}
              gap={2}
              sx={{
                py: 1,

                m: 0,
                width: "100%",
              }}
            >
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">
                  Hardware Finishes
                </Typography>
                <Typography className="drawerBoldTitle">
                  {data.settings?.hardwareFinishes?.name ? data.settings?.hardwareFinishes?.name : '---'}
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">Handles</Typography>
                <Typography className="drawerBoldTitle">
                  {data.settings?.handles?.handleType?.name ? `${data.settings?.handles?.handleType?.name}(
                  ${data.settings?.handles?.count})` : '---'
                  }
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">Glass Type</Typography>
                <Typography className="drawerBoldTitle">
                  {data.settings?.glassType?.type?.name ? `${data.settings?.glassType?.type?.name}(
                  ${data.settings?.glassType?.thickness})` : '---'
                  }
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">Hinges</Typography>
                <Typography className="drawerBoldTitle">
                  {data.settings?.hinges?.hingesType?.name ? `${data.settings?.hinges?.hingesType?.name}(
                    ${data.settings?.hinges?.count})` : '---'
                  }
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">
                  Heavy Duty Option{" "}
                </Typography>
                <Typography className="drawerBoldTitle">
                  {data.settings?.heavyDutyOption?.heavyDutyType?.name ? `${data.settings?.heavyDutyOption?.heavyDutyType?.name}(
                  ${data.settings?.heavyDutyOption?.height})` : '---'
                  }
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">
                  Active Mounting{" "}
                </Typography>
                <Typography className="drawerBoldTitle">
                  {`${data.settings?.channelOrClamps ?? "------"}`}
                </Typography>
              </Grid>
              {data.settings?.mountingChannel?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Mounting Channel{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.mountingChannel?.name}
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.cornerWallClamp?.wallClampType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Wall Clamps (corner){" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.cornerWallClamp?.wallClampType?.name} ({data.settings?.cornerWallClamp?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.cornerSleeveOver?.sleeveOverType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Sleeve Over (corner){" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.cornerSleeveOver?.sleeveOverType?.name} ({data.settings?.cornerSleeveOver?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.cornerGlassToGlass?.glassToGlassType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Glass To Glass (corner){" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.cornerGlassToGlass?.glassToGlassType
                      ?.name}
                    ({data.settings?.cornerGlassToGlass?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.wallClamp?.wallClampType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Wall Clamps{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.wallClamp?.wallClampType?.name} ({data.settings?.wallClamp?.count})
                  </Typography>
                </Grid>
              ) : ''}

              {data.settings?.sleeveOver?.sleeveOverType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Sleeve Over{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.sleeveOver?.sleeveOverType?.name} ({data.settings?.sleeveOver?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.glassToGlass?.glassToGlassType?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Glass To Glass{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.glassToGlass?.glassToGlassType?.name} ({data.settings?.glassToGlass?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.slidingDoorSystem?.type?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Sliding Door System{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.slidingDoorSystem?.type?.name}  ({data.settings?.slidingDoorSystem?.count})
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.outages ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">Outages </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.outages}
                  </Typography>
                </Grid>
              ) : ''}
              {/* {data.settings?.transom?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Transom (if full height)
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.transom?.name}
                  </Typography>
                </Grid>
              ) : ''} */}
              {data.settings?.header?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Header (if not full height)
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.header?.name}
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.glassAddon?.name ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">
                    Glass Addon{" "}
                  </Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.glassAddon?.name}
                  </Typography>
                </Grid>
              ) : ''}
              {data.settings?.notch ? (
                <Grid
                  item
                  xs={5.5}
                  className="cardTitleContainer"
                  sx={{ py: 1, height: "fit-content" }}
                >
                  <Typography className="drawerTitle">Notch</Typography>
                  <Typography className="drawerBoldTitle">
                    {data.settings?.notch}
                  </Typography>
                </Grid>
              ) : ''}
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">People</Typography>
                <Typography className="drawerBoldTitle">
                  {`${data.settings?.other?.people ?? 0}`}
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.5}
                className="cardTitleContainer"
                sx={{ py: 1, height: "fit-content" }}
              >
                <Typography className="drawerTitle">Hours</Typography>
                <Typography className="drawerBoldTitle">
                  {`${data.settings?.other?.hours ?? 0}`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 5,
            gap: "12px",
          }}
        >
          <Button
            onClick={handleClose}
            variant="text"
            className="drawerBtn"
            sx={{ border: "1px solid #8477DA", color: "#8477DA" }}
          >
            Close
          </Button>
          <Button
            onClick={() => navigate(`/layouts/edit?id=${data._id}`)}
            variant="contained"
            className="drawerBtn"
            sx={{
              background: "#8477DA",
              ":hover": { background: "#8477DA" },
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default ViewDrawer;
