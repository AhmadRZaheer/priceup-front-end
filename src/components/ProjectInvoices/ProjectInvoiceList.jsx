import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
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
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";

export default function ProjectInvoiceList({
  searchValue,
  statusValue,
  dateValue,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const routePrefix = `${backendURL}/projects`;
  const [isLoading, setIsLoading] = useState(true);
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
  let fetchProjectInvoicesUrl = `${routePrefix}?page=${page}&limit=${itemsPerPage}`;
  if (searchValue && searchValue.length) {
    fetchProjectInvoicesUrl += `&search=${searchValue}`;
  }
  if (statusValue) {
    fetchProjectInvoicesUrl += `&status=${statusValue}`;
  }
  if (dateValue) {
    fetchProjectInvoicesUrl += `&date=${dateValue}`;
  }
  const {
    data: projectInvoices,
    isFetched,
    isFetching: projectInvoicesFetching,
    refetch: refetchProjectInvoices,
  } = useFetchAllDocuments(fetchProjectInvoicesUrl);
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
    if (projectInvoices && projectInvoices?.projects?.length) {
      return projectInvoices?.projects;
    } else {
      return [];
    }
  }, [projectInvoices, searchValue]);

  const handleDeleteProject = () => {
    deleteProject({ apiRoute: `${routePrefix}/${deleteRecord}` });
    setDeleteModalOpen(false);
  };

  const handleViewDetail = (item) => {
    navigate(`/invoices/${item?._id}`);
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetchProjectInvoices();
    }, 700),
    [refetchProjectInvoices]
  );

  useEffect(() => {
    if (searchValue) {
      debouncedRefetch();
      return () => {
        debouncedRefetch.cancel();
      };
    } else {
      refetchProjectInvoices();
    }
  }, [statusValue, dateValue, searchValue, page, deletedSuccessfully]);
  useEffect(() => {
    if (statusValue || dateValue || searchValue) {
      setPage(1);
    }
  }, [statusValue, dateValue, searchValue, deletedSuccessfully]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);
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
  const SkeletonColumnsGenerated = GenrateColumns([
    "Project Name",
    "Creator",
    "Customer",
    "Location",
    "Created Date",
    "Amount Quoted",
    "Status",
    "Actions",
  ]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
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
              loading={projectInvoicesFetching}
              style={{
                border: "none",
              }}
              getRowId={(row) => row._id}
              rows={filteredData}
              columns={ProjectsColumns(dropdownActions)}
              page={page}
              pageSize={itemsPerPage}
              rowCount={
                projectInvoices?.totalRecords
                  ? projectInvoices?.totalRecords
                  : 0
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
            />
          )}
          <Pagination
            totalRecords={
              projectInvoices?.totalRecords ? projectInvoices?.totalRecords : 0
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
      ) : (
        <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
          No Invoice Found
        </Typography>
      )}
    </Box>
  );
}
