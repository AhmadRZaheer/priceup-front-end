import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  ArrowRight,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { backendURL } from "../../utilities/common";
import { useSelector } from "react-redux";
import { selectedItem } from "../../redux/estimateCalculations";
import EstImage from "../../Assets/estimates/custom copy.jpg";

export const SelectedImage = ({ imageSides }) => {
  // if (imageSides === 2) {
  //   return (
  //     <>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           width: "100%",
  //           height: "100%",
  //           backgroundColor: "red",
  //         }}
  //       >
  //         <Box sx={{ textAlign: "center", width: 2 }}>
  //           <ArrowDropUp
  //             sx={{
  //               color: "white",
  //               margin: 0,
  //               padding: 0,
  //               marginLeft: -1.28,
  //               marginBottom: -1.7,
  //             }}
  //           />
  //           <Box sx={{ backgroundColor: "white", width: 1, height: 260 }}></Box>
  //           <ArrowDropDown
  //             sx={{
  //               color: "white",
  //               margin: 0,
  //               padding: 0,
  //               marginLeft: -1.28,
  //               marginTop: -2.4,
  //             }}
  //           />
  //         </Box>

  //         <Typography
  //           sx={{
  //             backgroundColor: "#100D24",
  //             overflow: "hidden",
  //             color: "white",
  //             mt: 17,
  //             ml: -0.7,
  //             height: 24,
  //           }}
  //         >
  //           a
  //         </Typography>
  //         <Box sx={{ pl: 1, background: "green" }}>
  //           <img
  //             width="150px"
  //             height="300px"
  //             // src={door}
  //             src={`${backendURL}/${selectedData?.image}`}
  //             alt="Selected"
  //           />

  //           <Box
  //             sx={{
  //               height: 2,
  //               display: "flex",
  //               textAlign: "center",
  //               ml: -1,
  //               mt: 1,
  //             }}
  //           >
  //             <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //             <Box
  //               sx={{
  //                 backgroundColor: "white",
  //                 width: 140,
  //                 height: 2,
  //               }}
  //             ></Box>
  //             <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //           </Box>
  //           <Typography
  //             sx={{
  //               backgroundColor: "#100D24",
  //               overflow: "hidden",
  //               color: "white",
  //               textAlign: "center",
  //               width: 24,
  //               ml: 8.2,
  //               mt: -1,
  //               zIndex: 3,
  //             }}
  //           >
  //             b
  //           </Typography>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // }

  // four sides

  // return (
  //   <>
  //     <Box
  //       sx={{
  //         display: "flex",
  //         width: "100%",
  //         height: "100%",
  //         backgroundColor: "red",
  //       }}
  //     >
  //       <Box sx={{ textAlign: "center", width: 2 }}>
  //         <ArrowDropUp
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginBottom: -1.7,
  //           }}
  //         />
  //         <Box sx={{ backgroundColor: "white", width: 1, height: 260 }}></Box>
  //         <ArrowDropDown
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginTop: -2.4,
  //           }}
  //         />
  //       </Box>

  //       <Typography
  //         sx={{
  //           backgroundColor: "#100D24",
  //           overflow: "hidden",
  //           color: "white",
  //           mt: 17,
  //           ml: -0.7,
  //           height: 24,
  //         }}
  //       >
  //         a
  //       </Typography>
  //       <Box sx={{ pl: 1, background: "green" }}>
  //         <img
  //           width="150px"
  //           height="300px"
  //           src={EstImage}
  //           // src="../../"
  //           alt="Selected"
  //         />
  //         <Box sx={{display: "flex"}}>
  //           <Box>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 65,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 24,
  //                 ml: 3.3,
  //                 mt: -1.4,
  //                 zIndex: 3,
  //               }}
  //             >
  //               b
  //             </Typography>
  //           </Box>

  //           <Box sx={{mt: -9, ml:-1}}>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 65,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 24,
  //                 ml: 3.3,
  //                 mt: -1.4,
  //                 zIndex: 3,
  //               }}
  //             >
  //               c
  //             </Typography>
  //           </Box>
  //         </Box>

  //       </Box>

  //       <Box sx={{ textAlign: "center", width: 2, mt:-1 }}>
  //         <ArrowDropUp
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.3,
  //             marginBottom: -1.7,
  //           }}
  //         />
  //         <Box sx={{ backgroundColor: "white", width: 1, height: 205 }}></Box>
  //         <ArrowDropDown
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.3,
  //             marginTop: -3,
  //           }}
  //         />
  //       </Box>

  //       <Typography
  //         sx={{
  //           backgroundColor: "#100D24",
  //           overflow: "hidden",
  //           color: "white",
  //           mt: 13,
  //           ml: -0.7,
  //           height: 24,
  //         }}
  //       >
  //         d
  //       </Typography>
  //     </Box>
  //   </>
  // );

  // four sides

  // return (
  //   <>
  //     <Box
  //       sx={{
  //         display: "flex",
  //         width: "100%",
  //         height: "100%",
  //         backgroundColor: "red",
  //       }}
  //     >
  //       <Box sx={{ textAlign: "center", width: 2 }}>
  //         <ArrowDropUp
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginBottom: -1.7,
  //           }}
  //         />
  //         <Box sx={{ backgroundColor: "white", width: 1, height: 260 }}></Box>
  //         <ArrowDropDown
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginTop: -2.4,
  //           }}
  //         />
  //       </Box>

  //       <Typography
  //         sx={{
  //           backgroundColor: "#100D24",
  //           overflow: "hidden",
  //           color: "white",
  //           mt: 17,
  //           ml: -0.7,
  //           height: 24,
  //         }}
  //       >
  //         a
  //       </Typography>
  //       <Box sx={{ pl: 1, background: "green" }}>
  //         <img
  //           width="150px"
  //           height="300px"
  //           src={EstImage}
  //           // src="../../"
  //           alt="Selected"
  //         />
  //         <Box sx={{display: "flex"}}>
  //           <Box>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 100,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 24,
  //                 ml: 5.5,
  //                 mt: -1.4,
  //                 zIndex: 3,
  //               }}
  //             >
  //               b
  //             </Typography>
  //           </Box>

  //           <Box sx={{mt: -9, ml:-1}}>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 25,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 20,
  //                 ml: 1.1,
  //                 mt: -1.4,
  //                 zIndex: 3,
  //               }}
  //             >
  //               c
  //             </Typography>
  //           </Box>
  //         </Box>

  //       </Box>

  //       <Box sx={{ textAlign: "center", width: 2, mt:-1 }}>
  //         <ArrowDropUp
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.3,
  //             marginBottom: -1.7,
  //           }}
  //         />
  //         <Box sx={{ backgroundColor: "white", width: 1, height: 205 }}></Box>
  //         <ArrowDropDown
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.3,
  //             marginTop: -3,
  //           }}
  //         />
  //       </Box>

  //       <Typography
  //         sx={{
  //           backgroundColor: "#100D24",
  //           overflow: "hidden",
  //           color: "white",
  //           mt: 13,
  //           ml: -0.7,
  //           height: 24,
  //         }}
  //       >
  //         d
  //       </Typography>
  //     </Box>
  //   </>
  // );

  // three sides

  // return (
  //   <>
  //     <Box
  //       sx={{
  //         display: "flex",
  //         width: "100%",
  //         height: "100%",
  //         backgroundColor: "red",
  //       }}
  //     >
  //       <Box sx={{ textAlign: "center", width: 2 }}>
  //         <ArrowDropUp
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginBottom: -1.7,
  //           }}
  //         />
  //         <Box sx={{ backgroundColor: "white", width: 1, height: 260 }}></Box>
  //         <ArrowDropDown
  //           sx={{
  //             color: "white",
  //             margin: 0,
  //             padding: 0,
  //             marginLeft: -1.28,
  //             marginTop: -2.4,
  //           }}
  //         />
  //       </Box>

  //       <Typography
  //         sx={{
  //           backgroundColor: "#100D24",
  //           overflow: "hidden",
  //           color: "white",
  //           mt: 17,
  //           ml: -0.7,
  //           height: 24,
  //         }}
  //       >
  //         a
  //       </Typography>
  //       <Box sx={{ pl: 1, background: "green" }}>
  //         <Box>
  //         <img
  //           width="150px"
  //           height="300px"
  //           src={EstImage}
  //           // src={`${backendURL}/${selectedData?.image}`}
  //           alt="Selected"
  //         />
  //         </Box>

  //         <Box sx={{display: "flex"}}>
  //           <Box>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //                 zIndex: -1
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 68,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 24,
  //                 ml: 4,
  //                 mt: -1.6,
  //                 zIndex: 1,
  //               }}
  //             >
  //               b
  //             </Typography>
  //           </Box>

  //           <Box>
  //             <Box
  //               sx={{
  //                 height: 2,
  //                 display: "flex",
  //                 textAlign: "center",
  //                 ml: -1,
  //                 mt: 1,
  //                 zIndex: -1
  //               }}
  //             >
  //               <ArrowLeft sx={{ color: "white", mr: -1.2, mt: -1.4 }} />
  //               <Box
  //                 sx={{
  //                   backgroundColor: "white",
  //                   width: 50,
  //                   height: 2,
  //                 }}
  //               ></Box>
  //               <ArrowRight sx={{ color: "white", ml: -1.3, mt: -1.4 }} />
  //             </Box>
  //             <Typography
  //               sx={{
  //                 backgroundColor: "#100D24",
  //                 overflow: "hidden",
  //                 color: "white",
  //                 textAlign: "center",
  //                 width: 22,
  //                 ml: 2.6,
  //                 mt: -1.6,
  //                 zIndex: 1,
  //               }}
  //             >
  //               c
  //             </Typography>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </>
  // );

  return (
    <>
      <Box>
        <img src={EstImage} alt="image of the layout" />
      </Box>
    </>
  );
};
