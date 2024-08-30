import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { backendURL, debounce } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { ManageSearch } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import StatusChip from "../common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DefaultImage from "../ui-components/defaultImage";
import ActionsDropdown from "../common/ActionsDropdown";
import { DataGrid } from "@mui/x-data-grid";
import { LocationColumns, ProjectsColumns } from "@/utilities/DataGridColumns";
import Pagination from "../Pagination";

export default function LocationSection() {
  const [searchParams] = useSearchParams();
  const CustomerId = searchParams.get("id");
  const routePrefix = `${backendURL}/addresses/by-customer`;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  let fetchAllProjectUrl = `${routePrefix}/${CustomerId}?page=${page}&limit=${itemsPerPage}`;
  if (search && search.length) {
    fetchAllProjectUrl += `&search=${search}`;
  }
  if (status) {
    fetchAllProjectUrl += `&status=${status}`;
  }
  if (selectedDate) {
    fetchAllProjectUrl += `&date=${selectedDate}`;
  }
  const {
    data: locationList,
    isLoading,
    isFetching: locationListFetching,
    refetch: refetchlocationList,
  } = useFetchAllDocuments(fetchAllProjectUrl);

  const filteredData = useMemo(() => {
    if (locationList[0] && locationList[0]?.data?.length) {
      return locationList[0]?.data;
    } else {
      return [];
    }
  }, [locationList, search]);
  // const handleViewDetail = (item) => {
  //   navigate(`/projects/${item?._id}`);
  // };

  useEffect(() => {
    refetchlocationList();
  }, [page, search, selectedDate]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        refetchlocationList();
      } else {
        setPage(1);
      }
    }, 700),
    [page]
  );

  useEffect(() => {
    debouncedRefetch();
  }, [search]);
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
  //   const handleCreateProject = () => {
  //     navigate("/location/create");
  //   };

  //   const { data: stats, refetch: refetchStats } = useFetchSingleDocument(
  //     `${routePrefix}/allStats`
  //   );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResetFilter = () => {
    setSearch("");
    setStatus(null);
    setSelectedDate(null);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            display: { sm: "flex", xs: "block" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "99.5%",
            pr: { sm: 0, xs: 1 },
            pl: { sm: 0, xs: 1 },
            my: 1,
            pt: 3,
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32.78px" }}
          >
            Location
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
                  placeholder="Search by Name"
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
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "99.5%",
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            background: "#FFFFFF",
            mr: { sm: 0, xs: 1 },
            ml: { sm: 0, xs: 1 },
            mb: 2,
            mt: 2,
          }}
        >
          <Box>
            {isLoading ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "70vh",
                  minHeight: "20vh",
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : filteredData?.length === 0 && !locationListFetching ? (
              <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Location Found
              </Typography>
            ) : (
              <Box>
                <DataGrid
                  loading={locationListFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData}
                  columns={LocationColumns()}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={
                    locationList?.totalRecords ? locationList?.totalRecords : 0
                  }
                  rowHeight={70.75}
                  sx={{ width: "100%" }}
                  hideFooter
                  disableColumnMenu
                  disableColumnFilter
                />

                <Pagination
                  totalRecords={
                    locationList?.totalRecords ? locationList?.totalRecords : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
