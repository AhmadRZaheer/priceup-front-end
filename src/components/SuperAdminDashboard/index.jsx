import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import WidgetCard from "../ui-components/widgetCard";
import CustomDoubleLineChart from "../charts/CustomDoubleLineChart";
import DefaultImage from "../ui-components/defaultImage";
import LocationTable from "./locationTable";
import AddTeamMembers from "../Modal/addTeamMembers";
import AddEditLocationModal from "../Modal/editLoactionSuperAdmin";
import CloneLocationModel from "../Modal/cloneLocationModal";
import DeleteModal from "../Modal/deleteModal";
import { useDeleteUser } from "@/utilities/ApiHooks/superAdmin";
import CustomLineChart from "../charts/CustomLineChart";
import CustomAreaChart from "../charts/CustomAreaChart";
import GraphSkeleton from "../dashboard/GraphSkeleton";

const chartData = [
  { x: "2019/01/01", y: 400 },
  { x: "2019/04/01", y: 430 },
  { x: "2019/07/01", y: 448 },
  { x: "2019/10/01", y: 470 },
  { x: "2020/01/01", y: 540 },
  { x: "2020/04/01", y: 580 },
  { x: "2020/07/01", y: 690 },
  { x: "2020/10/01", y: 690 },
];

const SuperAdminDashboardPage = () => {
  const [recordToModify, setRecordToModify] = useState(null);
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [openModifyLocModal, setOpenModifyLocModal] = useState(false);
  const locationUrl = `${backendURL}/companies/by-role`;
  const dashboardUrl = `${backendURL}/admins/dashbaord-stats`;
  const {
    data: locationsData,
    refetch: refetchList,
    isFetching,
  } = useFetchAllDocuments(locationUrl);
  const {
    data: dahboardData,
    refetch: refetchdahboardData,
    isFetching: dahboardDataFetching,
  } = useFetchAllDocuments(dashboardUrl);

  const handleCreateUser = async () => {
    setRecordToModify(null);
    setOpenModifyModal(true);
  };
  const handleCreateLocation = () => {
    setRecordToModify(null);
    setOpenModifyLocModal(true);
  };

  useEffect(() => {
    refetchList();
    refetchdahboardData();
  }, [locationsData]);

  const locationsList = useMemo(() => {
    return locationsData?.companies ? locationsData?.companies : [];
  }, [locationsData]);

  return (
    <Box
      sx={{
        overflow: "auto",
        overflowX:'hidden'
      }}
    >
      <Box className="page-title-location">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: "32.78px",
              }}
            >
              Dashboard
            </Typography>
            <Typography
              sx={{
                color: "#212528",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "21.86px",
                opacity: "70%",
              }}
            >
              Welcome back, Admin
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ alignSelf: "center" }}>
              <Button
                variant="contained"
                onClick={handleCreateUser}
                sx={{
                  border: "1px solid #D6DAE3",
                  boxShadow: "none",
                  backgroundColor: "#FFFFFF",
                  "&:hover": { backgroundColor: "#FFFFFF" },
                  letterSpacing: "0px",
                  color: "#212528",
                  fontSize: 16,
                  fontWeight: 600,
                  gap: "10px",
                }}
              >
                <Add color="#212528" />
                Add User
              </Button>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <Button
                variant="contained"
                onClick={handleCreateLocation}
                sx={{
                  border: "1px solid #D6DAE3",
                  boxShadow: "none",
                  backgroundColor: "#FFFFFF",
                  "&:hover": { backgroundColor: "#FFFFFF" },
                  letterSpacing: "0px",
                  color: "#212528",
                  fontSize: 16,
                  fontWeight: 600,
                  gap: "10px",
                }}
              >
                <Add color="#212528" />
                Add Location
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Grid container sx={{}} spacing={2}>
        {[
          {
            title: "Active Locations",
            text: dahboardData?.activeCompanyCount ?? 0,
            variant: "blue",
          },
          {
            title: "Non-Active Locations",
            text: dahboardData?.inactiveCompanyCount ?? 0,
            variant: "red",
          },
          {
            title: "Total Locations",
            text: locationsData?.companies?.length ?? 0,
            variant: "purple",
          },
          {
            title: "Total Users",
            text: dahboardData?.totalUsers ?? 0,
            variant: "green",
          },
        ].map((item, index) => (
          <Grid item lg={3} md={6} xs={6} key={index}>
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
        sx={{ pt: 3, gap: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            background: "white",
            width: "66%",
            pt: '20px',
            pl:'10px',
            borderRadius: 2,
            border: "1px solid #D0D5DD",
            boxShadow:'0 1px 2px 0 rgba(16, 24, 40, 0.05)'
          }}
        >
          <CustomDoubleLineChart />
        </Box>
        <Box
          sx={{
            background: "white",
            width: "33%",
            borderRadius: 2,
            border: "1px solid #D0D5DD",
            py: "20px",
            px: "22px",
            boxShadow:'0 1px 2px 0 rgba(16, 24, 40, 0.05)'
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: "24.59px",
              fontWeight: 600,
              pb: 2,
            }}
          >
            Active Locations
          </Typography>
          <Box>
            {dahboardDataFetching ? (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  height: "280px",
                  alignItems: "center",
                }}
              >
                <CircularProgress sx={{ color: "#8477DA" }} />
              </Box>
            ) : dahboardData?.topCompanies?.length > 0 ? (
              dahboardData?.topCompanies?.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ display: "flex", py: "12px" }}>
                    <Box sx={{ display: "flex", gap: 1, width: "50%" }}>
                      <DefaultImage
                        image={item?.image}
                        name={item?.name}
                        type={1}
                      />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontWeight: 500,
                          alignSelf: "center",
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "25%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#667085",
                        }}
                      >
                        Estimates
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          color: "#101828",
                        }}
                      >
                        {item.estimateCount ?? 0}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "25%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#667085",
                        }}
                      >
                        Customers
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          color: "#101828",
                        }}
                      >
                        {item.customerCount ?? 0}
                      </Typography>
                    </Box>
                  </Box>
                  {!(index + 1 === dahboardData?.topCompanies?.length) && (
                    <Divider sx={{ color: "#D1D4DB" }} />
                  )}
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  color: "#667085",
                  mt: 1,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No Location Found
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            gap: 2,
          }}
        >
          <GraphSkeleton name="Projects" />
          <GraphSkeleton name="Customers" />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: 2,
            gap:2
          }}
        >
          <Box
            sx={{
              background: "white",
              width: "49%",
              pt: '20px',
              pl:'10px',
              border: "1px solid #D0D5DD",
              borderRadius: 1,
              boxShadow:'0 1px 2px 0 rgba(16, 24, 40, 0.05)'
            }}
          >
            <CustomLineChart dataType="Projects" data={chartData} />
          </Box>
          <Box
            sx={{
              background: "white",
              width: "49%",
              pt: '20px',
              pl:'10px',
              border: "1px solid #D0D5DD",
              borderRadius: 1,
              boxShadow:'0 1px 2px 0 rgba(16, 24, 40, 0.05)'
            }}
          >
            <CustomAreaChart dataType="Customers" data={chartData} />
          </Box>
        </Box>
      )}
      <LocationTable
        locationsData={locationsData}
        refetchList={refetchList}
        isFetching={isFetching}
      />
      <AddTeamMembers
        open={openModifyModal}
        close={() => setOpenModifyModal(false)}
        recordToModify={recordToModify}
        refetchUsers={refetchdahboardData}
        locationsList={locationsList}
      />
      <AddEditLocationModal
        open={openModifyLocModal}
        handleClose={() => setOpenModifyLocModal(false)}
        recordToModify={recordToModify}
        refetch={refetchList}
      />
    </Box>
  );
};

export default SuperAdminDashboardPage;