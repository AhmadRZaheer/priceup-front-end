// import * as React from "react";
// import Chip from "@mui/material/Chip";
// import { Box } from "@mui/material";
// import { useFetchDataAdmin } from "../../utilities/ApiHooks/superAdmin";
// import { useEffect } from "react";

// export default function ChipsArray() {
//   const { data: AdminData, refetch: teamMemberRefetch } = useFetchDataAdmin();
//   useEffect(() => {
//     teamMemberRefetch();
//   }, []);
//   const handleDelete = (chipToDelete) => () => {
//     AdminData.filter((chip) => chip._id !== chipToDelete._id);
//   };
//   const filteredAdminData = AdminData.filter((data) => data.status === true);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap: "wrap",
//         alignItems: "baseline",
//         gap: "4px",
//       }}
//       component="ul"
//     >
//       {filteredAdminData.map((data) => {
//         return (
//           <Box sx={{ padding: "10px", borderRadius: "7px" }} key={data._id}>
//             <Chip
//               label={data.name}
//               onDelete={data.status ? handleDelete(data) : undefined}
//             />
//           </Box>
//         );
//       })}
//     </Box>
//   );
// }
