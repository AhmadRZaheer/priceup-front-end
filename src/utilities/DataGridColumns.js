import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "../Assets/Delete-Icon.svg";
import DefaultImage from "../components/ui-components/defaultImage";
import { Link } from "react-router-dom";
import CustomIconButton from "../components/ui-components/CustomButton";
import { Edit } from "@mui/icons-material";

export const EstimatesColumns = (handleDeleteEstimate,handleIconButtonClick) => {
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
                <Box
                  sx={{
                    width: "fit-content",
                    bgcolor:
                      params?.row?.status === "pending" ? "#FEF3F2" : "#ECFDF3",
                    borderRadius: "16px",
                    color:
                      params?.row?.status === "pending" ? "#B42318" : "#027A48",
                    pl: 1.8,
                    pt: 0.3,
                    pr: 1.8,
                    pb: 0.5,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      bgcolor:
                        params?.row?.status === "pending" ? "#B42318" : "#027A48",
                      borderRadius: "100%",
                      mt: 0.2,
                    }}
                  ></Box>
                  {params?.row?.status}
                </Box>
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
              <>
                <IconButton
                  onClick={() => handleDeleteEstimate(params?.row?._id)}
                  sx={{
                    padding: 1,
                    margin: 0,
                    borderRadius: "100%",
                    mt: -0.5,
                    mr: 1,
                    "&:hover": { backgroundColor: "white" },
                    "&:active": { backgroundColor: "white" },
                  }}
                >
                  <img
                    width={"20px"}
                    height={"20px"}
                    src={DeleteIcon}
                    alt="delete icon"
                  />
                </IconButton>
                <Link
                  to="/estimates/steps"
                  style={{ marginLeft: 2, marginRight: 1, marginTop: 6 }}
                >
                  <CustomIconButton
                    handleClick={() => handleIconButtonClick(params?.row)}
                    // disable={estimateDataFetching}
                    buttonText="Edit"
                    icon={<Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />}
                  />
                </Link>
              </>
            );
          },
        },
      ];
}