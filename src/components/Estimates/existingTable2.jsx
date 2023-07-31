import { AddCircle, CreateOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import image1 from "../../Assets/test.png";
import image2 from "../../Assets/ok.png";
import image3 from "../../Assets/cancel.png";
import image4 from "../../Assets/calculator.svg";
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

import ExistingTable from "./esistingTable";
import { Link } from "react-router-dom";
// import { useFetchDataEstimateCard } from "../../utilities/ApiHooks/estimate-card";

export default function ExistingQuotes2() {
  const { data , isFetching } = useGetEstimates();
  const { data: estimateListData, isFetching: estimateDataFetching } =
    useFetchDataEstimate();
  return (
    <>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "auto",
            overflow: "auto",
            // backgroundColor: "white",
            borderTopLeftRadius: 30,
            // borderBottomLeftRadius: 30,
            gap: 5,
            // pt: 4,
          }}
        >
           
          <Box sx={{ display: "flex", gap: 2,  width: "98%", }}>
            <Box
              sx={{
                width: 320,
                height: 90,
                padding: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: 60 }}>
                <img
                  style={{ width: "75%", height: "100%" }}
                  src={image1}
                  alt=""
                />
                <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                  {data?.pending}
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                <Typography sx={{ fontSize: 18, color: "#575761" }}>
                  Pending
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: 320,
                height: 90,
                padding: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: 60 }}>
                <img
                  style={{ width: "75%", height: "100%" }}
                  src={image2}
                  alt=""
                />
                <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                {data?.approved}
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                <Typography sx={{ fontSize: 18 }}>Approved</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: 320,
                height: 90,
                padding: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: 60 }}>
                <img
                  style={{ width: "76%", height: "100%" }}
                  src={image3}
                  alt=""
                />
                <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                {data?.voided}
                  
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                <Typography sx={{ fontSize: 18 }}>Voided</Typography>
              </Box>
            </Box>

            <Box
              sx={{
                width: 320,
                height: 90,
                padding: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: 60 }}>
                <img
                  style={{ width: "76%", height: "100%" }}
                  src={image4}
                  alt=""
                />
                <Typography pl={0.8} fontSize={26} fontWeight="bold">
                  ${data?.total}
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
                <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
              </Box>
            </Box>
          </Box>
            <Box sx={{width: "97%"}}>
              <ExistingTable />
            </Box>
        </Box>
    </>
  );
}
