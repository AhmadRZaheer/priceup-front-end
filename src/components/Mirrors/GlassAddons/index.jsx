import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  // CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Add, ArrowForward } from "@mui/icons-material";
// import CustomIconButton from "@/components/ui-components/CustomButton";
import {
  useCreateDocument,
  useDeleteDocument,
  useDeleteDocumentProp,
  useEditDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
// import HardwareItem from "@/components/common/HardwareItem";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import { setMirrorsHardwareRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { MirrorsGlassAddons } from "@/utilities/DataGridColumns";
import CustomInputField from "@/components/ui-components/CustomInput";
// import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CustomSmallSwtich } from "@/components/common/CustomSmallSwitch";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";
import { inputLength, inputMaxValue } from "@/utilities/constants";

const MirrorsGlassAddonComponent = () => {
  const dispatch = useDispatch();
  const routePrefix = `${backendURL}/mirrors/glassAddons`;

  const decodedToken = getDecryptedToken();
  const {
    data: glassAddonsList,
    refetch: refetchGlassAddonsList,
    isFetching: fetchingGlassAddonsList,
    isFetched,
  } = useFetchAllDocuments(routePrefix);
  const {
    mutate: deleteGlassAddon,
    isLoading: deleteGlassAddonLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();
  const {
    // mutate: deleteGlassAddonOption,
    // isLoading: deleteGlassAddonOptionLoading,
    isSuccess: deleteOptionSuccess,
  } = useDeleteDocumentProp();
  const {
    mutate: editGlassAddon,
    isLoading: editGlassAddonLoading,
    isSuccess: editSuccess,
  } = useEditDocument();
  const {
    mutate: createGlassAddon,
    isLoading: createGlassAddonLoading,
    isSuccess: createSuccess,
  } = useCreateDocument();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [updateRefetch, setUpdateRefetch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [rowCosts, setRowCosts] = useState({});
  const [rowStatus, setRowStatus] = useState({});
  const [upgradeOption, setUpgradeOption] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleHardwareDelete = () => {
    deleteGlassAddon({ apiRoute: `${routePrefix}/${itemToModify?._id}` });
  };

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateItem = (props) => {
    console.log(props, "item modified");
    const isFile = typeof props?.image === "object";
    if (props?.options) {
      editGlassAddon({
        data: { options: props.options },
        apiRoute: `${routePrefix}/${props.id}`,
      });
      setUpdateRefetch(true);
    } else {
      const formData = new FormData();
      if (props?.name) {
        formData.append("name", props.name);
      }
      if (props?.image && isFile) {
        formData.append("image", props.image);
      }
      if (props?.options) {
        formData.append("options", props.options);
      }
      if (props?.description) {
        formData.append("description", props.description);
      }
      console.log(formData, "form data");
      editGlassAddon({
        data: formData,
        apiRoute: `${routePrefix}/${props.id}`,
      });
      setUpdateRefetch(true);
    }
    localStorage.setItem("scrollToIndex", props.id);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCreateItem = (props) => {
    const slug = createSlug(props.name);
    const formData = new FormData();
    if (props.image) {
      formData.append("image", props.image);
    }
    formData.append("name", props.name);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("slug", slug);
    formData.append("description", props.description);
    createGlassAddon({ data: formData, apiRoute: `${routePrefix}/save` });
  };
  const miniTab = useMediaQuery("(max-width: 1280px)");

  // Data Grid

  const handleClickAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row); // Set the current row when the menu is triggered
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActiveRow(null);
  };

  const handleUpdateCost = (data) => {
    handleClose();
    const updatedOptions = data.options.map((option) => ({
      ...option,
      cost:
        rowCosts[data._id] !== undefined
          ? parseFloat(rowCosts[data._id])
          : option.cost,
    }));
    setUpdateRefetch(false);
    editGlassAddon({
      data: { options: updatedOptions },
      apiRoute: `${routePrefix}/${data._id}`,
    });
  };

  const handleStatusChange = (row) => {
    setRowStatus({
      ...rowStatus,
      [row._id]: !row.options[0].status,
    });
    const updatedOptions = row.options.map((option) => ({
      ...option,
      status: !option.status, // Toggle the status
    }));
    // Update the backend with the new status
    editGlassAddon({
      data: { options: updatedOptions },
      apiRoute: `${routePrefix}/${row._id}`,
    });
    setUpdateRefetch(true);
  };
  const handleUpgradeStatusChange = (row) => {
    setUpgradeOption({
      ...upgradeOption,
      [row._id]: !row.showInUpgrades,
    });
    editGlassAddon({
      data: { showInUpgrades: !row.showInUpgrades },
      apiRoute: `${routePrefix}/${row._id}`,
    });
    setUpdateRefetch(true);
  }

  useEffect(() => {
    refetchGlassAddonsList();

    if (createSuccess) {
      setCreateModalOpen(false);
      dispatch(setMirrorsHardwareRefetch());
      setRowCosts({});
    }
    if (deleteSuccess) {
      setDeleteModalOpen(false);
      dispatch(setMirrorsHardwareRefetch());
      setRowCosts({});
    }
  }, [deleteSuccess, createSuccess, deleteOptionSuccess]);

  useEffect(() => {
    if (editSuccess) {
      if (updateRefetch) {
        refetchGlassAddonsList();
      }
      setUpdateModalOpen(false);
      dispatch(setMirrorsHardwareRefetch());
      // setRowCosts({})
    }
  }, [editSuccess]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  const actionColumn = [
    {
      field: "Cost",
      headerName: "Cost",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => <Box>{params.colDef.headerName}</Box>,
      flex: 1.6,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                width: "101px",
              }}
            >
              <CustomInputField
                size="small"
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: inputMaxValue,
                }}
                name="cost"
                placeholder="Cost"
                value={
                  rowCosts[params.row._id] !== undefined
                    ? rowCosts[params.row._id]
                    : params.row.options[0].cost
                }
                onChange={(e) => {
                  if (e.target.value.length <= inputLength) {
                    setRowCosts({
                      ...rowCosts,
                      [params.row._id]: e.target.value,
                    });
                  }
                }}
              />
            </Box>
          </>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => <Box>{params.colDef.headerName}</Box>,
      flex: 2.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                // height: "21px",
                bgcolor:
                  params?.row?.options[0]?.status === true
                    ? "#EFECFF"
                    : "#F3F5F6",
                borderRadius: "70px",
                p: "6px 8px",
                display: "grid",
                gap: "7px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: "21px",
                  color:
                    params?.row?.options[0]?.status === true
                      ? "#8477DA"
                      : "#5D6164",
                }}
              >
                {params?.row?.options[0]?.status === true
                  ? "Active"
                  : "Inactive"}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => <Box>{params.colDef.headerName}</Box>,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => {
        const id = params.row._id;
        const data = params.row;
        return (
          <>
            <IconButton
              aria-haspopup="true"
              onClick={(event) => {
                handleClickAction(event, data);
                setItemToModify(data);
              }}
            >
              <ArrowForward sx={{ color: "#8477DA" }} />
            </IconButton>
            <Menu
              // id={params.row._id}
              anchorEl={anchorEl}
              open={Boolean(anchorEl && activeRow === data)} // Check if the active row matches the current row
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "none",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                    border: "1px solid #D0D5DD",
                    p: 0,
                    width: "183px",
                    "& .MuiList-padding": {
                      p: 0,
                    },
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => handleUpdateCost(data)}
                className="mirror-meun-item"
              >
                <Typography className="dropTxt">Update</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setItemToModify(params?.row);
                  handleOpenUpdateModal();
                  handleClose();
                }}
                className="mirror-meun-item"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className="dropTxt">Edit</Typography>
                  <EditOutlinedIcon
                    sx={{ color: "#5D6164", height: "20px", width: "20px" }}
                  />
                </Box>
              </MenuItem>
              <MenuItem
                className="mirror-meun-item"
                onClick={() => handleStatusChange(params.row)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className="dropTxt">Change Status</Typography>
                  <CustomSmallSwtich
                    checked={
                      rowStatus[params.row._id] !== undefined
                        ? rowStatus[params.row._id]
                        : params?.row?.options[0]?.status
                    }
                    // onChange={() => handleStatusChange(params.row)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                </Box>
              </MenuItem>
              <MenuItem
                className="mirror-meun-item"
                onClick={() => handleUpgradeStatusChange(params.row)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className="dropTxt">Show in Upgrade</Typography>
                  <CustomSmallSwtich
                    checked={
                      upgradeOption[params.row._id] !== undefined
                        ? upgradeOption[params.row._id]
                        : params?.row?.showInUpgrades
                    }
                    // onChange={() => handleStatusChange(params.row)}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setItemToModify(params?.row);
                  handleOpenDeleteModal();
                  handleClose();
                }}
                sx={{
                  p: "12px",
                  ":hover": {
                    background: "#EDEBFA",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography className="dropTxt">Delete</Typography>
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: "#E22A2D", height: "20px", width: "20px" }}
                  />
                </Box>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const SkeletonColumnsGenerated = GenrateColumns([
    "Addon Type",
    "Cost",
    "Status",
    "Actions",
  ]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const columns = MirrorsGlassAddons().concat(actionColumn);

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // pt: 1.5,
            pb: 1.5,
          }}
        >
          <Typography
            className="headingTxt"
            sx={{
              color: "#5D6164",
              display: "flex",
              alignSelf: "center",
            }}
          >
            Mirror &nbsp;
            <Box
              className="headingTxt"
              sx={{
                color: "#000000",
              }}
            >
              / Glass Addons
            </Box>
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenCreateModal}
            sx={{
              background: "#8477DA",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: "0px",
              ":hover": {
                background: "#8477DA",
              },
            }}
          >
            Add New
          </Button>
        </Box>

        <Box
          sx={{
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            overflow: "hidden",
            width: "99.88%",
            m: "auto",
            mt: 1.5,
            background: "#FFFF",
          }}
        >
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
          ) : glassAddonsList?.length > 0 ? (
            <Box>
              <DataGrid
                loading={fetchingGlassAddonsList}
                style={{
                  border: "none",
                }}
                getRowId={(row) => row._id}
                rows={glassAddonsList}
                columns={columns}
                rowHeight={70.75}
                sx={{
                  width: "100%",
                  ".MuiDataGrid-virtualScroller": {
                    overflow: "hidden !important",
                  },
                }}
                hideFooter
                disableColumnMenu
              />
            </Box>
          ) : (
            <Typography
              sx={{
                color: "#667085",
                p: 2,
                textAlign: "center",
                background: "#FFFF",
              }}
            >
              No Glass Addons Found
            </Typography>
          )}
        </Box>
        <DeleteModal
          open={deleteModalOpen}
          close={() => {
            setDeleteModalOpen(false);
          }}
          isLoading={deleteGlassAddonLoading}
          text={"Glass Addons"}
          handleDelete={handleHardwareDelete}
        />
        <HardwareEditModal
          open={updateModalOpen}
          close={() => {
            setUpdateModalOpen(false);
          }}
          data={itemToModify}
          isLoading={editGlassAddonLoading}
          handleEdit={handleUpdateItem}
          hardwareType={"Glass Addon"}
        />
        <HardwareCreateModal
          open={createModalOpen}
          close={() => {
            setCreateModalOpen(false);
          }}
          isLoading={createGlassAddonLoading}
          handleCreate={handleCreateItem}
          hardwareType={"Glass Addon"}
        />
      </Box>
    </>
  );
};

export default MirrorsGlassAddonComponent;
