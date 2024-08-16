import React, { useEffect, useState } from "react";
import "./style.scss";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "@/redux/userAuth";
import { useDispatch } from "react-redux";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DevicesFoldOutlinedIcon from "@mui/icons-material/DevicesFoldOutlined";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import SettingsIcon from "@/Assets/settings.svg";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import {
  Box,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import { parseJwt } from "../ProtectedRoute/authVerify";
import {
  Description,
  FmdGoodOutlined,
  UnfoldMore,
  ViewStreamOutlined,
} from "@mui/icons-material";
import {
  useBackToCustomAdminLocations,
  useBackToSuperAdmin,
  useFetchCustomAdminHaveAccessTo,
  useFetchDataAdmin,
  useSwitchLocationSuperAdmin,
  useSwitchLocationUser,
} from "../../utilities/ApiHooks/superAdmin";
import DefaultImage from "../ui-components/defaultImage";
import { userRoles } from "../../utilities/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuSigleItem from "./MenuSigleItem";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SwitchLocationPopup from "../ui-components/switchLocationPopup";

const AdminSideBar = () => {
  const { data: AdminData, refetch } = useFetchDataAdmin();
  const { mutate: haveAccessSet, data: haveAccessData } =
    useFetchCustomAdminHaveAccessTo();
  const {
    mutate: switchLocationUser,
    data: useToken,
    isSuccess: switched,
    isLoading: isSwitching,
  } = useSwitchLocationUser();
  const {
    mutate: switchLocationSuperAdmin,
    data: useTokenSuperAdmin,
    isSuccess: switchedSuperAdmin,
    isLoading: isSwitchingSuperAdmin,
  } = useSwitchLocationSuperAdmin();
  const {
    mutate: backRefetch,
    data: useTokenBack,
    isSuccess: switchedBack,
  } = useBackToCustomAdminLocations();
  const {
    mutate: backToSuperAdmin,
    data: useTokenBackSuperAdmin,
    isSuccess: switchedBackSuperAdmin,
  } = useBackToSuperAdmin();
  // const [open, setOpen] = useState(false);
  const [expandShowerAccordian, setExpandShowerAccordian] = useState(false);
  const [expandMirrorAccordian, setExpandMirrorAccordian] = useState(false);
  const [CustomActiveUser, setCustomActiveUser] = useState(""); // State for search query
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  // const dispatch = useDispatch();
  // const Logout = () => {
  //   dispatch(logoutHandler());
  //   window.location.href = "/login";
  // };
  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const handleSeeLocationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const [activeLocation, setActiveLocation] =
    useState(null); /** Added for branch PD-28 */

  const handleAdminNameClick = (admin) => {
    if (decodedToken.company_id !== admin?._id) {
      setActiveLocation(admin);
      switchLocationSuperAdmin({
        company_id: admin?._id,
        adminId: admin?.user_id,
      });
    }
  };
  const handleCustomUserClick = async (companyData) => {
    if (!companyData || !decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (companyData._id !== decodedToken.company_id) {
      await switchLocationUser(companyData._id);
      console.log("user changed");
    }
  };
  const handleBackCustomAdminClick = async () => {
    if (!decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (decodedToken.company_id) {
      await backRefetch();
      console.log("user backed");
    }
  };
  const handleBackToSuperAdmin = async () => {
    if (!decodedToken) {
      console.error("Invalid user data or decoded token.");
      return;
    }
    if (decodedToken.company_id) {
      const superAdminReference = localStorage.getItem("userReference");
      await backToSuperAdmin(superAdminReference);
      console.log("user backed");
    }
  };

  useEffect(() => {
    refetch();
    if (
      [
        "/mirrors/glass-types",
        "/mirrors/edge-works",
        "/mirrors/glass-addons",
        "/mirrors/hardwares",
      ].includes(location.pathname)
    ) {
      setExpandMirrorAccordian(true);
    }
    if (
      [
        "/layouts",
        "/glass-addons",
        "/glass-types",
        "/finishes",
        "/hardware",
      ].includes(location.pathname)
    ) {
      setExpandShowerAccordian(true);
    }
  }, []);
  useEffect(() => {
    if (switched) {
      localStorage.setItem("token", useToken);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (switchedSuperAdmin) {
      if (decodedToken.role === userRoles.SUPER_ADMIN) {
        localStorage.setItem("userReference", decodedToken.id);
      }
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (switchedBackSuperAdmin) {
      localStorage.removeItem("userReference");
      localStorage.setItem("token", useTokenBackSuperAdmin.token);
      window.location.href = "/";
    }
  }, [switched, switchedBack, switchedBackSuperAdmin, switchedSuperAdmin]);
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    haveAccessSet();
  }, []);
  /** Added for branch PD-28 */
  useEffect(() => {
    const fetchData = async () => {
      if (AdminData && AdminData.length) {
        const record = await AdminData.find(
          (admin) => admin?.company?._id === decodedToken?.company_id
        );
        if (record) {
          setActiveLocation(record);
        }
      }
    };

    fetchData();
  }, [AdminData]);
  /** Added for branch PD-28 */
  useEffect(() => {
    if (haveAccessData) {
      const user = haveAccessData.find(
        (item) => item?._id === decodedToken?.company_id
      );
      setCustomActiveUser(user?.name);
    }
  }, [haveAccessData, decodedToken]);
  const userReference = localStorage.getItem("userReference");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-between",
        justifyContent: "space-between",
      }}
    >
      {/* top section */}
      <Box height={"80%"}>
        {/* Top Options */}
        <Box sx={{ width: "100%", height: "24%", mx: "auto" }}>
          {userReference && (
            <>
            <Tooltip title="Switch Location">
              <Button
                onClick={handleSeeLocationsClick}
                sx={{
                  mx: "auto",
                  width: 290,
                  height: "56px",
                  color: "white",
                  padding: "4px 20px",
                  display: "flex",
                  borderRadius: '6px',
                  background: "#000000",
                  my: 2,
                  ":hover": {
                    background: "#000000",
                    backgroundColor: "#000000",
                  },
                }}
              >
                <Box>
                  <DefaultImage
                    image={
                      activeLocation?.company?.image || activeLocation?.image
                    }
                    name={activeLocation?.company?.name || activeLocation?.name}
                  />
                </Box>
                <span
                  style={{
                    flexGrow: 1,
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    whiteSpace: "nowrap",
                    display: "block",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {activeLocation?.company?.name || activeLocation?.name}
                </span>
                <ExpandMoreIcon sx={{ color: "#FFFF", mr: 1 ,transform : anchorEl !== null ? 'rotate(270deg)' : 'rotate(0deg)'   }} />
              </Button>
              
            </Tooltip>
            <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
              </>
          )}

          {decodedToken?.role === userRoles.CUSTOM_ADMIN ? (
          <>
          <Button
              onClick={handleSeeLocationsClick}
              sx={{
                mx: "auto",
                width: 290,
                height: "56px",
                color: "white",
                padding: "4px 20px",
                display: "flex",
                borderRadius: '6px',
                background: "#000000",
                my: 2,
                ":hover": {
                  background: "#000000",
                  backgroundColor: "#000000",
                },
              }}
            >
              <Box>
                <DefaultImage
                  image={
                    activeLocation?.image || activeLocation?.company?.image
                  }
                  name={activeLocation?.name || activeLocation?.company?.name}
                />
              </Box>
              <span
                style={{
                  flexGrow: 1,
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  whiteSpace: "nowrap",
                  display: "block",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  textTransform: "capitalize",
                }}
              >
                {CustomActiveUser}
              </span>
              <ExpandMoreIcon sx={{ color: "#FFFF", mr: 1,transform : anchorEl !== null ? 'rotate(270deg)' : 'rotate(0deg)' }} />
            </Button>
             <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)", }} />
             </>
          ) : (
            ""
          )}
          <Box sx={{ my: 1, mx: "auto" }}>
            <div className="center">
              <ul>
                <MenuSigleItem link="/">
                  <HomeOutlinedIcon sx={{ mr: 1 }} />
                  <span>Dashboard</span>
                </MenuSigleItem>
              </ul>
            </div>
            <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
          </Box>
        </Box>
        {/* Container Options */}
        <Box
          sx={{
            // width: "86%",
            mx: "auto",
            // mt: 3,
            height: "70%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            // gap: 1,
          }}
        >
          <Typography className="subtitle" sx={{ color: "#777B7E", pl: 2,pt:1 }}>
            {" "}
            Management{" "}
          </Typography>

          <div className="center">
            <ul>
              <MenuSigleItem link="/projects" >
                <DescriptionOutlinedIcon sx={{ mr: 1 }} />
                <span>Projects</span>
              </MenuSigleItem>
              <MenuSigleItem link="/estimates">
                <DescriptionOutlinedIcon sx={{ mr: 1 }} />
                <span>Old Estimates</span>
              </MenuSigleItem>
              <MenuSigleItem link="/customers">
                <PeopleAltOutlinedIcon sx={{ mr: 1 }} />
                <span>Customers</span>
              </MenuSigleItem>
              <MenuSigleItem link="/team">
                <PeopleAltOutlinedIcon sx={{ mr: 1 }} />
                <span>Users</span>
              </MenuSigleItem>
            </ul>
          </div>
          <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
          <Typography
            className="subtitle"
            sx={{ mt: 2, color: "#777B7E", pl: 2 }}
          >
            {" "}
            Categories{" "}
          </Typography>
          <Box sx={{ width: 290, mx: "auto" }}>
            <Accordion
              expanded={expandShowerAccordian}
              onChange={() => {
                setExpandShowerAccordian(!expandShowerAccordian);
              }}
              sx={{
                margin: "12px 0px !important",
                border: "none",
                background: "none",
                boxShadow: "none",
                "&.MuiAccordionSummary-expandIconWrapper": {
                  color: "white !important",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    className="expand1"
                    sx={{ color: "#5D6164" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  // background: " rgba(132, 119, 218, 0.3)",
                  color: "#5D6164",
                  ":hover": {
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius:'6px',
                    ".expand1": {
                      color: "#FFFF",
                    },
                  },
                  "&.Mui-expanded": {
                    minHeight: "40px",
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius:'6px',

                    ".expand1": {
                      color: "#FFFF",
                    },
                  },
                  "&.MuiAccordionSummary-content": {
                    marginTop: "12px !important",
                  },
                }}
              >
                <ViewStreamOutlined sx={{ transform: "rotate(90deg)" }} />
                <Typography sx={{ pl: 1 ,fontWeight:600 }}>Showers</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  padding: "0px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <div className="center">
                  <ul>
                    <MenuSigleItem link="/hardware">
                      <DevicesFoldOutlinedIcon sx={{ mr: 1 }} />
                      <span>Hardwares</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/finishes">
                      <FormatColorFillIcon sx={{ mr: 1 }} />
                      <span>Finishes</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/glass-types">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Glass Types</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/glass-addons">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Glass Addons</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/layouts">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Layouts</span>
                    </MenuSigleItem>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandMirrorAccordian}
              onChange={() => {
                setExpandMirrorAccordian(!expandMirrorAccordian);
              }}
              sx={{
                margin: "12px 0px !important",
                border: "none",
                background: "none",
                boxShadow: "none",
                ":before": {
                  backgroundColor: "white !important",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    className="expand2"
                    sx={{ color: "#5D6164" }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "#5D6164",
                  ":hover": {
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius:'6px',
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "&.Mui-expanded": {
                    minHeight: "40px",
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius:'6px',
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "&.MuiAccordionSummary-content": {
                    marginTop: "12px !important",
                  },
                }}
              >
                <ViewStreamOutlined sx={{ transform: "rotate(90deg)" }} />
                <Typography sx={{ pl: 1 ,fontWeight:600}}>Mirrors</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "10px 0px" }}>
                <div className="center">
                  <ul>
                    <MenuSigleItem link="/mirrors/hardwares">
                      <DevicesFoldOutlinedIcon sx={{ mr: 1 }} />
                      <span>Hardwares</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/mirrors/glass-addons">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Glass Addons</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/mirrors/edge-works">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Edge Works</span>
                    </MenuSigleItem>
                    <MenuSigleItem link="/mirrors/glass-types">
                      <WindowOutlinedIcon sx={{ mr: 1 }} />
                      <span>Glass Types</span>
                    </MenuSigleItem>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
          <hr style={{ border: "1px solid rgba(217, 217, 217, 0.34)" }} />
        </Box>
      </Box>

      {/* footer  */}
      <Box sx={{ width: 318 }}>
        <div className="center">
          <ul>
            <MenuSigleItem link="/settings">
              <SettingsOutlinedIcon sx={{ mr: 1 }} />
              <span>Settings</span>
            </MenuSigleItem>
          </ul>
        </div>
      </Box>

      {decodedToken.role === userRoles.CUSTOM_ADMIN ? (
        <SwitchLocationPopup
          anchorEl={anchorEl}
          data={haveAccessData}
          handleClosePopup={handleClosePopup}
          handleUserClick={handleCustomUserClick}
          isSwitching={isSwitching}
          handleBack={handleBackCustomAdminClick}
        />
      ) : (
        <SwitchLocationPopup
          anchorEl={anchorEl}
          handleClosePopup={handleClosePopup}
          handleUserClick={handleAdminNameClick}
          isSwitching={isSwitchingSuperAdmin}
          handleBack={handleBackToSuperAdmin}
          data={AdminData}
        />
      )}
    </Box>
  );
};

export default AdminSideBar;
