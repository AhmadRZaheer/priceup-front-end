import { Box, Typography } from "@mui/material";
import image1 from "../../Assets/test.png";
import image2 from "../../Assets/ok.png";
import image3 from "../../Assets/cancel.png";
import image4 from "../../Assets/calculator.svg";
import {
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/Estimate";
import ExistingTable from "./esistingTable";

export default function ExistingQuotes() {
  const { data } = useGetEstimates();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          height: "98vh",
          overflow: "auto",
          backgroundColor: "white",
          gap: 5,
          pt: 2,
        }}
      >
        <Box sx={{ textAlign: "start", width: "96.4%" }}>
          <Typography sx={{ fontSize: 30 }}>Estimates</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "96.8%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: 300,
              height: 80,
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
              <Typography sx={{ fontSize: 18 }}>Pending</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
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
              width: 300,
              height: 80,
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
              width: 300,
              height: 80,
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
                ${data?.total?.toFixed(2) || 0}
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
              <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "97%" }}>
          <ExistingTable />
        </Box>
      </Box>
    </>
  );
}
