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
import { useCallback, useEffect, useState } from "react";
import { backendURL, debounce, getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ExistingList from "./existingList";
import WidgetCard from "../ui-components/widgetCard";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import StatusChip from "../common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function Projects() {
  const routePrefix = `${backendURL}/projects`;
  const navigate = useNavigate();
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    if (newDate) {
      // Set time to noon (12:00) to avoid time zone issues
      const adjustedDate = dayjs(newDate).hour(12).minute(0).second(0).millisecond(0);
      setSelectedDate(adjustedDate);
    } else {
      setSelectedDate(null);
    }
  };
  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const { data: stats, refetch: refetchStats } = useFetchSingleDocument(
    `${routePrefix}/allStats`
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };
  useEffect(() => {
    refetchStats();
  }, [refetchStats]);
  return (
    <>
      <Box
        sx={{
          p: "20px 22px 20px 10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              color: "rgba(33, 37, 40, 1)",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Create, edit and manage your Projects.
          </Typography>
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateProject}
            sx={{
              backgroundColor: "#8477DA",
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 2,
              fontSize: 17,
              padding: 1,

              px: 2,
            }}
          >
            <Add color="white" sx={{ mr: 1 }} />
            Create New Project
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: { sm: "#F6F5FF", xs: "#FFFFFF" },
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "start",
          // alignItems: "center",
          width: "100%",
          height: "auto",
          // overflow: "auto",
          // gap: 5,
        }}
      >
        {decodedToken?.role !== userRoles.STAFF ? (
          <Box
            sx={{
              width: "98%",
              pr: 2,
            }}
          >
            <Grid container spacing={2}>
              {[
                { title: "Pending", text: stats?.pending, variant: "blue" },
                { title: "Approved", text: stats?.approved, variant: "green" },
                { title: "Voided", text: stats?.voided, variant: "red" },
              ].map((item) => (
                <Grid item lg={4} md={6} sm={6} xs={6}>
                  <WidgetCard
                    type={2}
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
                  style={{ width: "76%", height: "100%" }}
                  src={image4}
                  alt=""
                />
                <Typography pl={0.8} fontSize={26} fontWeight="bold">
                  ${stats?.total?.toFixed(2)}
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
            alignItems: "center",
            width: "98%",
            pr: 3,
            my: 1,
            pt: 3,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Projects
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search by User Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={handleChange}
            />
            <Box>
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
            </Box>
            <FormControl
              sx={{ width: "152px" }}
              size="small"
              className="custom-textfield"
            >
              <InputLabel id="demo-select-small-label" className="input-label">
                Status
              </InputLabel>
              <Select
                value={status}
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
            width: "98%",
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            background: "#FFFFFF",
            mr: 2,
            mb: 2,
            mt: 2,
          }}
        >
          <ExistingList
            searchValue={search}
            statusValue={status}
            dateValue={selectedDate}
          />
        </Box>
      </Box>
    </>
  );
}
