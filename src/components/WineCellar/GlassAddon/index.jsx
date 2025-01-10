import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  WineMirrorsGlassAddon,
  WineMirrorsGlassType,
} from "@/utilities/DataGridColumns";
import CustomInputField from "@/components/ui-components/CustomInput";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { CustomSmallSwtich } from "@/components/common/CustomSmallSwitch";
import {
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { setWineCellarsHardwareRefetch } from "@/redux/refetch";
import { GenrateColumns, GenrateRows } from "@/utilities/skeltonLoading";
import { inputLength, inputMaxValue } from "@/utilities/constants";

const WineGlassAddonComponent = () => {
  const dispatch = useDispatch();
  const routePrefix = `${backendURL}/wineCellars/glassAddons`;
  const {
    data: wineGlassAddonsList,
    isFetched,
    refetch: refetchGlassAddonsList,
    isFetching: fetchingGlassAddonsList,
  } = useFetchAllDocuments(routePrefix);

  const {
    mutate: createWineGlassAddon,
    isLoading: createWineGlassAddonLoading,
    isSuccess: createWineGlassSuccess,
  } = useCreateDocument();
  const {
    mutate: editWineGlassAddon,
    isLoading: editGlassAddonLoading,
    isSuccess: editSuccess,
  } = useEditDocument();
  const {
    mutate: deleteWineGlassAddon,
    isLoading: deleteGlassAddonLoading,
    isSuccess: deleteWineSuccess,
  } = useDeleteDocument();

  const decodedToken = getDecryptedToken();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [itemToModify, setItemToModify] = useState(null);
  const [updateRefetch, setUpdateRefetch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [rowCosts, setRowCosts] = useState({});
  const [rowStatus, setRowStatus] = useState({});
  const [editGlassType, setEditGlassType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [upgradeOption, setUpgradeOption] = useState({});

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };
  const handleHardwareDelete = () => {
    deleteWineGlassAddon({ apiRoute: `${routePrefix}/${itemToModify?._id}` });
  };

  const handleOpenUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const handleUpdateItem = (props) => {
    const isFile = typeof props?.image === "object";
    if (props?.options) {
      editWineGlassAddon({
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
      editWineGlassAddon({
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
    formData.append("description", props.description);
    formData.append("company_id", decodedToken?.company_id);
    formData.append("slug", slug);
    createWineGlassAddon({ data: formData, apiRoute: `${routePrefix}/save` });
  };

  const handleClickAction = (event, row) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
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
    editWineGlassAddon({
      data: { options: updatedOptions },
      apiRoute: `${routePrefix}/${data._id}`,
    });
  };
  const handleStatusChange = (row) => {
    setEditGlassType(true);

    setRowStatus({
      ...rowStatus,
      [row._id]: !row.options[0].status,
    });
    const updatedOptions = row.options.map((option) => ({
      ...option,
      status: !option.status, // Toggle the status
    }));
    editWineGlassAddon({
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
    editWineGlassAddon({
      data: { showInUpgrades: !row.showInUpgrades },
      apiRoute: `${routePrefix}/${row._id}`,
    });
    setUpdateRefetch(true);
  };

  useEffect(() => {
    refetchGlassAddonsList();
    if (createWineGlassSuccess) {
      setCreateModalOpen(false);
      dispatch(setWineCellarsHardwareRefetch());
      setRowCosts({});
    }
    if (deleteWineSuccess) {
      setDeleteModalOpen(false);
      dispatch(setWineCellarsHardwareRefetch());
      setRowCosts({});
    }
  }, [createWineGlassSuccess, deleteWineSuccess]);

  useEffect(() => {
    if (isFetched) {
      setIsLoading(false);
    }
  }, [isFetched]);

  useEffect(() => {
    if (editSuccess) {
      if (updateRefetch) {
        refetchGlassAddonsList();
      }
      setUpdateModalOpen(false);
      setTimeout(() => {
        setEditGlassType(false);
      }, 600);
      dispatch(setWineCellarsHardwareRefetch());
    }
  }, [editSuccess]);

  const thicknessOptions = [
    { id: "3/8", name: "Thickness 3/8" },
    { id: "1/2", name: "Thickness 1/2" },
  ];

  const actionColumn = [
    {
      field: "Cost per square inch",
      headerName: "Cost per square inch",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => <Box>{params.colDef.headerName}</Box>,
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ width: "101px" }}>
          <CustomInputField
            disabled={params.row.slug === "no-treatment"}
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
                : params.row.options[0]?.cost
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
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "showerHardwareHeader",
      renderHeader: (params) => <Box>{params.colDef.headerName}</Box>,
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        return params.row.options[0]?.status ||
          params.row.slug === "no-treatment" ? (
          <Typography className="status-active" sx={{ width: "fit-content" }}>
            Active
          </Typography>
        ) : (
          <Typography className="status-inActive" sx={{ width: "fit-content" }}>
            Inactive
          </Typography>
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
        const data = params.row;
        return (
          <>
            <IconButton
              disabled={params.row.slug === "no-treatment"}
              aria-haspopup="true"
              onClick={(event) => {
                handleClickAction(event, data);
                setItemToModify(data);
              }}
            >
              <ArrowForward
                sx={{
                  color: params.row.slug === "no-treatment" ? "" : "#8477DA",
                }}
              />
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
                onClick={() => handleStatusChange(data)}
              >
                <p>Change Status</p>
                {/* <Box sx={{ width: "59px", height: "39px" }}> */}
                <CustomSmallSwtich
                  inputProps={{ "aria-label": "ant design" }}
                  checked={
                    rowStatus[params.row._id] !== undefined
                      ? rowStatus[params.row._id]
                      : data.options[0]?.status
                  }
                  // onChange={() => handleStatusChange(data)}
                  text={""}
                />
                {/* </Box> */}
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
  const columns = WineMirrorsGlassAddon().concat(actionColumn);

  const SkeletonColumnsGenerated = GenrateColumns([
    "Glass Addon",
    "Cost",
    "Status",
    "Actions",
  ]);
  const SkeletonRowsGenerated = GenrateRows([1, 2, 3, 4, 5, 6, 7, 8]);

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
            Wine Cellar &nbsp;
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
          ) : wineGlassAddonsList?.length > 0 ? (
            <Box>
              <DataGrid
                loading={fetchingGlassAddonsList}
                style={{
                  border: "none",
                }}
                getRowId={(row) => row._id}
                rows={wineGlassAddonsList}
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
          handleDelete={handleHardwareDelete}
          text={"Glass Addon"}
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
          isLoading={createWineGlassAddonLoading}
          handleCreate={handleCreateItem}
          hardwareType={"Glass Addon"}
        />
      </Box>
    </>
  );
};

export default WineGlassAddonComponent;
