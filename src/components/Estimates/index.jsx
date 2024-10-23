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
import dayjs from "dayjs";
import CustomBarChart from "../charts/CustomBarChart";
import CustomPieChart from "../charts/CustomPieChart";

const dateSx = {
  "& .MuiInputBase-root": {
    height: 40,
    width: 150,
    backgroundColor: "white",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem", 
    padding: "8px 14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: '"Roboto",sans-serif !important',
    top: "-5px", 
    color: "#000000",
  },
};
const barData = [
  { x: "2019/01/01", y: 400 },
  { x: "2019/04/01", y: 430 },
  { x: "2019/07/01", y: 448 },
  { x: "2019/10/01", y: 470 },
  { x: "2020/01/01", y: 540 },
  { x: "2020/04/01", y: 580 },
];
const pieChartData = [55, 55, 55];

export default function Estimates() {
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = dayjs();
  const [graphDate, setGraphDate] = useState({
    start: currentDate.subtract(1, "month"),
    end: currentDate,
  });
  const {
    data: estimatesStats,
    // isLoading: estimatesStatsFetching,
    refetch: refetchEstimatesStats,
  } = useGetEstimatesStats();
  const handleDateChange = (newDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setSelectedDate(adjustedDate);
    } else {
      setSelectedDate(null);
    }
  };
  const handleGraphDateChange = (newDate, isStartDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setGraphDate((prev) => ({
        ...prev,
        [isStartDate ? "start" : "end"]: adjustedDate, 
      }));
    } else {
      setGraphDate((prev) => ({
        ...prev,
        [isStartDate ? "start" : "end"]: null,
      }));
    }
  };

  const handleShowGraph = () => {
    console.log(graphDate, "graphDate");
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
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          p: { sm: "0px 0px 20px 0px", xs: "70px 0px 20px 10px" },
          display: "flex",
        }}
      >
        <Typography
          sx={{
            // py: 2.4,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Estimates
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "start",
          // alignItems: "center",
          width: "100%",
          height: "auto",
          // overflow: "auto",
          // gap: "5px",
          // pr: 3,
        }}
      >
        {/* {decodedToken?.role !== userRoles.STAFF ? ( */}
        <Box
          sx={{
            // width: "99.5%",
            px: { sm: 0, xs: 1 },
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
        {/* // ) : (
        //   ""
        // )} */}

        <Box
          sx={{
            display: { sm: "flex", xs: "block" },
            justifyContent: "space-between",
            alignItems: "center",
            // width: "99.5%",
            pr: { sm: 0, xs: 1 },
            pl: { sm: 0, xs: 1 },
            my: 1,
            pt: 3,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
            Estimates
          </Typography>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              gap: 1,
              pt: { sm: 0, xs: 1 },
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mr: { sm: 0, xs: "26px" } }}>
              <Box>
                <CustomInputField
                  id="input-with-icon-textfield"
                  placeholder="Search"
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
              </Box>
              <Box>
                <DesktopDatePicker
                  label="Date Added"
                  inputFormat="MM/DD/YYYY"
                  className="custom-textfield"
                  // maxDate={new Date()} // Sets the maximum date to the current date
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    ...dateSx,
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1, pt: { sm: 0, xs: 1 } }}>
              <FormControl sx={{ width: "152px" }} size="small">
                <Select
                  value={status}
                  displayEmpty
                  id="demo-select-small"
                  size="small"
                  className="custom-textfield"
                  sx={{ height: "40px" }}
                  onChange={(e) => setStatus(e.target.value)}
                  renderValue={(selected) => {
                    if (selected === null) {
                      return (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            // lineHeight: '16.41px',
                            color: "#000000",
                            fontFamily: '"Roboto",sans-serif !important',
                          }}
                        >
                          Status
                        </Typography>
                      );
                    }

                    return (
                      <StatusChip
                        variant={selected}
                        sx={{ padding: 0, px: 2 }}
                      />
                    );
                  }}
                >
                  <MenuItem value={"pending"}>
                    <StatusChip
                      variant={"pending"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                  <MenuItem value={"voided"}>
                    <StatusChip variant={"voided"} sx={{ padding: 0, px: 2 }} />
                  </MenuItem>
                  <MenuItem value={"approved"}>
                    <StatusChip
                      variant={"approved"}
                      sx={{ padding: 0, px: 2 }}
                    />
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="text"
                onClick={handleResetFilter}
                sx={{
                  p: "6px 8px !important",
                  fontFamily: '"Roboto",sans-serif !important',
                }}
              >
                Clear Filter
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "99.88%",
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            background: "#FFFFFF",
            m: "auto",
            mt: 2,
          }}
        >
          <ExistingTable
            searchValue={search}
            statusValue={status}
            dateValue={selectedDate}
          />
        </Box>
      </Box>
    </>
  );
}
