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
import {
  useDeleteDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { DeleteOutline, ManageSearch } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";
import StatusChip from "../common/StatusChip";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DefaultImage from "../ui-components/defaultImage";
import ActionsDropdown from "../common/ActionsDropdown";
import { DataGrid } from "@mui/x-data-grid";
import { ProjectsColumns } from "@/utilities/DataGridColumns";
import Pagination from "../Pagination";
import DeleteModal from "../Modal/deleteModal";

export default function ProjectsSection() {
  const [searchParams] = useSearchParams();
  const CustomerId = searchParams.get("id");
  const routePrefix = `${backendURL}/projects/by-customer`;
  const routePrefixForDelete = `${backendURL}/projects`;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
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
    data: projectsList,
    isLoading,
    isFetching: projectsListFetching,
    refetch: refetchProjectsList,
  } = useFetchAllDocuments(fetchAllProjectUrl);
  const {
    mutate: deleteProject,
    isSuccess: deletedSuccessfully,
    isLoading: LoadingForDelete,
  } = useDeleteDocument();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const handleOpenDeleteModal = (item) => {
    setDeleteRecord(item._id);
    setDeleteModalOpen(true);
  };
  const filteredData = useMemo(() => {
    if (projectsList && projectsList?.projects?.length) {
      return projectsList?.projects;
    } else {
      return [];
    }
  }, [projectsList, search]);

  const handleDeleteProject = () => {
    deleteProject({ apiRoute: `${routePrefixForDelete}/${deleteRecord}` });
    setDeleteModalOpen(false);
  };
  const handleViewDetail = (item) => {
    navigate(`/projects/${item?._id}`);
  };

  useEffect(() => {
    refetchProjectsList();
  }, [page, search, selectedDate, status,deletedSuccessfully]);

  const debouncedRefetch = useCallback(
    debounce(() => {
      if (page === 1) {
        refetchProjectsList();
      } else {
        setPage(1);
      }
    }, 700),
    [page]
  );

  useEffect(() => {
    debouncedRefetch();
  }, [search]);
  const dropdownActions = [
    {
      title: "Detail",
      handleClickItem: handleViewDetail,
      icon: <ManageSearch />,
    },
    {
      title: "Delete",
      handleClickItem: handleOpenDeleteModal,
      icon: <DeleteOutline sx={{ color: "white", fontSize: 18, mr: 0.4 }} />,
      severity: "error",
    },
  ];

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

  // const { data: stats, refetch: refetchStats } = useFetchSingleDocument(
  //   `${routePrefix}/allStats`
  // );

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
        {/* {decodedToken?.role !== userRoles.STAFF ? ( */}

        {/* ) : (
            ""
          )} */}

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
            Projects
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
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: '"Roboto",sans-serif !important',
                      top: "-5px", // Adjust label size
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
                // sx={{ lineHeight: "21.86px" }}
              >
                Clear Filter
              </Button>
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
            ) : filteredData?.length === 0 && !projectsListFetching ? (
              <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Project Found
              </Typography>
            ) : (
              <Box>
                {isMobile ? (
                  filteredData?.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingY: 2,
                        borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                        px: { sm: 0, xs: 0.8 },
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "100%",
                            overflow: "hidden",
                          }}
                        >
                          <DefaultImage
                            image={item?.creatorData?.image}
                            name={item?.creatorData?.name}
                          />
                        </Box>

                        <Box>
                          <Box sx={{ display: "flex", gap: 0.6 }}>
                            <Typography
                              sx={{
                                maxWidth: "115px",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {item?.creatorData?.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 16, fontWeight: "Medium" }}
                            >
                              {" "}
                              - Creator
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 0.6 }}>
                            <Typography sx={{ fontSize: 14 }}>
                              {item?.customerData?.name}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }}>
                              {" "}
                              - Customer
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          width: 100,
                          alignItems: "center",
                        }}
                      >
                        <ActionsDropdown
                          item={item}
                          actions={dropdownActions}
                        />
                        <Typography sx={{ fontWeight: "Medium", fontSize: 12 }}>
                          {new Date(item?.updatedAt).toDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <DataGrid
                    loading={projectsListFetching}
                    style={{
                      border: "none",
                    }}
                    getRowId={(row) => row._id}
                    rows={filteredData}
                    columns={ProjectsColumns(dropdownActions)}
                    page={page}
                    pageSize={itemsPerPage}
                    rowCount={
                      projectsList?.totalRecords
                        ? projectsList?.totalRecords
                        : 0
                    }
                    rowHeight={70.75}
                    sx={{ width: "100%" }}
                    hideFooter
                    disableColumnMenu
                  />
                )}
                <Pagination
                  totalRecords={
                    projectsList?.totalRecords ? projectsList?.totalRecords : 0
                  }
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
                <DeleteModal
                  text={"Project"}
                  open={deleteModalOpen}
                  close={() => {
                    setDeleteModalOpen(false);
                  }}
                  isLoading={LoadingForDelete}
                  handleDelete={handleDeleteProject}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
