import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { ArrowForward, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import {
  useDeleteGlassAddon,
  useEditFullGlassAddon,
  useFetchGlassAddons,
} from "../../utilities/ApiHooks/glassAddon";
import AddEditGlassAddon from "../Modal/addEditGlassAddon";
import { useSelector } from "react-redux";
import { getDataRefetch } from "../../redux/staff";
import { DataGrid } from "@mui/x-data-grid";
import { GlassAddonsColumn } from "@/utilities/DataGridColumns";
import EditIcon from "@/Assets/d.svg";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import CustomInputField from "../ui-components/CustomInput";
import CustomToggle from "../ui-components/Toggle";
import DeleteModal from "../Modal/deleteModal";
import { CustomSmallSwtich } from "../common/CustomSmallSwitch";

const GlassAddonGrid = ({ type }) => {
  const refetchData = useSelector(getDataRefetch);
  const itemsPerPage = 10;
  const {
    data: glassAddons,
    refetch: glassAddonRefetch,
    isFetching: glassAddonFetching,
    isLoading
  } = useFetchGlassAddons(type);
  const {
    mutate: deleteGlassAddon,
    isSuccess: deleteSuccess,
    isLoading: LoadingForDelete,
  } = useDeleteGlassAddon();
  const { mutate: editGlassAddon, isSuccess: glassAddonEditSuccess } =
    useEditFullGlassAddon();

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Manage menu state in the parent
  const [activeRow, setActiveRow] = useState(null); // State to keep track of which row triggered the menu
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowCosts, setRowCosts] = useState({}); // State for individual row costs
  const [rowStatus, setRowStatus] = useState({});
  const [updateRefetch, setUpdateRefetch] = useState(false);

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
    deleteGlassAddon(activeRow?._id);
  };

  // Handle the cost update
  const handleUpdateCost = (data) => {
    const updatedOptions = data.options.map((option) => ({
      ...option,
      cost:
        rowCosts[data._id] !== undefined
          ? parseFloat(rowCosts[data._id])
          : option.cost,
    }));
    setUpdateRefetch(false);
    editGlassAddon({ optionsData: updatedOptions, id: data._id });
  };
  const handleStatusChange = (row) => {
    setRowStatus({
      ...rowStatus,
      [row._id]: !row.options[0].status,
    })
    const updatedOptions = row.options.map((option) => ({
      ...option,
      status: !option.status, // Toggle the status
    }));

    // Update the backend with the new status
    editGlassAddon({ optionsData: updatedOptions, id: row._id });
    setUpdateRefetch(true);
  };
  const actionColumn = [
    {
      field: "cost",
      headerName: "Cost",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => (
        <Box>
          {params.colDef.headerName}
        </Box>
      ),
      sortable: false,
      flex: 4,

      renderCell: (params) => {
        return (
          <Box sx={{ width: "101px" }}>
            <CustomInputField
              disabled={params.row.slug === 'no-treatment'}
              inputProps={{ min: 0 }}
              type={"number"}
              value={
                (rowCosts[params.row._id] !== undefined
                  ? rowCosts[params.row._id]
                  : params.row.options[0]?.cost) || 0
              }
              onChange={(e) =>
                setRowCosts({
                  ...rowCosts,
                  [params.row._id]: e.target.value,
                })
              }
            />
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => (
        <Box>
          {params.colDef.headerName}
        </Box>
      ),
      sortable: false,
      flex: 4,

      renderCell: (params) => {
        return params.row.options[0]?.status || params.row.slug === 'no-treatment' ? (
          <Typography
            className="status-active"
            sx={{ width: "fit-content" }}
          >
            Active
          </Typography>
        ) : (
          <Typography
            className="status-inActive"
            sx={{ width: "fit-content" }}
          >
            Inactive
          </Typography>
        );
      },
    },
    {
      field: "Actions",
      align: "left",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => (
        <Box>
          {params.colDef.headerName}
        </Box>
      ),
      flex: 2,
      renderCell: (params) => {
        // const id = params.row._id;
        const data = params.row;
        return (
          <>
            <IconButton
              disabled={params.row.slug === 'no-treatment'}
              aria-haspopup="true"
              onClick={(event) => handleClickAction(event, data)}
            >
              <ArrowForward sx={{ color: params.row.slug === 'no-treatment' ? '' : "#8477DA" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && activeRow === data)} // Check if the active row matches the current row
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
                    width: "183px",
                    "& .MuiList-padding": {
                      p: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseAction();
                  handleUpdateCost(data); // Pass data directly
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
                  handleOpenEdit(data); // Pass data directly
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
                <EditOutlined sx={{ color: "#5D6164", height: '20px', width: '20px' }} />

              </MenuItem>
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
                onClick={() => handleStatusChange(data)}
              >
                <p>Change Status</p>
                {/* <Box sx={{ width: "59px", height: "39px" }}> */}
                <CustomSmallSwtich
                  inputProps={{ 'aria-label': 'ant design' }}
                  checked={rowStatus[params.row._id] !== undefined
                    ? rowStatus[params.row._id] : data.options[0]?.status}
                  // onChange={() => handleStatusChange(data)}
                  text={""}
                />
                {/* </Box> */}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  // handleCloseAction();
                  setDeleteModalOpen(true);
                  // handleHardwareDelete(id); // Pass id directly
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
                <DeleteOutlineOutlined sx={{ color: "#E22A2D", height: '20px', width: '20px' }} />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (refetchData) {
      glassAddonRefetch();
    }
  }, [refetchData]);
  useEffect(() => {
    glassAddonRefetch();
  }, []);
  useEffect(() => {
    if (glassAddonEditSuccess) {
      if (updateRefetch) {
        glassAddonRefetch();
      }
      // setRowCosts({});
    }
    if (deleteSuccess) {
      glassAddonRefetch();
      setActiveRow(null);
      setDeleteModalOpen(false);
      setRowCosts({});
    }
  }, [deleteSuccess, glassAddonEditSuccess]);
  // const miniTab = useMediaQuery("(max-width: 1400px)");
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
          Shower<span style={{ color: "black" }}> / {type}</span>
        </p>
        <div>
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

      <Box
        sx={{
          border: "1px solid #D0D5DD",
          borderRadius: "8px",
          width: "100%",
          m: "auto",
          overflow: "hidden",
          mt: 2,
        }}
      >
        {isLoading ? (
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
            {glassAddons.length >= 1 ? (
              <>
                <DataGrid
                  loading={glassAddonFetching}
                  style={{ border: "none" }}
                  getRowId={(row) => row._id}
                  // rows={filteredData.slice(
                  //   (page - 1) * itemsPerPage,
                  //   page * itemsPerPage
                  // )}
                  disableColumnFilter
                  disableColumnMenu
                  rows={glassAddons}
                  columns={GlassAddonsColumn.concat(actionColumn)}
                  pageSize={itemsPerPage}
                  rowCount={
                    glassAddons?.totalRecords ? glassAddons?.totalRecords : 0
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
                No Glass Addons Found
              </Typography>
            )}
          </div>
        )}
      </Box>

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
      {/* {glassAddonFetching ? (
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: miniTab ? "58vh" : "67vh",
            overflowY: "scroll",
            background: "#FFFF",
          }}
        >
          {glassAddons.length !== 0 ? (
            glassAddons?.map((entry, mainIndex) => (
              <AddonList
                key={mainIndex}
                entry={entry}
                mainIndex={mainIndex}
                refetch={glassAddonRefetch}
                type={type}
              />
            ))
          ) : (
            <Box sx={{ color: "#667085" }}>No GlassAddons Found</Box>
          )}
        </Box>
      )} */}
      <DeleteModal
        text={"Glass Addons"}
        open={deleteModalOpen}
        close={() => {
          setDeleteModalOpen(false);
        }}
        isLoading={LoadingForDelete}
        handleDelete={handleHardwareDelete}
      />
      <AddEditGlassAddon
        open={open}
        close={handleClose}
        data={edit}
        isEdit={isEdit}
        refetch={glassAddonRefetch}
        categorySlug={type}
      />
    </>
  );
};

export default GlassAddonGrid;
