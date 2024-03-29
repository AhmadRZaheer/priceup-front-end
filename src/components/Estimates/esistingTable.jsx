import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import {
  useDeleteEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import { useDispatch } from "react-redux";
import {
  initializeStateForEditQuote,
  setNavigationDesktop,
  setQuoteState,
} from "../../redux/estimateCalculations";
import { Link } from "react-router-dom";
import { backendURL } from "../../utilities/common";
import { useEffect } from "react";

export default function ExistingTable() {
  const { data, isFetching, refetch } = useGetEstimates();
  const {
    data: estimateListData,
    isFetching: estimateDataFetching,
    refetch: Refetched,
  } = useFetchDataEstimate();

  const { mutate: deleteEstimates, isSuccess: deletedSuccesfully } =
    useDeleteEstimates();
  const dispatch = useDispatch();

  const handleDeleteEstimate = (id) => {
    deleteEstimates(id);
  };
  useEffect(() => {
    refetch()
  }, [deletedSuccesfully])

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
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            border: "1px solid #f0ecec",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 0.6 }}>
              Estimates 
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
            <Typography sx={{ width: 180 }}>Status</Typography>
            <Typography sx={{ width: 60 }}></Typography>
          </Box>
          {data?.estimates?.length >= 1 ? (
            data?.estimates?.map((item) => (
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
                    <Typography sx={{ fontSize: 13, p: 0, mt: -0.4 }}>
                      {item.creatorData.email}
                    </Typography>
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
                <Typography sx={{ width: 200, py: 1 }}>
                  ${item?.cost?.toFixed(2) || 0}
                </Typography>
                <Typography sx={{ width: 170, py: 1 }}>
                  {item?.status}
                </Typography>
                  <IconButton
                    onClick={() => handleDeleteEstimate(item._id)}
                    sx={{
                      padding: 0,
                      margin: 0,
                      borderRadius: "100%",
                      mt: -1,
                      mr: 1,
                      "&:hover": { backgroundColor: "white" },
                      "&:active": { backgroundColor: "white" },
                    }}
                  >
                    <Delete sx={{ color: "#667085", fontSize: 25, py: 0.8 }} />
                  </IconButton>
                <Link
                  to="/Estimates/Steps"
                  style={{ marginLeft: 2, marginRight: 1 }}
                >
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
                    <Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />
                    Edit
                  </IconButton>
                </Link>
              </Box>
            ))
          ) : (
            <Box>
              <Typography
                sx={{ py: 1, fontSize: 18, color: "gray", textAlign: "center" }}
              >
                No Estimates Found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
