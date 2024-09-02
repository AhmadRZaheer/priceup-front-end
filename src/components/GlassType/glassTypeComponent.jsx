import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import {
  useDeleteGlassTypeFull,
  useEditFullGlassType,
  useFetchDataGlassType,
} from "../../utilities/ApiHooks/glassType";
import AddEditGlassType from "../Modal/addEidtGlassType";
import { useSelector } from "react-redux";
import { getDataRefetch } from "../../redux/staff";
import { DataGrid } from "@mui/x-data-grid";
import { GlassTypeColumn } from "@/utilities/DataGridColumns";
import EditIcon from "@/Assets/d.svg";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomToggle from "../ui-components/Toggle";
import CustomInputField from "../ui-components/CustomInput";
import DeleteModal from "../Modal/deleteModal";

const GlassTypeComponent = ({ type }) => {
  const refetchData = useSelector(getDataRefetch);
  const itemsPerPage = 10;
  const {
    data: GlassTypeData,
    refetch: GlassTypeRefetch,
    isFetching: GlassTypeFetching,
  } = useFetchDataGlassType(type);
  const { mutate: editGlassType, isSuccess: GlassTypeEditSuccess } =
    useEditFullGlassType();
  const {
    mutate: deleteGlassType,
    isSuccess: deleteSuccess,
    isLoading: LoadingForDelete,
  } = useDeleteGlassTypeFull();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Manage menu state in the parent
  const [activeRow, setActiveRow] = useState(null); // State to keep track of which row triggered the menu
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowCosts, setRowCosts] = useState({}); // State for individual row costs

  const handleClickAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row); // Set the current row when the menu is triggered
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = (data) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const handleHardwareDelete = () => {
    deleteGlassType(activeRow._id);
  };

  // Handle the cost update for specific thickness
  const handleUpdateCost = (data) => {
    const updatedOptions = data.options.map((option) => ({
      ...option,
      cost: rowCosts[data._id]?.[option.thickness]
        ? parseFloat(rowCosts[data._id][option.thickness])
        : option.cost,
    }));

    editGlassType({ optionsData: updatedOptions, id: data._id });
  };

  // Handle status change for specific thickness index
  const handleStatusChange = (row, thickness) => {
    const updatedOptions = row.options.map((option) => ({
      ...option,
      status: option.thickness === thickness ? !option.status : option.status,
    }));

    editGlassType({ optionsData: updatedOptions, id: row._id });
  };
  const actionColumn = [
    {
      field: "cost (Thickness 3/8)",
      headerName: "Cost (Thickness 3/8)",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 4,
      renderCell: (params) => {
        // Target the correct option for "Thickness 3/8"
        const thickness3by8 = params.row.options.find(
          (option) => option.thickness === "3/8"
        );

        return (
          <CustomInputField
            type="number"
            value={rowCosts[params.row._id]?.["3/8"] ?? thickness3by8?.cost}
            onChange={(e) =>
              setRowCosts({
                ...rowCosts,
                [params.row._id]: {
                  ...rowCosts[params.row._id],
                  "3/8": e.target.value,
                },
              })
            }
          />
        );
      },
    },
    {
      field: "cost (Thickness 1/2)",
      headerName: "Cost (Thickness 1/2)",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 4,
      renderCell: (params) => {
        // Target the correct option for "Thickness 1/2"
        const thickness1by2 = params.row.options.find(
          (option) => option.thickness === "1/2"
        );

        return (
          <CustomInputField
            type="number"
            value={rowCosts[params.row._id]?.["1/2"] ?? thickness1by2?.cost}
            onChange={(e) =>
              setRowCosts({
                ...rowCosts,
                [params.row._id]: {
                  ...rowCosts[params.row._id],
                  "1/2": e.target.value,
                },
              })
            }
          />
        );
      },
    },
    {
      field: "status (Thickness 3/8)",
      headerName: "Status (Thickness 3/8)",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 4,
      renderCell: (params) => {
        const thickness3by8 = params.row.options.find(
          (option) => option.thickness === "3/8"
        );

        return thickness3by8?.status ? (
          <Typography
            className="status-active"
            sx={{ padding: 0, px: 2, width: "fit-content" }}
          >
            Active
          </Typography>
        ) : (
          <Typography
            className="status-inActive"
            sx={{ padding: 0, px: 2, width: "fit-content" }}
          >
            Inactive
          </Typography>
        );
      },
    },
    {
      field: "status (Thickness 1/2)",
      headerName: "Status (Thickness 1/2)",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 4,
      renderCell: (params) => {
        const thickness1by2 = params.row.options.find(
          (option) => option.thickness === "1/2"
        );

        return thickness1by2?.status ? (
          <Typography
            className="status-active"
            sx={{ padding: 0, px: 2, width: "fit-content" }}
          >
            Active
          </Typography>
        ) : (
          <Typography
            className="status-inActive"
            sx={{ padding: 0, px: 2, width: "fit-content" }}
          >
            Inactive
          </Typography>
        );
      },
    },
    {
      field: "Actions",
      align: "left",
      headerClassName: "customHeaderClass",
      flex: 2,
      renderCell: (params) => {
        const id = params.row._id;
        const data = params.row;

        return (
          <>
            <IconButton
              aria-haspopup="true"
              onClick={(event) => handleClickAction(event, data)}
            >
              <ArrowForward sx={{ color: "#8477DA" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && activeRow === data)}
              onClose={handleCloseAction}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "none",
                    boxShadow: "0px 1px 2px 0px #1018280D",
                    border: "1px solid #D0D5DD",
                    p: 0,
                    width: "171px",
                    "& .MuiList-padding": {
                      p: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Menu Items for updating, editing, toggling status, and deleting */}
              <MenuItem
                onClick={() => {
                  handleCloseAction();
                  handleUpdateCost(data); // Trigger cost update function
                }}
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Update</p>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseAction();
                  handleOpenEdit(data); // Open edit modal
                }}
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #D0D5DD",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Edit</p>
                <img width={20} height={20} src={EditIcon} alt="edit icon" />
              </MenuItem>

              {/* Toggle status for Thickness 3/8 */}
              <MenuItem
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #D0D5DD",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Thickness 3/8</p>
                <Box sx={{ width: "59px", height: "39px" }}>
                  <CustomToggle
                    checked={data.options.some(
                      (option) => option.thickness === "3/8" && option.status
                    )}
                    onChange={() => handleStatusChange(data, "3/8")} // Update status for 3/8
                    text={""}
                  />
                </Box>
              </MenuItem>

              {/* Toggle status for Thickness 1/2 */}
              <MenuItem
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #D0D5DD",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Thickness 1/2</p>
                <Box sx={{ width: "59px", height: "39px" }}>
                  <CustomToggle
                    checked={data.options.some(
                      (option) => option.thickness === "1/2" && option.status
                    )}
                    onChange={() => handleStatusChange(data, "1/2")} // Update status for 1/2
                    text={""}
                  />
                </Box>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setDeleteModalOpen(true); // Trigger delete
                }}
                sx={{
                  padding: "12px",
                  m: 0,
                  color: "#5D6164",
                  borderTop: "1px solid #D0D5DD",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 400,
                  ":hover": {
                    backgroundColor: " #EDEBFA",
                  },
                }}
              >
                <p>Delete</p>
                <img
                  width={20}
                  height={20}
                  src={DeleteIcon}
                  alt="delete icon"
                />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (refetchData) {
      GlassTypeRefetch();
    }
  }, [refetchData]);
  useEffect(() => {
    GlassTypeRefetch();
  }, []);
  useEffect(() => {
    if (GlassTypeEditSuccess) {
      GlassTypeRefetch();
      setRowCosts({});
    }
    if (deleteSuccess) {
      setDeleteModalOpen(false);
      setActiveRow(null);
      GlassTypeRefetch();
      setRowCosts({});
    }
  }, [deleteSuccess, GlassTypeEditSuccess]);
  const miniTab = useMediaQuery("(max-width: 1280px)");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        {" "}
        <p
          style={{
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32.78px",
            color: "#5D6164",
          }}
        >
          Showers<span style={{ color: "black" }}> / {type}</span>
        </p>
        <div
          style={{
            padding: 4,
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              color: "white",
              background: "#8477DA",
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            Add New
          </Button>
        </div>{" "}
      </div>
      {/* <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "rgb(232, 232, 232)",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        {/* <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Part Number{" "}
        </div>{" "} 
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Status
        </div>{" "}
      </div> */}

      <Box
        sx={{
          border: "1px solid #EAECF0",
          borderRadius: "8px",
          width: "99.5%",
          m: "auto",
          overflow: "hidden",
          mt: 2,
        }}
      >
        {GlassTypeFetching ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              alignItems: "center",
              background: "#FFFF",
              height: "56vh",
            }}
          >
            <CircularProgress size={24} sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          <div className="CustomerTable-1">
            {GlassTypeData.length >= 1 ? (
              <>
                <DataGrid
                  loading={GlassTypeFetching}
                  style={{ border: "none" }}
                  getRowId={(row) => row._id}
                  // rows={filteredData.slice(
                  //   (page - 1) * itemsPerPage,
                  //   page * itemsPerPage
                  // )}
                  disableColumnFilter
                  disableColumnMenu
                  rows={GlassTypeData}
                  columns={GlassTypeColumn.concat(actionColumn)}
                  pageSize={itemsPerPage}
                  rowCount={
                    GlassTypeData?.totalRecords
                      ? GlassTypeData?.totalRecords
                      : 0
                  }
                  // rowCount={filteredData.length}
                  sx={{ width: "100%" }}
                  hideFooter
                  rowHeight={70}
                />

                {/* <NewPagination
                  totalRecords={filteredData.length ? filteredData.length : 0}
                  setIsShowInput={setIsShowInput}
                  isShowInput={isShowInput}
                  setInputPage={setInputPage}
                  inputPage={inputPage}
                  page={page}
                  setPage={setPage}
                /> */}
              </>
            ) : (
              <Typography
                sx={{ textAlign: "center", fontSize: 20, color: "gray", py: 2 }}
              >
                No Addons Found
              </Typography>
            )}
          </div>
        )}
      </Box>

      {/* {GlassTypeFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            alignItems: "center",
            height: "56vh",
            background: "#FFFF",
          }}
        >
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#FFFF",
            gap: 1,
            height: miniTab ? "58vh" : "68vh",
            overflowY: "scroll",
          }}
        >
          {GlassTypeData.length !== 0 ? (
            GlassTypeData?.map((entry, mainIndex) => (
              <GlassTypeDataItem
                key={mainIndex}
                entry={entry}
                mainIndex={mainIndex}
                GlassTypeRefetch={GlassTypeRefetch}
                type={type}
              />
            ))
          ) : (
            <Box sx={{ color: "#667085" }}>No GlassType Found</Box>
          )}
        </Box>
      )} */}

      <DeleteModal
        text={"Glass Type"}
        open={deleteModalOpen}
        close={() => {
          setDeleteModalOpen(false);
        }}
        isLoading={LoadingForDelete}
        handleDelete={handleHardwareDelete}
      />
      <AddEditGlassType
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={GlassTypeRefetch}
        categorySlug={type}
      />
    </>
  );
};

export default GlassTypeComponent;
