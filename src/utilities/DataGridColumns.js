import { Box, Typography } from "@mui/material";
import DefaultImage from "../components/ui-components/defaultImage";
import SelectMenu_Status from "../components/ui-components/selectMenu-status";
import EstimateActionsDropdown from "../components/EstimateActionsDropdown";

export const EstimatesColumns = (
  handleDeleteEstimate,
  handleIconButtonClick,
  handlePDFPreviewClick
) => {
  return [
    {
      field: "Creator Name",
      headerClassName: "customHeaderClass",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <>
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
                  image={params?.row?.creatorData?.image}
                  name={params?.row?.creatorData?.name}
                />
              </Box>
              <Box>
                <Typography>{params?.row?.creatorData?.name}</Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    p: 0,
                    mt: -0.4,
                    color: "#667085",
                  }}
                >
                  {params?.row?.creatorData?.email}
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      field: "Customer Name",
      headerClassName: "customHeaderClass",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.name}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Customer Email",
      headerClassName: "customHeaderClass",
      flex: 1.5,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.email}
            </Typography>
          </>
        );
      },
    },

    {
      field: "Date quoted",
      headerClassName: "customHeaderClass",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
              {new Date(params?.row?.updatedAt).toDateString()}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Estimated total",
      headerClassName: "customHeaderClass",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
              ${params?.row?.cost?.toFixed(2) || 0}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Status",
      headerClassName: "customHeaderClass",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <SelectMenu_Status
              status={params?.row?.status}
              quoteId={params?.row?._id}
            />
          </>
        );
      },
    },
    {
      field: "Action",
      headerClassName: "customHeaderClass",
      flex: 1,
      renderCell: (params) => {
        return (
          <EstimateActionsDropdown
            params={params}
            handleDeleteEstimate={handleDeleteEstimate}
            handleIconButtonClick={handleIconButtonClick}
            handlePDFPreviewClick={handlePDFPreviewClick}
          />
        );
      },
    },
  ];
};
