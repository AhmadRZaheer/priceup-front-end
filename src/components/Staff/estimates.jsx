import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ExistingTable from "../Estimates_dep/existingTable";
import ExistingListMobile from "../Estimates_dep/existingListMobile";

export default function Estimates() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        height: "92vh",
      }}
    >
      <Box>
        {isMobile ? (
          <ExistingListMobile />
        ) : (
          <Box sx={{ paddingX: "30px", pt: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 30, pb: 2, color: "#101828" }}>
                Estimates
              </Typography>
            </Box>
            <Box sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}>
              <ExistingTable />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
