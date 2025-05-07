// import React, { useEffect, useState } from "react";
// import "./sidebar.scss";
// import Logo from "@/Assets/purplelogo.svg";
// import logout from "@/Assets/logout.svg";
// import { NavLink, useLocation } from "react-router-dom";
// import { logoutHandler } from "@/redux/userAuth";
// import { useDispatch } from "react-redux";
// import LagoutModal from "@/components/Modal/logOut";
// import EstimsteIcon from "@/Assets/bar.svg";
// import CustomerIcon from "@/Assets/Customer-icon.svg";
// import TeamIcon from "@/Assets/users.svg";
// import HardWairIcon from "@/Assets/box.svg";
// import DefaultIcon from "@/Assets/columns.svg";
// import SettingsIcon from "@/Assets/settings.svg";
// import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
// import {
//   Box,
//   IconButton,
//   Tooltip,
//   Drawer,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Button,
// } from "@mui/material";
// import { parseJwt } from "../ProtectedRoute/authVerify";
// import { AttachMoney, Description, PinDrop, UnfoldMore } from "@mui/icons-material";
// import {
//   useBackToCustomAdminLocations,
//   useBackToSuperAdmin,
//   useFetchCustomAdminHaveAccessTo,
//   useFetchDataAdmin,
//   useSwitchLocationSuperAdmin,
//   useSwitchLocationUser,
// } from "../../utilities/ApiHooks/superAdmin";
// import AppBar from "@mui/material/AppBar";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import DefaultImage from "../ui-components/defaultImage";
// import SwitchLocationPopup from "../ui-components/switchLocationPopup";
// import { userRoles } from "../../utilities/constants";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const drawerWidth = 320;

// const NewSidebar = () => {
//   const { data: AdminData, refetch } = useFetchDataAdmin();
//   const { mutate: haveAccessSet, data: haveAccessData } =
//     useFetchCustomAdminHaveAccessTo();
//   const {
//     mutate: switchLocationUser,
//     data: useToken,
//     isSuccess: switched,
//     isLoading: isSwitching,
//   } = useSwitchLocationUser();
//   const {
//     mutate: switchLocationSuperAdmin,
//     data: useTokenSuperAdmin,
//     isSuccess: switchedSuperAdmin,
//     isLoading: isSwitchingSuperAdmin,
//   } = useSwitchLocationSuperAdmin();
//   const {
//     mutate: backRefetch,
//     data: useTokenBack,
//     isSuccess: switchedBack,
//   } = useBackToCustomAdminLocations();
//   const {
//     mutate: backToSuperAdmin,
//     data: useTokenBackSuperAdmin,
//     isSuccess: switchedBackSuperAdmin,
//   } = useBackToSuperAdmin();
//   const [open, setOpen] = useState(false);
//   const superAdminToken = localStorage.getItem("superAdminToken");
//   const [expandShowerAccordian, setExpandShowerAccordian] = useState(false);
//   const [expandMirrorAccordian, setExpandMirrorAccordian] = useState(false);
//   const [CustomActiveUser, setCustomActiveUser] = useState(""); // State for search query
//   const [anchorEl, setAnchorEl] = useState(null);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const Logout = () => {
//     dispatch(logoutHandler());
//     window.location.href = "/login";
//   };
//   const token = localStorage.getItem("token");
//   const decodedToken = parseJwt(token);

//   const handleSeeLocationsClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopup = () => {
//     setAnchorEl(null);
//   };
//   const [activeLocation, setActiveLocation] =
//     useState(null); /** Added for branch PD-28 */

