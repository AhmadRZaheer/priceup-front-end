import { Box, InputAdornment, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { backendURL, debounce } from "@/utilities/common";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { useSearchParams } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import { DataGrid } from "@mui/x-data-grid";
import { ContactColumns } from "@/utilities/DataGridColumns";
import Pagination from "../Pagination";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";

export default function ContactSection() {
  const [searchParams] = useSearchParams();
  const CustomerId = searchParams.get("id");
  const routePrefix = `${backendURL}/contacts/by-customer`;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    isFetched,
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

  useEffect(() => {
    refetchlocationList();
  }, [page, search, selectedDate]);
  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  const SkeletonColumnsGenerated = GenrateColumns(["Name", "Phone Number"]);

  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5]);

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

  const handleChange = (e) => {
    setSearch(e.target.value);
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
            pr: { sm: 0, xs: 1 },
            pl: { sm: 0, xs: 1 },
            my: 1,
            pt: 3,
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, lineHeight: "32.78px" }}
          >
            Contacts
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
            width: "99.88%",
            border: "1px solid #D0D5DD",
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
              <Box>
                <DataGrid
                  getRowId={(row) => row._id}
                  rows={SkeletonRowsGenerated}
                  columns={SkeletonColumnsGenerated}
                  page={1}
                  pageSize={10}
                  className="table"
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
              </Box>
            ) : filteredData?.length > 0 ? (
              <Box>
                <DataGrid
                  loading={locationListFetching}
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row._id}
                  rows={filteredData}
                  columns={ContactColumns()}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={
                    locationList?.totalRecords ? locationList?.totalRecords : 0
                  }
                  rowHeight={70.75}
                  sx={{
                    width: "100%",
                    ".MuiDataGrid-main": {
                      borderRadius: "8px !important",
                    },
                  }}
                  hideFooter
                  disableColumnMenu
                  disableColumnFilter
                />

                <Pagination
                  totalRecords={
                    locationList[0]?.totalRecords ? locationList[0]?.totalRecords : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            ) : (
              <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Contact Found
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
