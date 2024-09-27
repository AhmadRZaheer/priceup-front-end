import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { DeleteOutline, ManageSearch } from "@mui/icons-material";
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
    navigate(`/projects/${item?._id}`);
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
        // Always refetch when page is 1, else reset page to 1 to trigger refetch
        if (page !== 1) {
            setPage(1);  // This will trigger a refetch due to the useEffect watching `page`
        } else {
          refetchProjectsList();  // If already on page 1, just refetch directly
        }
    }, 700),
    [page, refetchProjectsList]  // Ensure refetchProjectsList is included in dependencies
);

useEffect(() => {
    // Reset page to 1 if filters (statusValue, dateValue, or searchValue) change
    if (statusValue || dateValue || searchValue) {
        setPage(1);
    }
    if (searchValue) {
        debouncedRefetch();
        return () => {
            debouncedRefetch.cancel();
        };
    } else {
      refetchProjectsList();
    }
}, [statusValue, dateValue, searchValue, page, deletedSuccessfully]);

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
  
  return (
    <Box
      sx={
        {
          // position: 'fixed', top: 50, bottom: 10,
          // left: 5, right: 5
        }
      }
    >
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
                  px: { sm: 0, xs: 0.8 }
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
              sx={{
                width: "100%", '.MuiDataGrid-main': {
                  borderRadius: '8px !important'
                }
              }}
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
