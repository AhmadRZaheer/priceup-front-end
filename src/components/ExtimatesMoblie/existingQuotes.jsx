import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  initializeStateForEditQuote,
  setNavigation,
  setQuoteState,
} from "../../redux/estimateCalculations";
import {
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/Estimate";
import { makeStyles } from "@material-ui/core";
import { backendURL } from "../../utilities/common";
import ModeIcon from "@mui/icons-material/Mode";

export default function ExitingQuotes() {
  const { data, isFetching } = useGetEstimates();
  const { data: estimateListData, isFetching: estimateDataFetching } =
    useFetchDataEstimate();
  const dispatch = useDispatch();
  const handleIconButtonClick = (item) => {
    dispatch(
      initializeStateForEditQuote({
        estimateData: item,
        listData: estimateListData,
        quotesId: item._id,
      })
    );
    dispatch(setNavigation("review"));
  };
  const handleCreateQuote = () => {
    dispatch(setQuoteState("create"));
    dispatch(setNavigation("layout"));
  };
  const useStyles = makeStyles({
    overflowText: {
      maxWidth: '115px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  });
  const classes = useStyles();
  return (
    <>
      {isFetching || estimateDataFetching ? (
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
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 8,
            height: "92.8vh",
            color: "#ffff",
            backgroundColor: "rgba(16, 13, 36, 1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
          }}
        >
          <Box sx={{}}>
            <Box
              sx={{
                paddingY: 2,
                paddingX: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
                Existing Quotes
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
              {isFetching ? (
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
                  <CircularProgress sx={{}} />
                </Box>
              ) : (
               data?.estimates?.map((item) => (
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
                      <Box sx={{ width: 40, height: 40, borderRadius: "100%", overflow: "hidden" }}>
                        <img width={40} src={`${backendURL}/${item?.creatorData?.image}`} alt="image person" />
                      </Box>

                      <Box>
                        <Box sx={{ display: "flex", gap: 0.6 }}>
                          <Typography  className={classes.overflowText}>{item?.creatorData?.name}</Typography>
                          <Typography sx={{fontSize: 16, fontWeight: "Medium"}}> - Creator</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 0.6  }}>
                          <Typography sx={{fontSize: 14}}>{item?.customerData?.name}</Typography>
                          <Typography sx={{fontSize: 14}}> - Customer</Typography>
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
                        sx={{ height: 25,color:'white',background: "#8477DA","&:hover": { background: "#8477DA",},width:'fit-content',margin:'0px auto' }}
                        disabled={estimateDataFetching}
                      >
                        <ModeIcon sx={{color: "white",fontSize:'17px',marginRight:'5px'}} />
                        Edit
                      </Button>
                      <Typography sx={{ fontWeight: "Medium", fontSize: 12 }}>
                        {new Date(item?.updatedAt).toDateString()}
                      </Typography>
                    </Box>
                  </Box>
                )))}
            </Box>
          </Box>
          <Box
            sx={{
              paddingX: 2,
              py: 3,
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "92%",
              borderTop: "1px solid rgba(102, 112, 133, 0.5)",
            }}
          >
            <Button
              onClick={handleCreateQuote}
              disabled={estimateDataFetching}
              color="primary"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                background: "#8477DA",
                color: "white",
                fontSize: 18,
                "&:hover": { background: "#8477DA", color: "white" },
              }}
            >
              Create New Qoute
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
