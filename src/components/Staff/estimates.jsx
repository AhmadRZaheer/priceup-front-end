import { Box, Button, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeStateForEditQuote,
  setListData,
  setNavigationDesktop,
  setQuoteState,
} from "../../redux/estimateCalculations";
import {
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import { makeStyles } from "@material-ui/core";
import { backendURL } from "../../utilities/common";
import ModeIcon from "@mui/icons-material/Mode";
import { getDataRefetch } from "../../redux/staff";
import { useEffect } from "react";
import ExistingTable from "../Estimates/existingTable";
import { getEstimatesListRefetch } from "../../redux/refetch";

export default function Estimates() {
  const refetchData = useSelector(getDataRefetch);   // refetch if staff switch location
  const refetchEstimatesCounter = useSelector(getEstimatesListRefetch);  // refetch estimates list on any action
  const { data: estimatesList, isLoading: estimatesFetching, refetch: refetchEstimatesList } = useGetEstimates();
  const {
    data: allHardwaresList,
    isLoading: listFetching,
    refetch: refetchHardwaresList,
  } = useFetchDataEstimate();
  const dispatch = useDispatch();
  useEffect(() => {
    refetchEstimatesList();
    if (refetchEstimatesCounter <= 0) {
      refetchHardwaresList();
    }
  }, [refetchEstimatesCounter, refetchData]);
  const handleIconButtonClick = (item) => {
    dispatch(setListData(allHardwaresList));
    dispatch(
      initializeStateForEditQuote({
        estimateData: item,
        quotesId: item._id,
      })
    );
    dispatch(setNavigationDesktop("review"));
  };
  const handleCreateQuote = () => {
    dispatch(setListData(allHardwaresList));
    dispatch(setQuoteState("create"));
    dispatch(setNavigationDesktop("layouts"));
  };
  const useStyles = makeStyles({
    overflowText: {
      maxWidth: "115px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  });
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box>
      {estimatesFetching || listFetching ? (
        <Box
          sx={{
            width: 40,
            m: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <Box>
          {isMobile ? (<Box
            sx={{
              height: "100vh",
            }}
          >
            <Box>
              <Box
                sx={{
                  paddingY: 2,
                  paddingX: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: { xs: 7, sm: 0 },
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
                  Estimates
                </Typography>
              </Box>

              <Box
                sx={{
                  paddingX: 2,
                  marginTop: 2,
                  height: "68vh",
                  overflow: "auto",
                }}
              >
                {estimatesFetching ? (
                  <Box
                    sx={{
                      width: 40,
                      m: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 600,
                    }}
                  >
                    <CircularProgress sx={{ color: "#8477DA" }} />
                  </Box>
                ) : (
                  estimatesList?.estimates?.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingY: 2,
                        borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            width={40}
                            src={`${backendURL}/${item?.creatorData?.image}`}
                            alt="image person"
                          />
                        </Box>

                        <Box>
                          <Box sx={{ display: "flex", gap: 0.6 }}>
                            <Typography className={classes.overflowText}>
                              {item?.creatorData?.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 16, fontWeight: "Medium" }}
                            >
                              {" "}
                              - Creator
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.6 }}>
                            <Typography sx={{ fontSize: 14 }}>
                              {item?.customerData?.name}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }}>
                              {" "}
                              - Customer
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          width: 100,
                        }}
                      >
                        <Typography color="red" marginRight={3}></Typography>

                        <Button
                          onClick={() => handleIconButtonClick(item)}
                          sx={{
                            height: 25,
                            color: "white",
                            background: "#8477DA",
                            "&:hover": { background: "#8477DA" },
                            width: "fit-content",
                            margin: "0px auto",
                          }}
                          disabled={estimatesFetching}
                        >
                          <ModeIcon
                            sx={{
                              color: "white",
                              fontSize: "17px",
                              marginRight: "5px",
                            }}
                          />
                          Edit
                        </Button>
                        <Typography sx={{ fontWeight: "Medium", fontSize: 12 }}>
                          {new Date(item?.updatedAt).toDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                paddingY: "20px",
                borderTop: "1px solid rgba(102, 112, 133, 0.5)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginRight: { sm: 35 },
                }}
              >
                <Button
                  onClick={handleCreateQuote}
                  disabled={estimatesFetching}
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                    width: "200px",
                    background: "#8477DA",
                    color: "white",
                    fontSize: 18,
                    "&:hover": { background: "#8477DA", color: "white" },
                    margin: "0px",
                  }}
                >
                  Create New Estimate
                </Button>
              </Box>
            </Box>
          </Box>
          ) : (<Box sx={{ paddingX: "30px" }}>
            <Box>
              <Typography sx={{ fontSize: 30, pb: 2, color: "#101828" }}>
                Estimates
              </Typography>
            </Box>
            <Box sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}>
              <ExistingTable estimatesList={estimatesList} allHardwaresList={allHardwaresList} />
            </Box>
          </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
