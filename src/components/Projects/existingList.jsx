import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  InputAdornment,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { Add, DeleteOutline, ManageSearch, Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ProjectsColumns } from "@/utilities/DataGridColumns";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/Modal/deleteModal";
import {
  useDeleteDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import DefaultImage from "@/components/ui-components/defaultImage";
import { makeStyles } from "@material-ui/core";
import ActionsDropdown from "../common/ActionsDropdown";
import { debounce } from "lodash";

// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

export default function ExistingList({ searchValue, statusValue, dateValue }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const routePrefix = `${backendURL}/projects`;
  const [page, setPage] = useState(1);
  const useStyles = makeStyles({
    overflowText: {
      maxWidth: "115px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  });
  const classes = useStyles();
  const itemsPerPage = 10;
  let fetchAllProjectUrl = `${routePrefix}?page=${page}&limit=${itemsPerPage}`;
  if (searchValue && searchValue.length) {
    fetchAllProjectUrl += `&search=${searchValue}`;
  }
  if (statusValue) {
    fetchAllProjectUrl += `&status=${statusValue}`;
  }
  if (dateValue) {
    fetchAllProjectUrl += `&date=${dateValue}`
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
  }, [projectsList, searchValue]);

  const handleDeleteProject = () => {
    deleteProject({ apiRoute: `${routePrefix}/${deleteRecord}` });
    setDeleteModalOpen(false);
  };

  const handleViewDetail = (item) => {
    console.log("view project detail", item);
    navigate(`/projects/${item?._id}`);
  };

  // const handleCreateProject = () => {
  //   console.log("create project");
  //   navigate("/projects/create");
  // };
  useEffect(() => {
    refetchProjectsList();
  }, [page, deletedSuccessfully, statusValue, dateValue]);

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
    // Cleanup function to cancel debounce if component unmounts
    return () => {
      debouncedRefetch.cancel();
    };
  }, [searchValue]);

  // const debouncedRefetch = useCallback(
  //   debounce(() => {
  //     if (page === 1) {
  //       refetchProjectsList();
  //     } else {
  //       setPage(1);
  //     }
  //   }, 500),
  //   [searchValue]
  // );

  // useEffect(() => {
  //   debouncedRefetch();
  // }, [searchValue]);

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
  // const dummyArray = [
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  //   {
  //     _id: "66a20158f92a3cada4e82604",
  //     creatorData: { image: null, name: "test creator" },
  //     customerData: { image: null, name: "test customer" },
  //     updatedAt: "2024-07-25T12:57:17.641Z",
  //   },
  // ];
  return (
    <Box
      sx={
        {
          // position: 'fixed', top: 50, bottom: 10,
          // left: 5, right: 5
        }
      }
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: 2,
          paddingX: isMobile ? 0.5 : 2,
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? 18 : 20,
            fontWeight: "bold",
            color: "#101828",
          }}
        >
          Projects
        </Typography>
        {/* Search input field 
        <TextField
          placeholder="Search by Customer / Project Name"
          value={search}
          variant="standard"
          onChange={(e) => handleChange(e)}
          sx={{
            mb: 2,
            ".MuiInputBase-root:after": {
              border: "1px solid #8477DA",
            },
            width: isMobile ? "150px" : "auto",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#8477DA" }} />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={handleCreateProject}
          disabled={projectsListFetching}
          sx={{
            backgroundColor: "#8477DA",
            color: "white",
            "&:hover": { backgroundColor: "#8477DA" },
            borderRadius: 1,
            padding: 1,
            textTransform: "capitalize",
            fontSize: 16,
            height: 35,
          }}
        >
          <Add sx={{ width: 24 }} />
          Add
        </IconButton>
      </Box> */}
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
                  px:{sm:0,xs:0.8}
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
                      <Typography className={classes.overflowText}>
                        {item?.creatorData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: "Medium" }}>
                        {" "}
                        - Creator
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.6 }}>
                      <Typography sx={{ fontSize: 14 }}>
                        {item?.customerData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}> - Customer</Typography>
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
                  <ActionsDropdown item={item} actions={dropdownActions} />
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
                projectsList?.totalRecords ? projectsList?.totalRecords : 0
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
  );
}