//   const handleAdminNameClick = (admin) => {
//     setActiveLocation(admin);
//     switchLocationSuperAdmin({
//       company_id: admin?.company?._id,
//       adminId: admin?.company?.user_id,
//     });
//   };
//   const handleCustomUserClick = async (companyId) => {
//     if (!companyId || !decodedToken) {
//       console.error("Invalid user data or decoded token.");
//       return;
//     }
//     if (companyId !== decodedToken.company_id) {
//       await switchLocationUser(companyId);
//       console.log("user changed");
//     }
//   };
//   const handleBackCustomAdminClick = async () => {
//     if (!decodedToken) {
//       console.error("Invalid user data or decoded token.");
//       return;
//     }
//     if (decodedToken.company_id) {
//       await backRefetch();
//       console.log("user backed");
//     }
//   };
//   const handleBackToSuperAdmin = async () => {
//     if (!decodedToken) {
//       console.error("Invalid user data or decoded token.");
//       return;
//     }
//     if (decodedToken.company_id) {
//       const superAdminReference = localStorage.getItem("userReference");
//       await backToSuperAdmin(superAdminReference);
//       console.log("user backed");
//     }
//   };
//   useEffect(() => {
//     refetch();
//     if (
//       [
//         "/mirrors/glass-types",
//         "/mirrors/edge-works",
//         "/mirrors/glass-addons",
//         "/mirrors/hardwares",
//       ].includes(location.pathname)
//     ) {
//       setExpandMirrorAccordian(true);
//     }
//     if (
//       [
//         "/layouts",
//         "/glass-addons",
//         "/glass-types",
//         "/finishes",
//         "/hardware",
//       ].includes(location.pathname)
//     ) {
//       setExpandShowerAccordian(true);
//     }
//   }, []);
//   useEffect(() => {
//     if (switched) {
//       localStorage.setItem("token", useToken);
//       window.location.href = "/";
//     }
//     if (switchedBack) {
//       localStorage.setItem("token", useTokenBack.token);
//       window.location.href = "/locations";
//     }
//     if (switchedSuperAdmin) {
//       if (decodedToken.role === userRoles.SUPER_ADMIN) {
//         localStorage.setItem("userReference", decodedToken.id);
//       }
//       localStorage.setItem("token", useTokenSuperAdmin);
//       window.location.href = "/";
//     }
//     if (switchedBack) {
//       localStorage.setItem("token", useTokenBack.token);
//       window.location.href = "/locations";
//     }
//     if (switchedBackSuperAdmin) {
//       localStorage.removeItem("userReference");
//       localStorage.setItem("token", useTokenBackSuperAdmin.token);
//       window.location.href = "/";
//     }
//   }, [switched, switchedBack, switchedBackSuperAdmin, switchedSuperAdmin]);
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   useEffect(() => {
//     haveAccessSet();
//   }, []);
//   /** Added for branch PD-28 */
//   useEffect(() => {
//     const fetchData = async () => {
//       if (AdminData && AdminData.length) {
//         const record = await AdminData.find(
//           (admin) => admin?.company?._id === decodedToken?.company_id
//         );
//         if (record) {
//           setActiveLocation(record);
//         }
//       }
//     };

//     fetchData();
//   }, [AdminData]);
//   /** Added for branch PD-28 */
//   useEffect(() => {
//     if (haveAccessData) {
//       const user = haveAccessData.find(
//         (item) => item?.company?._id === decodedToken?.company_id
//       );

//       setCustomActiveUser(user?.company?.name);
//     }
//   }, [haveAccessData, decodedToken]);

//   const userReference = localStorage.getItem("userReference");
  
//   const drawer = (
//     <Box
//       sx={{
//         width: "319px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "space-between",
//         height: "100vh",
//         justifyContent: "space-between",
//         background: "#100d24",
//       }}
//     >
//       {/* top section */}
//       <Box height={"80%"}>
//         {/* Top Options */}
//         <Box sx={{ width: "100%", height: "24%" }}>
//           <NavLink to="/">
//             <div className="top">
//               <span className="logo">
//                 <img src={Logo} alt="price up logo" />
//               </span>
//             </div>
//           </NavLink>
//           <hr className='adminLine' />
//           {userReference && (
//             <Tooltip title="Switch Location">
//               <IconButton
//                 onClick={handleSeeLocationsClick}
//                 sx={{
//                   // mx: 2,
//                   color: "#8477DA",
//                   padding: "4px 20px",
//                   display: "flex",
//                   width: "100%",
//                   borderRadius: 0,
//                   ":hover": {
//                     background: "none",
//                     backgroundColor: "transparent",
//                   },
//                 }}
//               >
//                 <Box>
//                   <DefaultImage
//                     image={activeLocation?.company?.image}
//                     name={activeLocation?.company?.name}
//                   />
//                 </Box>
//                 <span
//                   style={{
//                     flexGrow: 1,
//                     paddingLeft: "10px",
//                     paddingRight: "10px",
//                     whiteSpace: "nowrap",
//                     display: "block",
//                     textOverflow: "ellipsis",
//                     overflow: "hidden",
//                     textTransform: "capitalize",
//                   }}
//                 >
//                   {" "}
//                   {activeLocation?.company?.name}
//                 </span>
//                 <UnfoldMore sx={{ color: "#8477DA", mr: 1 }} />
//               </IconButton>
//             </Tooltip>
//           )}

//           {decodedToken?.role === userRoles.CUSTOM_ADMIN ? (
//             // <li
//             //   style={{ padding: 10, marginBottom: 0 }}
//             //   // className={` ${Boolean(anchorEl) ? "active" : ""}`}
//             //   onClick={handleSeeLocationsClick}
//             // >
//             <IconButton
//               onClick={handleSeeLocationsClick}
//               sx={{
//                 color: "#8477DA",
//                 padding: "4px 20px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 borderRadius: 0,
//                 width:'100%',
//                 ":hover": {
//                   background: "none",
//                   backgroundColor: "transparent",
//                 },
//               }}
//             >
//               <Box>
//                 <DefaultImage
//                   image={activeLocation?.company?.image}
//                   name={activeLocation?.company?.name}
//                 />
//               </Box>
//               <span
//                 style={{
//                   flexGrow: 1,
//                   paddingLeft: "10px",
//                   paddingRight: "10px",
//                   whiteSpace: "nowrap",
//                   display: "block",
//                   textOverflow: "ellipsis",
//                   overflow: "hidden",
//                   textTransform: "capitalize",
//                 }}
//               >
//                 {CustomActiveUser}
//               </span>
//               <UnfoldMore sx={{ color: "#8477DA", mr: 1 }} />
//             </IconButton>
//           ) : (
//             ""
//           )}
//           <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
//             <NavLink to="/" className="link">
//               <Box
//                 className={`button-item ${location.pathname === "/" ? "active-item" : ""
//                   }`}
//               >
//                 <img
//                   style={{ paddingRight: 10 }}
//                   src={EstimsteIcon}
//                   alt="image of customer"
//                 />

//                 <span>Dashboard</span>
//               </Box>
//             </NavLink>
//           </Box>
//         </Box>
//         {/* Container Options */}
//         <Box
//           sx={{
//             width: "86%",
//             mx: "auto",
//             mt: 3,
//             height: "70%",
//             overflow: "auto",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//           }}
//         >
//           <Typography className="subtitles"> Management </Typography>
//           <NavLink to="/projects" className="link">
//             <Box
//               className={`button-item ${location.pathname.includes("/projects") ? "active-item" : ""
//                 }`}
//             >
//               <Description />

//               <span>Projects</span>
//             </Box>
//           </NavLink>
//           <NavLink to="/estimates" className="link">
//             <Box
//               className={`button-item ${location.pathname.includes("/estimates") ? "active-item" : ""
//                 }`}
//             >
//               <Description />

//               <span>Old Estimates</span>
//             </Box>
//           </NavLink>
//           <NavLink to="/customers" className="link">
//             <Box
//               className={`button-item ${location.pathname === "/customers" ? "active-item" : ""
//                 }`}
//             >
//               <img src={CustomerIcon} alt="image of customer" />

//               <span>Customers</span>
//             </Box>
//           </NavLink>
//           <NavLink to="/team" className="link">
//             <Box
//               className={`button-item ${location.pathname === "/team" ? "active-item" : ""
//                 }`}
//             >
//               <img src={TeamIcon} alt="image of customer" />

//               <span>Users</span>
//             </Box>
//           </NavLink>
//           <Typography className="subtitles" sx={{ mt: 1 }}>
//             {" "}
//             Categories{" "}
//           </Typography>
//           <Box>
//             <Accordion
//               expanded={expandShowerAccordian}
//               onChange={() => {
//                 setExpandShowerAccordian(!expandShowerAccordian);
//               }}
//               sx={{
//                 margin: "12px 0px !important",
//                 border: "none",
//                 background: "none",
//                 "&.MuiAccordionSummary-expandIconWrapper": {
//                   color: "white !important",
//                 },
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
//                 aria-controls="panel1-content"
//                 id="panel1-header"
//                 sx={{
//                   background: " rgba(132, 119, 218, 0.3)",
//                   color: "white",
//                   "&.Mui-expanded": {
//                     minHeight: "40px",
//                   },
//                   "&.MuiAccordionSummary-content": {
//                     marginTop: "12px !important",
//                   },
//                 }}
//               >
//                 <img src={DefaultIcon} alt="showers icon" />
//                 <Typography sx={{ pl: 1 }}>Showers</Typography>
//               </AccordionSummary>
//               <AccordionDetails
//                 style={{
//                   padding: "0px",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                 }}
//               >
//                 <NavLink to="/hardware" className="link">
//                   <Box
//                     className={`button-item  ${location.pathname === "/hardware" ? "active-item" : ""
//                       }`}
//                     sx={{ mt: 1 }}
//                   >
//                     <img src={HardWairIcon} alt="image of customer" />

//                     <span>Hardwares</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/finishes" className="link">
//                   <Box
//                     className={`button-item ${location.pathname === "/finishes" ? "active-item" : ""
//                       }`}
//                   >
//                     <FormatColorFillIcon />

//                     <span>Finishes</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/glass-types" className="link">
//                   <Box
//                     className={`button-item ${location.pathname === "/glass-types" ? "active-item" : ""
//                       }`}
//                   >
//                     <img src={HardWairIcon} alt="image of customer" />

//                     <span>Glass Types</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/glass-addons" className="link">
//                   <Box
//                     className={`button-item ${location.pathname === "/glass-addons" ? "active-item" : ""
//                       }`}
//                   >
//                     <img src={HardWairIcon} alt="image of customer" />

//                     <span>Glass Addons</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/layouts" className="link">
//                   <Box
//                     className={`button-item ${location.pathname === "/layouts" ? "active-item" : ""
//                       }`}
//                   >
//                     <img src={DefaultIcon} alt="image of customer" />

//                     <span>Layouts</span>
//                   </Box>
//                 </NavLink>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion
//               expanded={expandMirrorAccordian}
//               onChange={() => {
//                 setExpandMirrorAccordian(!expandMirrorAccordian);
//               }}
//               sx={{
//                 margin: "12px 0px !important",
//                 border: "none",
//                 background: "none",
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
//                 aria-controls="panel1-content"
//                 id="panel1-header"
//                 sx={{
//                   background: " rgba(132, 119, 218, 0.3)",
//                   color: "white",
//                   "&.Mui-expanded": {
//                     minHeight: "40px",
//                   },
//                   "&.MuiAccordionSummary-content": {
//                     marginTop: "12px !important",
//                   },
//                 }}
//               >
//                 <img src={DefaultIcon} alt="showers icon" />
//                 <Typography sx={{ pl: 1 }}>Mirrors</Typography>
//               </AccordionSummary>
//               <AccordionDetails style={{ padding: "10px 0px" }}>
//                 <NavLink to="/mirrors/hardwares">
//                   <Box
//                     className={`button-item ${location.pathname === "/mirrors/hardwares" ? "active-item" : ""
//                       }`}
//                   >
//                     <img src={SettingsIcon} alt="image of customer" />

//                     <span>Hardwares</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/mirrors/glass-addons">
//                   <Box
//                     className={`button-item ${location.pathname === "/mirrors/glass-addons"
//                         ? "active-item"
//                         : ""
//                       }`}
//                   >
//                     <img src={SettingsIcon} alt="image of customer" />

//                     <span>Glass Addons</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/mirrors/edge-works">
//                   <Box
//                     className={`button-item ${location.pathname === "/mirrors/edge-works"
//                         ? "active-item"
//                         : ""
//                       }`}
//                   >
//                     <img
//                       // style={{ paddingRight: 10 }}
//                       src={SettingsIcon}
//                       alt="image of customer"
//                     />

//                     <span>Edge Works</span>
//                   </Box>
//                 </NavLink>
//                 <NavLink to="/mirrors/glass-types">
//                   <Box
//                     className={`button-item ${location.pathname === "/mirrors/glass-types"
//                         ? "active-item"
//                         : ""
//                       }`}
//                   >
//                     <img
//                       // style={{ paddingRight: 10 }}
//                       src={SettingsIcon}
//                       alt="image of customer"
//                     />

//                     <span>Glass Types</span>
//                   </Box>
//                 </NavLink>
//               </AccordionDetails>
//             </Accordion>
//           </Box>
//         </Box>
//       </Box>

//       {/* footer  */}
//       <Box sx={{ width: "100%" }}>
//         <div className="line"></div>
//         <NavLink
//           to="/settings"
//           className="link"
//           style={{
//             borderRadius: "6px",
//             margin: 0,
//             height: "fit-content",
//           }}
//         >
//           <Box
//             className={`button-item ${location.pathname === "/settings" ? "active-item" : ""
//               }`}
//             sx={{ m: 2 }}
//           >
//             <img
//               style={{ paddingRight: 10 }}
//               src={SettingsIcon}
//               alt="image of customer"
//             />

//             <span>Settings</span>
//           </Box>
//         </NavLink>
//         {/* <div className="line"></div>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             paddingX: 2,
//             p: 1,
//           }}
//         >
//           <Box sx={{ marginLeft: 1, mr: 1.2 }}>
//             <DefaultImage
//               image={decodedToken?.image}
//               name={decodedToken?.name}
//             />
//           </Box>
//           <Box sx={{ fontSize: 18, color: "white" }}>
//             {decodedToken?.name}
//             <Box
//               sx={{
//                 fontSize: 16,
//                 color: "white",
//                 whiteSpace: "nowrap",
//                 width: 160,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap", // Added this line to ensure text doesn't wrap
//               }}
//             >
//               {decodedToken?.email}
//             </Box>
//           </Box>
//           <Tooltip title="Logout" placement="top-start" arrow>
//             <Box
//               sx={{
//                 fontSize: 16,
//                 marginLeft: 2,
//                 width: 50,
//                 height: 30,
//                 textAlign: "center",
//               }}
//               onClick={() => setOpen(!open)}
//             >
//               <img src={logout} alt="image" />
//             </Box>
//           </Tooltip>
//         </Box> */}
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       <Box sx={{ display: "flex" }}>
//         <AppBar
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//             display: { sm: "none" },
//           }}
//         >
//           <Toolbar sx={{ backgroundColor: "#100d24" }}>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Box
//           component="nav"
//           sx={{
//             width: { sm: drawerWidth },
//             flexShrink: { sm: 0 },
//           }}
//           aria-label="mailbox "
//         >
//           {/* for mobile */}
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{
//               keepMounted: true,
//             }}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>

//           {/* for desktop */}
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
              
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//                 backgroundColor:'#100D24',
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//       </Box>

//       {decodedToken.role === userRoles.CUSTOM_ADMIN ? (
//         <SwitchLocationPopup
//           anchorEl={anchorEl}
//           data={haveAccessData}
//           handleClosePopup={handleClosePopup}
//           handleUserClick={handleCustomUserClick}
//           isSwitching={isSwitching}
//           handleBack={handleBackCustomAdminClick}
//         />
//       ) : (
//         <SwitchLocationPopup
//           anchorEl={anchorEl}
//           handleClosePopup={handleClosePopup}
//           handleUserClick={handleAdminNameClick}
//           isSwitching={isSwitchingSuperAdmin}
//           handleBack={handleBackToSuperAdmin}
//           data={AdminData}
//         />
//       )}

//       <LagoutModal open={open} close={() => setOpen(!open)} logout={Logout} />
//     </>
//   );
// };
// export default NewSidebar;
