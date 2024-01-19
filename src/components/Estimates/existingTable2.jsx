import { Box, Typography } from "@mui/material";
import image1 from "../../Assets/test.png";
import image2 from "../../Assets/ok.png";
import image3 from "../../Assets/cancel.png";
import image4 from "../../Assets/calculator.svg";
import {
  // useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/estimate";

import ExistingTable from "./existingTable";
import { useEffect } from "react";

export default function ExistingQuotes2() {
  const { data, refetch } = useGetEstimates();
  useEffect(() => {
    refetch();
  }, []);
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
          gap: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "98%",
            justifyContent: "space-between",
            gap: 2.6,
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: 90,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
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
              width: "50%",
              height: 90,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
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
              width: "50%",
              height: 90,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
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
              width: "50%",
              height: 90,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
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
                ${data?.total?.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
              <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "98%",
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            mb: 2,
          }}
        >
          <ExistingTable />
        </Box>
      </Box>
    </>
  );
}
