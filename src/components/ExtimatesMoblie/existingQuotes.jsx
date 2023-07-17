import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import logout from "../../Assets/estimates/log-out.svg";
import pencil from "../../Assets/estimates/edit-2.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNavigation } from "../../redux/estimateCalculations";
import { useGetEstimates } from "../../utilities/ApiHooks/Estimate";
import { logoutHandler } from "../../redux/userAuth";
import { useState } from "react";

export default function ExitingQuotes() {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const { data: estimates, isLoading, isFetching } = useGetEstimates();
  console.log(estimates, "estimates in existing");
  console.log(selectedQuote, "selectedQuote in existing");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const Logout = () => {
  //   console.log("hello world");
  //   dispatch(logoutHandler());

  //   navigate("/login");
  // };

  return (
    <>
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
            {/* <IconButton onClick={Logout} sx={{ height: 25 }}>
              <img src={logout} alt="image of log out icon" />
            </IconButton> */}
          </Box>

          <Box
            sx={{ paddingX: 2, marginTop: 2, height: "40vh",overflow: "auto"}}
          >
            {isFetching ? (
              <Box sx={{width: 40, m: "auto" , display: "flex", justifyContent: "center", alignItems: "center", height: 600}}>
              <CircularProgress sx={{}} />
              </Box>
            ) : (
              estimates?.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 2,
                    borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                  }}
                >
                  <Typography sx={{ fontWeight: "Medium" }}>
                    {new Date(item?.updatedAt).toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography color="red" marginRight={3}>
                      {/* {item?.updatedAt} */}
                    </Typography>

                    <IconButton
                      onClick={() => setSelectedQuote(item?._id)}
                      sx={{ marginRight: 1, height: 25 }}
                    >
                      <img src={pencil} alt="image of pencil" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
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
            onClick={() => {
              dispatch(setNavigation("layout"));
            }}
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
            {" "}
            Create New Qoute
          </Button>
          {/* <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              border: "2px solid rgba(102, 112, 133, 0.5)",
              fontSize: 18,
              width: "100%",
              marginTop: 1,
              color: "black",
              "&:hover": { border: "2px solid rgba(102, 112, 133, 0.5)" },
            }}
          >
            {" "}
            Cancel
          </Button> */}
        </Box>
      </Box>
    </>
  );
}
