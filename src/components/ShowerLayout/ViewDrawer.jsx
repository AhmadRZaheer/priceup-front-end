import { Box, Button, Grid, SwipeableDrawer, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDefaultId } from "@/redux/defaultSlice";
import { useFetchSingleDefault } from "@/utilities/ApiHooks/defaultLayouts";
import { backendURL } from "@/utilities/common";
import image from "../../Assets/dummy.png";
import "./style.scss";

const modification = [
  { id: 1, name: "Hardware Finishes" },
  { id: 2, name: "Handles" },
  // Add other modifications as necessary
];

const ViewDrawer = ({ state, toggleDrawer }) => {
  const navigate = useNavigate();
  const defaultId = useSelector(getDefaultId);

  const {
    data: singleDefault,
    isFetching: isfetchingDefaultSingle,
    refetch,
  } = useFetchSingleDefault(defaultId);

  const LayoutData = singleDefault?.layoutData;

  const ListData = useMemo(() => {
    if (singleDefault && LayoutData) {
      const hardwareFinish = singleDefault.listData.hardwareFinishes.find(
        (item) => item._id === LayoutData.settings.hardwareFinishes
      );

      console.log(hardwareFinish, "hardwareFinishes");
      return { hardwareFinishes: hardwareFinish };
    }
    return { hardwareFinishes: [] };
  }, [singleDefault, LayoutData]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SwipeableDrawer
      anchor="right"
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
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
      <Box
        sx={{ pl: 2, gap: "20px" }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <img
            src={
              LayoutData?.image ? `${backendURL}/${LayoutData.image}` : image
            }
            alt={LayoutData?.name || "Placeholder"}
            style={{ width: "60px", height: "79px" }}
          />
          <p className="cardTitle">{LayoutData?.name}</p>
        </Box>

        <Grid
          container
          // spacing={2}
          gap={2}
          sx={{ py: 1, overflowY: "auto", height: "calc(100vh - 265px)" }}
        >
          <Grid item xs={6} className="cardTitleContainer" sx={{ py: 1 }}>
            <Typography className="drawerTitle">Hardware Finishes</Typography>
            <Typography className="drawerBoldTitle">
              {ListData.hardwareFinishes.name}
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 5,
            gap: "12px",
          }}
        >
          <Button
            onClick={toggleDrawer(false)}
            variant="text"
            className="drawerBtn"
            sx={{ border: "1px solid #8477DA", color: "#8477DA" }}
          >
            Close
          </Button>
          <Button
            onClick={() => navigate("/layouts/edit")}
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
