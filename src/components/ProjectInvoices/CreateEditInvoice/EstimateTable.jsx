import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import DefaultImage from "@/components/ui-components/defaultImage";
import { EstimateCategory } from "@/utilities/constants";
import Pagination from "@/components/Pagination";

const columns = [
  {
    field: "Creator",
    sortable: false,
    flex: 1.8,
    headerClassName: "customHeaderClass",
    renderCell: (params) => {
      return (
        <>
          {params?.row?.creatorData ? (
            <Box className="project-cellWrap">
              <div className="customerImg">
                <DefaultImage
                  image={params?.row?.creatorData?.image}
                  name={params?.row?.creatorData?.name}
                  type={5}
                />
              </div>
              <Tooltip
                title={
                  <Grid>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                      {params?.row?.creatorData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                      {params?.row?.creatorData?.email}
                    </Typography>
                  </Grid>
                }
                placement="top"
              >
                <div className="new-customerNameTable">
                  <Box
                    className="new-userNameTable"
                    sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                  >
                    <Typography
                      className="new-userNameTable"
                      sx={{
                        color: "#000000",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: { lg: "100%", xs: "93px" },
                      }}
                    >
                      {params?.row?.creatorData?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        p: 0,
                        mt: -0.4,
                        color: "#5D6164",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: { lg: "100%", xs: "93px" },
                      }}
                    >
                      {params?.row?.creatorData?.email}
                    </Typography>
                  </Box>
                </div>
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ---
            </Box>
          )}
        </>
      );
    },
  },
  {
    field: "Customer",
    sortable: false,
    headerClassName: "customHeaderClass",
    flex: 1.9,
    renderCell: (params) => {
      return (
        <>
          {params?.row?.customerData ? (
            <Box className="project-cellWrap">
              <div className="customerImg">
                <DefaultImage
                  image={params?.row?.customerData?.image}
                  name={params?.row?.customerData?.name}
                  type={5}
                />
              </div>
              <Tooltip
                title={
                  <Grid>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                      {params?.row?.customerData?.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                      {params?.row?.customerData?.email}
                    </Typography>
                  </Grid>
                }
                placement="top"
              >
                <div className="new-customerNameTable">
                  <Box
                    className="new-userNameTable"
                    sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                  >
                    <Typography
                      className="new-userNameTable"
                      sx={{
                        color: "#000000",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: { lg: "100%", xs: "93px" },
                      }}
                    >
                      {params?.row?.customerData?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        p: 0,
                        mt: -0.4,
                        color: "#5D6164",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: { lg: "100%", xs: "93px" },
                      }}
                    >
                      {params?.row?.customerData?.email}
                    </Typography>
                  </Box>
                </div>
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ---
            </Box>
          )}
        </>
      );
    },
  },

  {
    field: "Estimate Category",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.1,
    renderCell: (params) => {
      return (
        <>
          <Typography
            sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
          >
            {params?.row?.category}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Layout",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      const layoutName =
        params?.row?.category === EstimateCategory.MIRRORS
          ? "Mirror"
          : params?.row?.settings?.name ?? "Custom";
      return (
        <>
          <Tooltip placement="top-start" title={layoutName}>
            <Typography
              sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
            >
              {layoutName}
            </Typography>
          </Tooltip>
        </>
      );
    },
  },
  {
    field: "Estimate Total",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.1,
    renderCell: (params) => {
      return (
        <>
          <Typography
            sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
          >
            ${params?.row?.cost?.toFixed(2) || 0}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Discount",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 0.7,
    renderCell: (params) => {
      console.log(params?.row, "params?.row");
      return (
        <>
          {params?.row?.config?.discount?.value &&
          params?.row?.config?.discount?.value > 0 ? (
            <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
              {params?.row?.config?.discount?.unit === "$" && "$"}
              {params?.row?.config?.discount?.value ?? 0}
              {params?.row?.config?.discount?.unit === "%" && "%"}
            </Typography>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                pl: 0.4,
                // justifyContent: "center",
              }}
            >
              ---
            </Box>
          )}
        </>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function EstimateDataList({
  projectId,
  setSelectedEstimateRows,
  selectedEstimateRows,
}) {
  const url = `${backendURL}/projects/pending-estimates-for-landing-page-preview/${projectId}`;
  const {
    data: estimatesList,
    isFetched,
    isFetching: estimatesListFetching,
    refetch: refetchEstimatesList,
  } = useFetchAllDocuments(url);

  React.useEffect(() => {
    if (projectId) {
      refetchEstimatesList();
    }
  }, [projectId]);

  // Handle row selection
  const handleSelectionChange = (selectedRowIds) => {
    // Find the full objects of the selected rows
    const selectedData =
      estimatesList?.filter((row) => selectedRowIds.includes(row._id)) || [];
    setSelectedEstimateRows(selectedData);
    console.log("Selected row data:", selectedData); // Log the full object
  };

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;
  console.log(selectedEstimateRows, "selectedEstimateRows");

  return (
    <>
      <Typography sx={{ fontSize: 24, fontWeight: "bold", pb: 2 }}>
        Estimates
      </Typography>
      {estimatesList?.length > 0 ? (
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={isFetched && estimatesList}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            rowHeight={70}
            sx={{ border: 0 }}
            hideFooter
            disableColumnMenu
            onRowSelectionModelChange={handleSelectionChange} // Pass handler here
          />
          {/* <Pagination
            totalRecords={
              estimatesList?.totalRecords ? estimatesList?.totalRecords : 0
            }
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          /> */}
        </Paper>
      ) : (
        <Box
          sx={{
            width: "99.88%",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #D0D5DD",
            m: "auto",
            //   boxShadow:1
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontSize: 20, color: "#667085", py: 2 }}
          >
            No Estimate Found
          </Typography>
        </Box>
      )}
    </>
  );
}
