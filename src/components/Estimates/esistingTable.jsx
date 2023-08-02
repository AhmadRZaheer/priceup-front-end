import {
  Add,
  Edit,
} from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import {
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/Estimate";
import { useDispatch } from "react-redux";
import {
  initializeStateForEditQuote,
  setNavigationDesktop,
  setQuoteState,
} from "../../redux/estimateCalculations";
import { Link } from "react-router-dom";
import { backendURL } from "../../utilities/common";

export default function ExistingTable() {
  const { data , isFetching } = useGetEstimates();
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
    dispatch(setNavigationDesktop("review"));
  };
  const handleCreateQuote = () => {
    dispatch(setQuoteState("create"));
    dispatch(setNavigationDesktop("Layout"));
  };
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
            maxHeight: "70vh",
            minHeight: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "white", width: "100%", border: "1px solid #f0ecec" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 0.6 }}>
              Estimates Queue
            </Typography>
            <Link to="/Estimates/Steps">
              <IconButton
                onClick={handleCreateQuote}
                disabled={estimateDataFetching}
                sx={{
                  backgroundColor: "#8477DA",
                  color: "white",
                  "&:hover": { backgroundColor: "#8477DA" },
                  borderRadius: 1,
                  padding: 1,
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                <Add sx={{ fontSize: 20, color: "white" }} />
                Add
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ display: "flex", backgroundColor: "#e8e8e8", p: 2 }}>
            <Typography sx={{ width: 280 }}>Creator Name</Typography>
            <Typography sx={{ width: 220 }}>Customer Name</Typography>
            <Typography sx={{ width: 250 }}>Customer Email</Typography>
            <Typography sx={{ width: 180 }}>Date Quoted</Typography>
            <Typography sx={{ width: 200 }}>Estimated Total</Typography>
            {/* <Typography sx={{ width: 180 }}>Measurer</Typography> */}
            <Typography sx={{ width: 180 }}>Status</Typography>
            <Typography sx={{ width: 60 }}></Typography>
          </Box>

          {data?.estimates?.map((item) => (
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #f0ecec",
                p: 2,
              }}
            >
              <Box sx={{ width: 290, display: "flex", gap: 1 }}>
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
                    src={`${backendURL}/${item.creatorData.image}`}
                    alt="image person"
                  />
                </Box>
                <Box>
                <Typography>{item.creatorData.name}</Typography>
                <Typography sx={{fontSize: 13, p:0, mt: -0.4}}>{item.creatorData.email}</Typography>
                </Box>
              </Box>
              <Typography sx={{ width: 210, py: 1 }}>
                {item.customerData.name}
              </Typography>
              <Typography sx={{ width: 250, py: 1 }}>
                {item.customerData.email}
              </Typography>
              <Typography sx={{ width: 190, py: 1 }}>
              {new Date(item?.updatedAt).toDateString()}
              </Typography>
              <Typography sx={{ width: 200, py: 1 }}>${item?.cost?.toFixed(2) || 0}</Typography>
              {/* <Typography sx={{ width: 180 }}></Typography> */}
              <Typography sx={{ width: 170, py: 1 }}>{item?.status}</Typography>

              {/* <DeleteOutline
                sx={{ color: "rgb(255, 103, 96)", fontSize: 25, py: 0.8 }}
              /> */}
              <Link to="/Estimates/Steps" style={{marginLeft: 2, marginRight: 1,}} >
                <IconButton
                  onClick={() => handleIconButtonClick(item)}
                  sx={{
                    backgroundColor: "#8477DA",
                    "&:hover": { backgroundColor: "#8477DA" },
                    color: "white",
                    textTransform: "capitalize",
                    borderRadius: 1,
                    fontSize: 16,
                    paddingY: 0.8,
                    px: 0.8,
                  }}
                  disabled={estimateDataFetching}
                >
                  <Edit sx={{ color: "white", fontSize: 18 ,mr: 0.4}} />
                  Edit
                </IconButton>
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
