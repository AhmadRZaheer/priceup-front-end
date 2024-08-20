import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import image1 from "@/Assets/test.png";
import image2 from "@/Assets/ok.png";
import image3 from "@/Assets/cancel.png";
import image4 from "@/Assets/calculator.svg";
import { useGetEstimatesStats } from "@/utilities/ApiHooks/estimate";
import ExistingTable from "./existingTable";
import { useEffect, useState } from "react";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import WidgetCard from "../ui-components/widgetCard";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import StatusChip from "../common/StatusChip";

export default function Estimates() {
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const [Status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    data: estimatesStats,
    // isLoading: estimatesStatsFetching,
    refetch: refetchEstimatesStats,
  } = useGetEstimatesStats();
  const handleDateChange = (data) => {
    setSelectedDate(data);
  };
  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };
  useEffect(() => {
    refetchEstimatesStats();
  }, []);
  return (
    <>
      <Box sx={{ backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" } }}>
        <Typography
          sx={{
            py: 2.4,
            fontWeight: "bold",
            fontSize: 26,
          }}
        >
          Estimates
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          // width: "100%",
          height: "auto",
          overflow: "auto",
          gap: "5px",
          // pr: 3,
        }}
      >
        {decodedToken?.role !== userRoles.STAFF ? (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              {[
                {
                  title: "Pending",
                  text: estimatesStats?.pending,
                  variant: "blue",
                },
                {
                  title: "Approved",
                  text: estimatesStats?.approved,
                  variant: "green",
                },
                {
                  title: "Voided",
                  text: estimatesStats?.voided,
                  variant: "red",
                },
                {
                  title: "Invoice Total",
                  text: estimatesStats?.total?.toFixed(2),
                  variant: "purple",
                },
              ].map((item) => (
                <Grid item lg={3} md={4} xs={6}>
                  <WidgetCard
                    text={item.text}
                    title={item.title}
                    varient={item.variant}
                  />
                </Grid>
              ))}
            </Grid>
            {/* <Box
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
                  {estimatesStats?.pending}
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
                  {estimatesStats?.approved}
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
                  {estimatesStats?.voided}
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
                  ${estimatesStats?.total?.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
                <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
              </Box>
            </Box> */}
          </Box>
        ) : (
          ""
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",

            mt: 2,
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Estimates
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search by Customer Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DesktopDatePicker
              label="Date Added"
              inputFormat="MM/DD/YYYY"
              className="custom-textfield"
              // maxDate={new Date()} // Sets the maximum date to the current date
              value={selectedDate}
              onChange={handleDateChange}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 150,
                  backgroundColor: "white", // Adjust height
                },
                "& .MuiInputBase-input": {
                  fontSize: "0.875rem", // Adjust font size
                  padding: "8px 14px", // Adjust padding
                },
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem",
                  top: "-6px", // Adjust label size
                },
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
            <FormControl
              sx={{ width: "152px" }}
              size="small"
              className="custom-textfield"
            >
              <InputLabel id="demo-select-small-label" className="input-label">
                Status
              </InputLabel>
              <Select
                value={Status}
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Status"
                size="small"
                sx={{ height: "40px" }}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"pending"}>
                  <StatusChip variant={"pending"} sx={{ padding: 0 }} />
                </MenuItem>
                <MenuItem value={"voided"}>
                  <StatusChip variant={"voided"} sx={{ padding: 0 }} />
                </MenuItem>
                <MenuItem value={"approved"}>
                  <StatusChip variant={"approved"} sx={{ padding: 0 }} />
                </MenuItem>
              </Select>
            </FormControl>
            <Button variant="text" onClick={handleResetFilter}>
              Clear Filter
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "99%",
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            // mr: 2,
            mb: 2,
          }}
        >
          <ExistingTable
            searchValue={search}
            StatusValue={Status}
            DateValue={selectedDate}
          />
        </Box>
      </Box>
    </>
  );
}
