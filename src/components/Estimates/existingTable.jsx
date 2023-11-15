import { useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import {
  useDeleteEstimates,
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";
import { useDispatch } from "react-redux";
import { Input } from "@mui/material";
import {
  addSelectedItem,
  initializeStateForEditQuote,
  resetState,
  setListData,
  setNavigationDesktop,
  setQuoteState,
} from "../../redux/estimateCalculations";
import PlusWhiteIcon from "../../Assets/plus-white.svg";
import { Link, useNavigate } from "react-router-dom";
import { backendURL } from "../../utilities/common";
import { useEffect } from "react";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomIconButton from "../ui-components/CustomButton";
export default function ExistingTable() {
  const { data, isFetching, refetch } = useGetEstimates();
  const navigate = useNavigate();

  console.log("data", data);
  const {
    data: estimateListData,
    isFetching: estimateDataFetching,
    refetch: Refetched,
  } = useFetchDataEstimate();
  const { mutate: deleteEstimates, isSuccess: deletedSuccessfully } =
    useDeleteEstimates();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const filteredData = data?.estimates?.filter((item) =>
    item.customerData.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteEstimate = (id) => {
    deleteEstimates(id);
  };

  useEffect(() => {
    refetch();
  }, [deletedSuccessfully]);

  const handleIconButtonClick = (item) => {
    dispatch(resetState());
    dispatch(setListData(estimateListData));
    dispatch(
      initializeStateForEditQuote({
        estimateData: item,
        quotesId: item._id,
      })
    );
    dispatch(addSelectedItem(item));
    dispatch(setQuoteState("edit"));
    dispatch(setNavigationDesktop("review"));
  };

  const handleCreateQuote = () => {
    dispatch(setQuoteState("create"));
    dispatch(setNavigationDesktop("layouts"));
    navigate("/estimates/steps");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: "bold", color: "#101828" }}>
          Estimates
        </Typography>
        {/* Search input field */}
        <TextField
          placeholder="Search by Name"
          value={search}
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            ".MuiInputBase-root:after": {
              border: "1px solid #8477DA",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#8477DA" }} />
              </InputAdornment>
            ),
          }}
        />
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
            height: 35,
          }}
        >
          <img
            width={"26px"}
            height={"20px"}
            src={PlusWhiteIcon}
            alt="plus icon"
          />
          Add
        </IconButton>
      </Box>
      <Box>
        {/* Table header */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#F9FAFB",
            p: 2,
          }}
        >
          <Typography sx={{ width: 280, color: "#667085" }}>
            Creator Name
          </Typography>
          <Typography sx={{ width: 220, color: "#667085" }}>
            Customer Name
          </Typography>
          <Typography sx={{ width: 250, color: "#667085" }}>
            Customer Email
          </Typography>
          <Typography sx={{ width: 180, color: "#667085" }}>
            Date Quoted
          </Typography>
          <Typography sx={{ width: 200, color: "#667085" }}>Total</Typography>
          <Typography sx={{ width: 180, color: "#667085" }}>Status</Typography>
          <Typography sx={{ width: 60 }}></Typography>
        </Box>

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
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "white",
              width: "100%",
              border: "1px solid #f0ecec",
            }}
          >
            {filteredData.length >= 1 ? (
              filteredData.map((item) => {
                if (item?.creatorData && item?.creatorData?.name) {
                  var firstNameInitial = item?.creatorData?.name.charAt(0);
                } else {
                  var firstNameInitial = "";
                }
                if (item && item?.creatorData?.name) {
                  var lastNameInitial = item?.creatorData?.name.charAt(1);
                } else {
                  var lastNameInitial = "";
                }
                return (
                  <Box
                    key={item._id}
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
                        {item.creatorData.image ===
                        "images/users/default.jpg" ? (
                          <Typography
                            sx={{
                              backgroundColor: "#F9F5FF",
                              width: 34,
                              height: 34,
                              borderRadius: "100%",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#7F56D9",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          >
                            {firstNameInitial}
                            {lastNameInitial}
                          </Typography>
                        ) : (
                          <img
                            width={40}
                            src={`${backendURL}/${item.creatorData.image}`}
                            alt="image person"
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography>{item.creatorData.name}</Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            p: 0,
                            mt: -0.4,
                            color: "#667085",
                          }}
                        >
                          {item.creatorData.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ width: 210, py: 1, color: "#667085" }}>
                      {item.customerData.name}
                    </Typography>
                    <Typography sx={{ width: 250, py: 1, color: "#667085" }}>
                      {item.customerData.email}
                    </Typography>
                    <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
                      {new Date(item?.updatedAt).toDateString()}
                    </Typography>
                    <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
                      ${item?.cost?.toFixed(2) || 0}
                    </Typography>
                    <Typography
                      sx={{
                        width: 170,
                        py: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "fit-content",
                          bgcolor:
                            item?.status === "pending" ? "#FEF3F2" : "#ECFDF3",
                          borderRadius: "16px",
                          color:
                            item?.status === "pending" ? "#B42318" : "#027A48",
                          pl: 1.8,
                          pt: 0.3,
                          pr: 1.8,
                          pb: 0.5,
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "6px",
                            height: "6px",
                            bgcolor:
                              item?.status === "pending"
                                ? "#B42318"
                                : "#027A48",
                            borderRadius: "100%",
                            mt: 0.2,
                          }}
                        ></Box>
                        {item?.status}
                      </Box>
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteEstimate(item._id)}
                      sx={{
                        padding: 1,
                        margin: 0,
                        borderRadius: "100%",
                        mt: -0.5,
                        mr: 1,
                        "&:hover": { backgroundColor: "white" },
                        "&:active": { backgroundColor: "white" },
                      }}
                    >
                      <img
                        width={"20px"}
                        height={"20px"}
                        src={DeleteIcon}
                        alt="delete icon"
                      />
                    </IconButton>
                    <Link
                      to="/estimates/steps"
                      style={{ marginLeft: 2, marginRight: 1, marginTop: 6 }}
                    >
                      <CustomIconButton
                        handleClick={() => handleIconButtonClick(item)}
                        disable={estimateDataFetching}
                        buttonText="Edit"
                        icon={
                          <Edit
                            sx={{ color: "white", fontSize: 18, mr: 0.4 }}
                          />
                        }
                      />
                    </Link>
                  </Box>
                );
              })
            ) : (
              <Box>
                <Typography
                  sx={{
                    py: 1,
                    fontSize: 18,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  No Estimates Found
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
