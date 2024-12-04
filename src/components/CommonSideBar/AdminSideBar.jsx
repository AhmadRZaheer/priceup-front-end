import React, { useEffect, useState } from "react";
import "./style.scss";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { logoutHandler } from "@/redux/userAuth";
import { useDispatch } from "react-redux";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
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
import InnerMenuItem from "./InnerMenuItem";
import { setChangeLocation } from "@/redux/refetch";

const AdminSideBar = () => {
  const dispatch = useDispatch();
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
  const [expandWineAccordian, setExpandWineAccordian] = useState(false);
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
    setAnchorEl(null);
    if (decodedToken.company_id !== admin?._id) {
      setActiveLocation(admin);
      switchLocationSuperAdmin({
        company_id: admin?._id,
        adminId: admin?.user_id,
      });
    }
  };
  const handleCustomUserClick = async (companyData) => {
    setAnchorEl(null);
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
    setAnchorEl(null);
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
    setAnchorEl(null);
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
        '/layouts/edit',
        "/glass-addons",
        "/glass-types",
        "/finishes",
        "/hardware",
      ].includes(location.pathname)
    ) {
      setExpandShowerAccordian(true);
    }
    if (
      [
        "/wine-cellar/glass-types",
        "/wine-cellar/glass-addons",
        "/wine-cellar/finishes",
        "/wine-cellar/hardwares",
        "/wine-cellar/layouts",
        '/wine-cellar/layouts/edit',
      ].includes(location.pathname)
    ) {
      setExpandWineAccordian(true);
    }
  }, []);
  useEffect(() => {
    if (switched) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
      localStorage.setItem("token", useToken);
      window.location.href = "/";
    }
    // if (switchedBack) {
    //   localStorage.setItem("token", useTokenBack.token);
    //   window.location.href = "/locations";
    // }
    if (switchedSuperAdmin) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
      if (decodedToken.role === userRoles.SUPER_ADMIN) {
        localStorage.setItem("userReference", decodedToken.id);
      }
      localStorage.setItem("token", useTokenSuperAdmin);
      window.location.href = "/";
    }
    if (switchedBack) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());
      localStorage.setItem("token", useTokenBack.token);
      window.location.href = "/locations";
    }
    if (switchedBackSuperAdmin) {
      localStorage.setItem('splashLoading', 'true')
      dispatch(setChangeLocation());

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
                    width: 264,
                    height: "56px",
                    color: "white",
                    padding: "4px 12px",
                    display: "flex",
                    borderRadius: "6px",
                    background: "#000000",
                    m: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    ":hover": {
                      background: "#000000",
                      backgroundColor: "#000000",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", gap: "12px" }}>
                    <DefaultImage
                      image={
                        activeLocation?.company?.image || activeLocation?.image
                      }
                      name={
                        activeLocation?.company?.name || activeLocation?.name
                      }
                    />
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        textTransform: "capitalize",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "21.86px",
                      }}
                    >
                      {activeLocation?.company?.name || activeLocation?.name}
                    </span>
                  </Box>

                  <ExpandMoreIcon
                    sx={{
                      color: "#FFFF",
                      transform:
                        anchorEl !== null ? "rotate(270deg)" : "rotate(0deg)",
                    }}
                  />
                </Button>
              </Tooltip>
              <hr style={{ border: "1px solid #D1D4DB" }} />
            </>
          )}

          {decodedToken?.role === userRoles.CUSTOM_ADMIN ? (
            <>
              <Button
                onClick={handleSeeLocationsClick}
                sx={{
                  mx: "auto",
                  width: 264,
                  height: "56px",
                  color: "white",
                  padding: "4px 12px",
                  display: "flex",
                  borderRadius: "6px",
                  background: "#000000",
                  m: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  ":hover": {
                    background: "#000000",
                    backgroundColor: "#000000",
                  },
                }}
              >
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <DefaultImage
                    image={
                      activeLocation?.image || activeLocation?.company?.image
                    }
                    name={activeLocation?.name || activeLocation?.company?.name}
                  />
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "21.86px",
                    }}
                  >
                    {CustomActiveUser}
                  </span>
                </Box>

                <ExpandMoreIcon
                  sx={{
                    color: "#FFFF",
                    transform:
                      anchorEl !== null ? "rotate(270deg)" : "rotate(0deg)",
                  }}
                />
              </Button>
              <hr style={{ border: "1px solid #D1D4DB" }} />
            </>
          ) : (
            ""
          )}
          <Box sx={{ my: 1, mx: "auto" }}>
            <div className="center">
              <ul>
                <MenuSigleItem link="/">
                  <HomeOutlinedIcon sx={{}} />
                  <span>Dashboard</span>
                </MenuSigleItem>
              </ul>
            </div>
            <hr style={{ border: "1px solid #D1D4DB" }} />
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
          <Typography
            className="subtitle"
            sx={{ color: "#777B7E", pl: 2, pt: 1 }}
          >
            {" "}
            Management{" "}
          </Typography>

          <div className="center">
            <ul>
              <MenuSigleItem link="/projects">
                <DescriptionOutlinedIcon sx={{}} />
                <span>Projects</span>
              </MenuSigleItem>
              <MenuSigleItem link="/estimates">
                <DescriptionOutlinedIcon sx={{}} />
                <span>Estimates</span>
              </MenuSigleItem>
              <MenuSigleItem link="/invoices">
                <DescriptionOutlinedIcon sx={{}} />
                <span>Invoices</span>
              </MenuSigleItem>
              <MenuSigleItem link="/customers" secondLink='/customers/edit'>
                <PeopleAltOutlinedIcon sx={{}} />
                <span>Customers</span>
              </MenuSigleItem>
              <MenuSigleItem link="/team">
                <PeopleAltOutlinedIcon sx={{}} />
                <span>Users</span>
              </MenuSigleItem>
            </ul>
          </div>
          <hr style={{ border: "1px solid #D1D4DB" }} />
          <Typography
            className="subtitle"
            sx={{ mt: 2, color: "#777B7E", pl: 2 }}
          >
            {" "}
            Categories{" "}
          </Typography>
          <Box sx={{ mx: 2 }}>
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
                  p: "0px 12px",
                  color: "#5D6164",

                  ":hover": {
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand1": {
                      color: "#FFFF",
                    },
                  },
                  "&.Mui-expanded": {
                    minHeight: "40px",
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand1": {
                      color: "#FFFF",
                    },
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0px !important", // Ensure no margin in content
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin in content when expanded
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin around the expand icon
                  },
                }}
              >
                <DevicesFoldOutlinedIcon sx={{ mr: '12px' }} />
                {/* <ViewStreamOutlined sx={{  ,transform: "rotate(90deg)" }} /> */}
                <Typography sx={{ fontWeight: 600 }}>Shower</Typography>
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
                    <InnerMenuItem link="/hardware">
                      <span>Hardware</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/finishes">
                      <span>Finishes</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/glass-types">
                      <span>Glass Types</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/glass-addons">
                      <span>Glass Addons</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/layouts" secondLink='/layouts/edit'>
                      <span>Layouts</span>
                    </InnerMenuItem>
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
                  p: "0px 12px",
                  ":hover": {
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "&.Mui-expanded": {
                    minHeight: "40px",
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0px !important", // Ensure no margin in content
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin in content when expanded
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin around the expand icon
                  },
                }}
              >
                <ViewStreamOutlined sx={{ mr: '12px', transform: "rotate(90deg)" }} />
                <Typography sx={{ fontWeight: 600 }}>Mirror</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "0px 0px" }}>
                <div className="center">
                  <ul>
                    <InnerMenuItem link="/mirrors/hardwares">
                      <span>Hardware</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/mirrors/glass-addons">
                      <span>Glass Addons</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/mirrors/edge-works">
                      <span>Edge Works</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/mirrors/glass-types">
                      <span>Glass Types</span>
                    </InnerMenuItem>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expandWineAccordian}
              onChange={() => {
                setExpandWineAccordian(!expandWineAccordian);
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
                  p: "0px 12px",
                  ":hover": {
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "&.Mui-expanded": {
                    minHeight: "40px",
                    background: "#8477DA",
                    color: "#FFFF",
                    borderRadius: "6px",
                    ".expand2": {
                      color: "#FFFF",
                    },
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0px !important", // Ensure no margin in content
                  },
                  "& .MuiAccordionSummary-content.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin in content when expanded
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    margin: "12px 0px !important", // Ensure no margin around the expand icon
                  },
                }}
              >
                <ViewStreamOutlined sx={{ mr: '12px', transform: "rotate(90deg)" }} />
                <Typography sx={{ fontWeight: 600 }}>Wine Cellar</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "0px 0px" }}>
                <div className="center">
                  <ul>
                    <InnerMenuItem link="/wine-cellar/hardwares">
                      <span>Hardware</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/wine-cellar/finishes">
                      <span>Finishes</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/wine-cellar/glass-types">
                      <span>Glass Types</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/wine-cellar/glass-addons">
                      <span>Glass Addons</span>
                    </InnerMenuItem>
                    <InnerMenuItem link="/wine-cellar/layouts" secondLink='/wine-cellar/layouts/edit'>
                      <span>Layouts</span>
                    </InnerMenuItem>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
          <hr style={{ border: "1px solid #D1D4DB" }} />
        </Box>
      </Box>

      {/* footer  */}
      <Box>
        <div className="center">
          <ul>
            <MenuSigleItem link="/settings">
              <SettingsOutlinedIcon sx={{}} />
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
