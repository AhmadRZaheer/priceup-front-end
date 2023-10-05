import React from 'react';
import { Box, Button } from "@mui/material";
import { setNavigation } from "../../redux/estimateCalculations";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getContent,
  getLayoutArea,
  getQuoteState,
  getTotal,
  getMeasurementSide,
  getLayoutPerimeter,
  getQuoteId,
} from "../../redux/estimateCalculations";
import { useEditEstimates, useFetchDataEstimate } from "../../utilities/ApiHooks/estimate";
import Snackbars from "../Modal/snackBar";
import { useNavigate } from 'react-router-dom';

const QuotesFooter = ({ navigateNext,type, navigateBack, disabled }) => {
  const navigate = useNavigate()
  const {
    mutate: mutateEdit,
    isError: ErrorForAddEidt,
    isSuccess: CreatedSuccessfullyEdit,
  } = useEditEstimates();
  const estimatesContent = useSelector(getContent);
  const estimatesTotal = useSelector(getTotal);
  const measurements = useSelector(getMeasurementSide);
  const perimeter = useSelector(getLayoutPerimeter);
  const quoteId = useSelector(getQuoteId);
  const sqftArea = useSelector(getLayoutArea);
  const updatecheck = useSelector(getQuoteState);

  const dispatch = useDispatch();
  const handleEditEstimate = () => {
    const hardwareAddonsArray = estimatesContent?.hardwareAddons?.map((row)=>{
      return {
        type: row.item._id,
        count:row.count
      }
    });
    const wallClampArray = estimatesContent?.mountingClamps?.wallClamp?.map((row)=>{
      return {
        type: row.item._id,
        count:row.count
      }
    });
    const sleeveOverArray = estimatesContent?.mountingClamps?.sleeveOver?.map((row)=>{
      return {
        type: row.item._id,
        count:row.count
      }
    });
    const glassToGlassArray = estimatesContent?.mountingClamps?.glassToGlass?.map((row)=>{
      return {
        type: row.item._id,
        count:row.count
      }
    });
    const glassAddonsArray = estimatesContent?.glassAddons?.map((item)=>item?._id);
    const estimate = {
      hardwareFinishes: estimatesContent?.hardwareFinishes?._id,
      handles: {
        type: estimatesContent?.handles?.item?._id,
        count: estimatesContent?.handles?.count,
      },
      hinges: {
        type: estimatesContent?.hinges?.item?._id,
        count: estimatesContent?.hinges?.count,
      },
      mountingClamps: {
          wallClamp: [...wallClampArray],
          sleeveOver: [...sleeveOverArray],
          glassToGlass: [...glassToGlassArray],
      },
      mountingChannel: estimatesContent?.mountingChannel?.item?._id || null,
      glassType: {
        type: estimatesContent?.glassType?.item?._id,
        thickness: estimatesContent?.glassType?.thickness,
      },
      glassAddons: [...glassAddonsArray],
      slidingDoorSystem: {
        type: estimatesContent?.slidingDoorSystem?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      header: {
        type: estimatesContent?.header?.item?._id,
        count: estimatesContent?.slidingDoorSystem?.count,
      },
      oneInchHoles: estimatesContent?.oneInchHoles,
      hingeCut: estimatesContent?.hingeCut,
      clampCut: estimatesContent?.clampCut,
      notch: estimatesContent?.notch,
      outages: estimatesContent?.outages,
      mitre: estimatesContent?.mitre,
      polish: estimatesContent?.polish,
      people: estimatesContent?.people,
      hours: estimatesContent?.hours,
      cost: Number(estimatesTotal),
      hardwareAddons: [...hardwareAddonsArray],
      sleeveOverCount: estimatesContent?.sleeveOverCount,
      towelBarsCount: estimatesContent?.sleeveOverCount,
      measurements: measurements,
      perimeter: perimeter,
      sqftArea: sqftArea,
    };

    mutateEdit({
      customerData: {},
      estimateData: estimate,
      id: quoteId,
    });
  }
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };
  const {
    refetch: Refetched,
  } = useFetchDataEstimate();
  React.useEffect(() => {
    if (CreatedSuccessfullyEdit) {
      showSnackbar("Estimate Updated successfully", "success");
      dispatch(setNavigation("existing"));
      Refetched();
      navigate('/estimates');
    } else if (ErrorForAddEidt) {
      const errorMessage = ErrorForAddEidt.message || "An error occurred";
      showSnackbar(errorMessage, "error");
    }
  }, [CreatedSuccessfullyEdit, ErrorForAddEidt]);
  const nextClickHandler = () => {
    if(type !== "submit"){
      dispatch(setNavigation(navigateNext));
    }
  }
  const closeSnackbar = () => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  return (
    <Box>
    <Box
      sx={{
        display: { md: "none", xs: "flex" },
        gap: 2,
        justifyContent: "center",
        width: "93%",
        paddingX: 2,
        paddingY: 2,
        position: "fixed",
        bottom: 0,
        backgroundColor: "#100d24",
        borderTop: "1px solid #423f57",
      }}
    >
      <Box sx={{ width: { md: "150px", xs: "50%" } }}>
        <Button
          fullWidth
          onClick={() => {
            dispatch(setNavigation(navigateBack));
          }}
          sx={{
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            color: "#344054",
            textTransform: "initial",
            border: "1px solid #D0D5DD",
            backgroundColor: { md: "transparent", xs: "white" },
          }}
        >
          {" "}
          Back
        </Button>
      </Box>

      <Box sx={{ width: { md: "150px", xs: "50%" } }}>
        <Button
          fullWidth
          disabled={disabled}
          type={type}
          variant="contained"
          onClick={() => {
            if (["create", "custom"].includes(updatecheck)) {
              nextClickHandler()
            }
            else{
              handleEditEstimate()
            }
          }}

          sx={{
            backgroundColor: "#8477da",
            "&:hover": {
              backgroundColor: "#8477da",
            },
          }}
        >
          {" "}
          Next
        </Button>
      </Box>
    </Box>
    <Snackbars
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          closeSnackbar={closeSnackbar}
        />
    </Box>
  );
};

export default QuotesFooter;
