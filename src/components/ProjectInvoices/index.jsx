import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { backendURL } from "@/utilities/common";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ProjectInvoiceList from "./ProjectInvoiceList";
import WidgetCard from "../ui-components/widgetCard";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import StatusChip from "../common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function ProjectInvoices() {
  const routePrefix = `${backendURL}/invoices`;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    if (newDate) {
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
  const handleCreateInvoice = () => {
    navigate("/invoices/create");
  };

  const { data: stats, refetch: refetchStats } = useFetchSingleDocument(
    `${routePrefix}/stats`
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
          p: { sm: "0px 0px 20px 0px", xs: "70px 0px 20px 10px" },
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: "32.78px",
            }}
          >
            Invoices
          </Typography>
          <Typography
            sx={{
              color: "#212528",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "21.86px",
              opacity: "70%",
            }}
          >
            Create, edit and manage your Invoices.
          </Typography>
        </Box>
        <Box sx={{ alignSelf: "center" }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateInvoice}
            sx={{
              backgroundColor: "#8477DA",
              height: "44px",
              width: { sm: "219px", xs: "197px" },
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: { lg: 16, md: 15 },
              padding: { sm: "10px 16px", xs: "5px 8px" },
            }}
          >
            <Add sx={{ mr: { sm: 1.2, xs: 0.8 }, color: "#FFFFFF" }} />
            Create New Invoice
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", xs: "99%" },
            px: { sm: 0, xs: 1 },
          }}
        >
          <Grid container spacing={2}>
            {stats?.map((item) => (
              <Grid item lg={3} md={6} sm={6} xs={6}>
                <WidgetCard
                  text={item?.count}
                  title={item?.status}
                  varient={item?.status === "Paid" ? "blue" : "green"}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: { sm: "flex", xs: "block" },
            justifyContent: "space-between",
            alignItems: "center",
            pr: { sm: 0, xs: 1 },
            pl: { sm: 0, xs: 1 },
            my: 1,
            pt: 3,
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32.78px" }}
          >
            Invoices
          </Typography>
          <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              gap: 1,
              pt: { sm: 0, xs: 1 },
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
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
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <DesktopDatePicker
                  label="Date Added"
                  inputFormat="MM/DD/YYYY"
                  className="custom-textfield"
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
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
                  id="demo-select-small"
                  className="custom-textfield"
                  size="small"
                  displayEmpty
                  sx={{ height: "40px" }}
                  onChange={(e) => setStatus(e.target.value)}
                  renderValue={(selected) => {
                    if (selected === null) {
                      return (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
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
          <ProjectInvoiceList
            searchValue={search}
            statusValue={status}
            dateValue={selectedDate}
          />
        </Box>
      </Box>
    </>
  );
}
