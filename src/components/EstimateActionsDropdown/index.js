import {
  DeleteOutline,
  Edit,
  ManageSearch,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import CustomIconButton from "../ui-components/CustomButton";
import { useState } from "react";
import { EstimateCategory } from "@/utilities/constants";

const EstimateActionsDropdown = ({
  params,
  handleIconButtonClick,
  handlePDFPreviewClick,
  handleDeleteEstimate,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <ManageSearch /> View
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
          {/* <Link
            to="/estimates/steps"
            style={{ marginLeft: 2, marginRight: 1, marginTop: 0 }}
          > */}
            <CustomIconButton
              handleClick={() => handleIconButtonClick(params?.row)}
              // disable={estimateDataFetching}
              buttonText="Edit"
              icon={<Edit sx={{ color: "white", fontSize: 18, mr: 0.4 }} />}
            />
          {/* </Link> */}
        </MenuItem>
        {params?.row?.category === EstimateCategory.SHOWERS && (
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
        )}
        <MenuItem>
          {" "}
          <CustomIconButton
            handleClick={() => handleDeleteEstimate(params?.row._id)}
            // disable={estimateDataFetching}
            buttonText="Delete"
            severity={"error"}
            icon={
              <DeleteOutline sx={{ color: "white", fontSize: 18, mr: 0.4 }} />
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};
export default EstimateActionsDropdown;
