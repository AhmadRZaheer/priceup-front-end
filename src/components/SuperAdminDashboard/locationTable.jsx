import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, convertDate } from "@/utilities/common";
import cloneIcon from "@/Assets/copy-icon.svg";
import DeleteIcon from "@/Assets/Delete-Icon.svg";
import EditIcon from "@/Assets/d.svg";
import AddEditLocationModal from "../Modal/editLoactionSuperAdmin";
import DeleteModal from "../Modal/deleteModal";
import CloneLocationModel from "../Modal/cloneLocationModal";
import { useDeleteUser, useUserStatus } from "@/utilities/ApiHooks/superAdmin";
import { CustomSmallSwtich } from "../common/CustomSmallSwitch";

const LocationTable = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [recordToModify, setRecordToModify] = useState(null);
  const [openModifyLocModal, setOpenModifyLocModal] = useState(false);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState({});
  const itemsPerPage = 10;
  const locationUrl = `${backendURL}/companies/by-role`;
  const {
    data: locationsData,
    refetch: refetchList,
    isFetching,
  } = useFetchAllDocuments(locationUrl);
  const { mutateAsync: deleteuserdata, isLoading: deleteisLoading } =
    useDeleteUser();
  const {
    mutate: updateLocationAdminStatus,
    isLoading: LoadingForEdit,
  } = useUserStatus();
  const handleDeleteUser = async () => {
    await deleteuserdata(recordToModify?.user);
    refetchList();
    setDeleteModalOpen(false);
  };
  const handleOpenCloneModal = (data) => {
    setRecordToModify(data);
    setCloneModalOpen(true);
  };
  const handleOpenDeleteModal = (data) => {
    setRecordToModify(data);
    setDeleteModalOpen(true);
  };
  const handleOpenModifyModal = (data) => {
    setRecordToModify(data);
    setOpenModifyLocModal(true);
  };  
  const handleToggleLocationStatus = (rowId, currentStatus) => {
    setLocationStatus((prevStatus) => ({
      ...prevStatus,
      [rowId]: !currentStatus,
    }));

    updateLocationAdminStatus({ status: !currentStatus, id: rowId })
  };

  useEffect(() => {
    setLoading(false);
    refetchList();
  }, []);

  const locationsList = useMemo(() => {
    return locationsData?.companies ? locationsData?.companies : [];
  }, [locationsData]);
  console.log(locationsList);

  const actionColumns = [
    {
      field: "Location Name",
      headerName: "Location Name",
      headerClassName: "locationManagement",
      flex: 2,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => {
        return (
          <Box sx={{ pl: "14px" }}>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                lineHeight: "21.86px",
                color: "#212528",
                pb: 1,
              }}
            >
              {params?.row?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: "19.12px",
                color: "#5D6164",
              }}
            >
              {params?.row?.user?.name} <br />
              {params?.row?.user?.email} <br />
              {convertDate(params?.row?.createdAt)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Estimates",
      headerName: "Estimates",
      headerClassName: "locationManagement",
      flex: 0.8,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => (
        <Box
          sx={{
            pl: "14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "21.86px",
              color: "#212528",
            }}
          >
            {params?.row?.estimates ?? 0}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Users",
      headerName: "Users",
      headerClassName: "locationManagement",
      flex: 0.8,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => (
        <Box
          sx={{
            pl: "14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "21.86px",
              color: "#212528",
            }}
          >
            {params?.row?.staffs?.length ?? 0}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Customers",
      headerName: "Customers",
      headerClassName: "locationManagement",
      flex: 0.8,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => (
        <Box
          sx={{
            pl: "14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "21.86px",
              color: "#212528",
            }}
          >
            {params?.row?.customers ?? 0}
          </Typography>
        </Box>
      ),
    },
    {
      field: "Admins",
      headerName: "Admins",
      headerClassName: "locationManagement",
      flex: 0.8,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => (
        <Box
          sx={{
            pl: "14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "21.86px",
              color: "#212528",
            }}
          >
            0
          </Typography>
        </Box>
      ),
    },
    {
      field: "Layouts",
      headerName: "Layouts",
      headerClassName: "locationManagement",
      flex: 0.8,
      sortable: false,
      renderHeader: (params) => params.colDef.headerName,
      renderCell: (params) => (
        <Box
          sx={{
            pl: "14px",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "21.86px",
              color: "#212528",
            }}
          >
            {params?.row?.layouts ?? 0}
          </Typography>
        </Box>
      ),
    },
    {
      field: " ",
      headerName: " ",
      headerClassName: "locationManagement",
      renderHeader: (params) => params.colDef.headerName,
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        const currentStatus = locationStatus[params.row.user._id] ?? params.row.user.status;
        return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            gap: "12px",
            pl: "14px",
          }}
        >
           <Tooltip title={currentStatus ? "" : "This Location is not Active"}>
              <span>
                <CustomSmallSwtich
                  checked={currentStatus}
                  onChange={() => handleToggleLocationStatus(params.row.user._id, currentStatus)}
                />
              </span>
            </Tooltip>
          <IconButton
            sx={{ width: 20, height: 20 }}
            onClick={() => handleOpenCloneModal(params?.row)}
          >
            <img
              src={cloneIcon}
              alt="clone icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>

          <IconButton
            sx={{ width: 20, height: 20 }}
            onClick={() => handleOpenDeleteModal(params?.row)}
          >
            <img
              src={DeleteIcon}
              alt="delete icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <IconButton
            sx={{ width: 20, height: 20 }}
            onClick={() => handleOpenModifyModal(params?.row)}
          >
            <img
              src={EditIcon}
              alt="delete icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </Box>
      )}
    },
  ];

  return (
    <>
      <Box>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: "20px",
              px: "22px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "24.59px",
                  fontWeight: 600,
                }}
              >
                Location Managment
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isFetching ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxHeight: "70vh",
                  minHeight: "20vh",
                }}
              >
                <CircularProgress
                  sx={{
                    width: "100%",
                    ".MuiDataGrid-virtualScroller": {
                      overflow: "hidden !important",
                    },
                  }}
                />
              </Box>
            ) : locationsData && locationsData?.length <= 0 ? (
              <Typography
                sx={{
                  color: "#667085",
                  p: 2,
                  textAlign: "center",
                  background: "#FFFF",
                }}
              >
                No Location Found
              </Typography>
            ) : (
              <Box>
                <DataGrid
                  loading={loading || LoadingForEdit}
                  style={{ border: "none" }}
                  getRowId={(row) => row._id}
                  rows={locationsList}
                  columns={actionColumns}
                  rowHeight={138.5}
                  sx={{
                    width: "100%",
                    minHeight: "500px",
                    ".MuiDataGrid-cell": {
                      borderRight: "1px solid red",
                    },
                  }}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={locationsList?.length ? locationsList?.length : 0}
                  className="table"
                  hideFooter
                  disableColumnMenu
                  pagination={false}
                />
                <Box sx={{ width: "100%" }}>
                  <Pagination
                    totalRecords={
                      locationsList?.length ? locationsList?.length : 0
                    }
                    itemsPerPage={itemsPerPage}
                    page={page}
                    setPage={setPage}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <AddEditLocationModal
        open={openModifyLocModal}
        handleClose={() => setOpenModifyLocModal(false)}
        recordToModify={recordToModify}
        refetch={refetchList}
      />
      <DeleteModal
        open={deleteModalOpen}
        text={"location"}
        close={() => setDeleteModalOpen(false)}
        isLoading={deleteisLoading}
        handleDelete={handleDeleteUser}
      />
      <CloneLocationModel
        open={cloneModalOpen}
        close={() => setCloneModalOpen(false)}
        refetch={refetchList}
        data={recordToModify}
      />
    </>
  );
};

export default LocationTable;
