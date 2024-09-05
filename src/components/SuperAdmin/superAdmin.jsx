import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./superAdmin.scss";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  Grid,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import icon from "@/Assets/search-icon.svg";
import {
  useDeleteUser,
  useSwitchLocationSuperAdmin,
} from "@/utilities/ApiHooks/superAdmin";
import { Add } from "@mui/icons-material";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import DeleteModal from "../Modal/deleteModal";
import CloneLocationModel from "../Modal/cloneLocationModal";
import SingleLocation from "../ui-components/singleLocation";
import WidgetCard from "../ui-components/widgetCard";
import CustomInputField from "../ui-components/CustomInput";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import AddEditLocationModal from "../Modal/editLoactionSuperAdmin";
import { debounce } from "lodash";

const SuperAdminTable = () => {
  const routePrefix = `${backendURL}/companies`;
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);
  const decodedToken = getDecryptedToken();

  const {
    data: locationsData,
    refetch: refetchList,
    isFetched,
    isFetching,
  } = useFetchAllDocuments(
    `${routePrefix}/by-role?search=${search}${status !== null ? `&status=${status}` : ""
    }`
  );
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const {
    mutateAsync: deleteuserdata,
    isLoading: deleteisLoading,
  } = useDeleteUser();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [recordToModify, setRecordToModify] = useState(null);

  const handleDeleteUser = async () => {
    await deleteuserdata(recordToModify?.user);
    refetchList();
    setDeleteModalOpen(false);
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetchList();
    }, 700),
    [search]
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedRefetch();
  };

  const handleOpenDeleteModal = (data) => {
    setRecordToModify(data);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleCloseModifyModal = () => setModifyModalOpen(false);
  const handleOpenModifyModal = (data) => {
    setRecordToModify(data);
    setModifyModalOpen(true);
  };
  const handleOpenCloneModal = (data) => {
    setRecordToModify(data);
    setCloneModalOpen(true);
  };
  const handleCloseCloneModal = () => {
    setCloneModalOpen(false);
  };

  const handleAdminClick = (admin) => {
    switchLocationSuperAdmin({
      company_id: admin._id,
      adminId: admin.user._id,
    });
  };

  const handleCreateLocation = () => {
    setRecordToModify(null);
    setModifyModalOpen(true);
  };

  const handleClearFilter = () => {
    setStatus(null);
    setSearch("");
  };

  const locationsList = useMemo(() => {
    return locationsData?.companies ? locationsData?.companies : [];
  }, [locationsData])

  useEffect(() => {
    refetchList();
  }, [status]);

  useEffect(() => {
    if (switchedSuperAdmin) {
      localStorage.setItem("userReference", decodedToken.id);
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
  }, [switchedSuperAdmin]);

  return (
    <Box sx={{
      // height: "90vh",
      overflow: "auto"
    }}>
      <div className="page-title-location">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // width: "98%",
            margin: "auto",
          }}
        >
          <Box>
            <Typography sx={{
              fontSize: 24,
              fontWeight: 600,
              lineHeight: '32.78px'
            }}>
              Location Management
            </Typography>
            <Typography
              sx={{
                color: "#212528",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: '21.86px',
                opacity: '70%'
              }}
            >
              Add, edit and manage your locations.
            </Typography>
          </Box>
          <Box sx={{ alignSelf: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleCreateLocation(true)}
              sx={{
                backgroundColor: "#8477DA",
                "&:hover": { backgroundColor: "#8477DA" },
                letterSpacing: '0px',
                color: "white",
                fontSize: 16,
                fontWeight: 600,
                gap: '10px',
              }}
            // startIcon={}
            >
              <Add color="white" />
              Add New Location
            </Button>
          </Box>
        </Box>
      </div>
      <Grid container sx={{}} spacing={2}>
        {[
          { title: "Active Locations", text: locationsData?.globalCounts?.activeLocations ?? 0, variant: "blue" },
          {
            title: "Non-Active Locations",
            text: locationsData?.globalCounts?.inactiveLocations ?? 0,
            variant: "red",
          },
        ].map((item) => (
          <Grid item lg={3} md={6} xs={6}>
            <WidgetCard
              text={item.text}
              title={item.title}
              varient={item.variant}
              type={2}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          my: 2,
          mt: 3,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
          All Locations
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Box>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={handleChange}
            />
          </Box>

          <FormControl sx={{ width: "152px" }} size="small" className="custom-textfield">
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              displayEmpty
              placeholder="Status"
              sx={{ height: "40px" }}
              renderValue={(selected) => {
                if (selected === null) {
                  return <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      // lineHeight: '16.41px',
                      color: '#000000',
                      fontFamily: '"Roboto",sans-serif !important'
                    }}>Status</Typography>;
                }

                return selected ? (
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
              }}
            >
              <MenuItem value={true}>
                <Typography
                  className="status-active"
                  sx={{ padding: 0, px: 2, width: "fit-content" }}
                >
                  Active
                </Typography>
              </MenuItem>
              <MenuItem value={false}>
                <Typography
                  className="status-inActive"
                  sx={{ padding: 0, px: 2, width: "fit-content" }}
                >
                  Inactive
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
          {/* <Box> */}
          <Button onClick={handleClearFilter} variant="text" sx={{ p: '6px 8px !important', fontFamily: '"Roboto",sans-serif !important' }}>
            Clear Filter
          </Button>
          {/* </Box> */}
        </Box>
      </Box>
      <Grid container gap={2} pt={0}>
        {isFetching ? (
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              height: "300px",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : locationsList?.length > 0 ? (
          locationsList?.map((item) =>
            <Grid item xs={5.8} xl={3.89} sx={{
              '@media (min-width: 1400px) and (max-width: 1550px)': {
                flexBasis: '32.3%',  // Equivalent to lg={12} for screens smaller than 1400px
                maxWidth: '32.3%',
              },
            }}>
              <SingleLocation
                data={item}
                handleAccessLocation={handleAdminClick}
                handleEdit={handleOpenModifyModal}
                handleClone={handleOpenCloneModal}
                handleDelete={handleOpenDeleteModal}
                refetch={refetchList}
              />
            </Grid>
          )
        ) : (
          <Box
            sx={{ color: "#667085", mt: 1, width: "100%", textAlign: "center" }}
          >
            No Location Found
          </Box>
        )}
      </Grid>
      <DeleteModal
        open={deleteModalOpen}
        text={"location"}
        close={handleCloseDeleteModal}
        isLoading={deleteisLoading}
        handleDelete={handleDeleteUser}
      />
      <AddEditLocationModal
        open={modifyModalOpen}
        handleClose={handleCloseModifyModal}
        recordToModify={recordToModify}
        refetch={refetchList}
      />
      <CloneLocationModel
        open={cloneModalOpen}
        close={handleCloseCloneModal}
        refetch={refetchList}
        data={recordToModify}
      />
    </Box>
  );
};

export default SuperAdminTable;
