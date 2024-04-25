import {
  Box,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "../Assets/Delete-Icon.svg";
import DefaultImage from "../components/ui-components/defaultImage";
import { Link } from "react-router-dom";
import CustomIconButton from "../components/ui-components/CustomButton";
import {
  DeleteOutline,
  Edit,
  ManageSearch,
  Preview,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import SelectMenu_Status from "../components/ui-components/selectMenu-status";
import { useState } from "react";

export const EstimatesColumns = (
  handleDeleteEstimate,
  handleIconButtonClick,
  handlePDFPreviewClick
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ borderRadius: 2, fontSize: "14px" }}
            >
              <ManageSearch /> view more
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem>
                {" "}
                <Link
                  to="/estimates/steps"
                  style={{ marginLeft: 2, marginRight: 1, marginTop: 0 }}
                >
                  <CustomIconButton
                    handleClick={() => handleIconButtonClick(params?.row)}
                    // disable={estimateDataFetching}
                    buttonText="Edit"
                    icon={
                      <Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />
                    }
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                {" "}
                <CustomIconButton
                  handleClick={() => handlePDFPreviewClick(params?.row)}
                  // disable={estimateDataFetching}
                  buttonText="PDF"
                  icon={
                    <RemoveRedEyeOutlined
                      sx={{ color: "white", fontSize: 18, mr: 0.4 }}
                    />
                  }
                />
              </MenuItem>
              <MenuItem>
                <CustomIconButton
                  onClick={() => handleDeleteEstimate(params?.row?._id)}
                  buttonText="Delete"
                  severity={"error"}
                  icon={
                    <DeleteOutline
                      sx={{ color: "white", fontSize: 18, mr: 0.4 }}
                    />
                  }
                />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
};
