import { Box, Grid, Tooltip, Typography } from "@mui/material";
import DefaultImage from "@/components/ui-components/defaultImage";
import SelectMenu_Status from "@/components/ui-components/selectMenu-status";
import EstimateActionsDropdown from "@/components/EstimateActionsDropdown";
import userImg from "@/Assets/username1.svg";
import wheel from "@/Assets/wheel.svg";
import "@/components/table/table.scss";
import ActionsDropdown from "@/components/common/ActionsDropdown";
import StatusChip from "@/components/common/StatusChip";

export const EstimatesColumns = (
  handleDeleteEstimate,
  handleIconButtonClick,
  handlePDFPreviewClick
) => {
  return [
    {
      field: "Creator",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 2.1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.creatorData ? (
              <Box
                className="project-cellWrap"
                // sx={{ pl: 1.2, pr: 2, py: 0.3, }}
              >
                <div className="customerImg">
                  <DefaultImage
                    image={params?.row?.creatorData?.image}
                    name={params?.row?.creatorData?.name}
                    type={5}
                  />
                </div>
                <Tooltip
                  title={
                    <Grid>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.creatorData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.creatorData?.email}
                      </Typography>
                    </Grid>
                  }
                  placement="top"
                >
                  <div className="new-customerNameTable">
                    <Box
                      className="new-userNameTable"
                      sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                    >
                      <Typography
                        className="new-userNameTable"
                        sx={{
                          color: "#000000",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.creatorData?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          p: 0,
                          mt: -0.4,
                          color: "#5D6164",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.creatorData?.email}
                      </Typography>
                    </Box>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ---
              </Box>
            )}

            {/* <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "100%",
                  overflow: "hidden",
                }}
              >
                <DefaultImage
                  image={params?.row?.creatorData?.image}
                  name={params?.row?.creatorData?.name}
                />
              </Box>
              <Box>
                <Typography>{params?.row?.creatorData?.name}</Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    p: 0,
                    mt: -0.4,
                    color: "#667085",
                  }}
                >
                  {params?.row?.creatorData?.email}
                </Typography>
              </Box>
            </Box> */}
          </>
        );
      },
    },
    {
      field: "Customer",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.customerData ? (
              <Box
                className="project-cellWrap"
                sx={
                  {
                    // py: params?.row?.customerData?.email ? 0.3 : 0.6,
                  }
                }
              >
                <div className="customerImg">
                  <DefaultImage
                    image={params?.row?.customerData?.image}
                    name={params?.row?.customerData?.name}
                    type={5}
                  />
                </div>
                <Tooltip
                  title={
                    <Grid>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.customerData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.customerData?.email}
                      </Typography>
                    </Grid>
                  }
                  placement="top"
                >
                  <div className="new-customerNameTable">
                    <Box
                      className="new-userNameTable"
                      sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                    >
                      <Typography
                        className="new-userNameTable"
                        sx={{
                          color: "#000000",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.customerData?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          p: 0,
                          mt: -0.4,
                          color: "#5D6164",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.customerData?.email}
                      </Typography>
                    </Box>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ---
              </Box>
            )}

            {/* <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.name}
            </Typography> */}
          </>
        );
      },
    },
    // {
    //   field: "Customer Email",
    //   headerClassName: "customHeaderClass",
    //   flex: 1.5,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Typography sx={{ py: 1, color: "#667085" }}>
    //           {params?.row?.customerData?.email}
    //         </Typography>
    //       </>
    //     );
    //   },
    // },

    {
      field: "Estimate Category",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 1.1,
      renderCell: (params) => {
        return (
          <>
            <Typography
              sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
            >
              {params?.row?.category}
            </Typography>
          </>
        );
      },
    },

    {
      field: "Layout",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip
              placement="top-start"
              title={params?.row?.settings?.name ?? "Custom"}
            >
              <Typography
                sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
              >
                {params?.row?.settings?.name ?? "Custom"}
              </Typography>
            </Tooltip>
          </>
        );
      },
    },

    {
      field: "Date quoted",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
              {new Date(params?.row?.updatedAt).toDateString()}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Estimated total",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
              ${params?.row?.cost?.toFixed(2) || 0}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Status",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <SelectMenu_Status
              status={params?.row?.status}
              quoteId={params?.row?._id}
            />
          </>
        );
      },
    },
    {
      field: "Action",
      headerClassName: "customHeaderClass",
      sortable: false,
      flex: 0.9,
      renderCell: (params) => {
        return (
          <EstimateActionsDropdown
            params={params}
            handleDeleteEstimate={handleDeleteEstimate}
            handleIconButtonClick={handleIconButtonClick}
            handlePDFPreviewClick={handlePDFPreviewClick}
          />
        );
      },
    },
  ];
};

// export const ProjectsColumns = (dropdownActions) => {
//   return [
//     {
//       field: "Project Name",
//       headerClassName: "customHeaderClass",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography sx={{ py: 1, color: "#667085" }}>
//               {params?.row?.name}
//             </Typography>
//           </>
//         );
//       },
//     },
//     {
//       field: "Creator",
//       headerClassName: "customHeaderClass",
//       flex: 1.5,
//       renderCell: (params) => {
//         return (
//           <>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: "100%",
//                   overflow: "hidden",
//                 }}
//               >
//                 <DefaultImage
//                   image={params?.row?.creatorData?.image}
//                   name={params?.row?.creatorData?.name}
//                 />
//               </Box>
//               <Box>
//                 <Typography>{params?.row?.creatorData?.name}</Typography>
//                 <Typography
//                   sx={{
//                     fontSize: 13,
//                     p: 0,
//                     mt: -0.4,
//                     color: "#667085",
//                   }}
//                 >
//                   {params?.row?.creatorData?.email}
//                 </Typography>
//               </Box>
//             </Box>
//           </>
//         );
//       },
//     },
//     {
//       field: "Customer Name",
//       headerClassName: "customHeaderClass",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography sx={{ py: 1, color: "#667085" }}>
//               {params?.row?.customerData?.name}
//             </Typography>
//           </>
//         );
//       },
//     },
//     {
//       field: "Customer Email",
//       headerClassName: "customHeaderClass",
//       flex: 1.5,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography sx={{ py: 1, color: "#667085" }}>
//               {params?.row?.customerData?.email}
//             </Typography>
//           </>
//         );
//       },
//     },

//     {
//       field: "Location",
//       headerClassName: "customHeaderClass",
//       flex: 1.5,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography
//               sx={{ py: 1, color: "#667085", textTransform: "uppercase" }}
//             >
//               {params?.row?.addressData?.name}
//             </Typography>
//           </>
//         );
//       },
//     },

//     {
//       field: "Date Created",
//       headerClassName: "customHeaderClass",
//       flex: 1,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography sx={{ width: 190, py: 1, color: "#667085" }}>
//               {new Date(params?.row?.createdAt).toDateString()}
//             </Typography>
//           </>
//         );
//       },
//     },
//     {
//       field: "Amount Quoted",
//       headerClassName: "customHeaderClass",
//       flex: 0.8,
//       renderCell: (params) => {
//         return (
//           <>
//             <Typography sx={{ width: 200, py: 1, color: "#667085" }}>
//               ${params?.row?.totalAmountQuoted?.toFixed(2) || 0}
//             </Typography>
//           </>
//         );
//       },
//     },
//     {
//       field: "Status",
//       headerClassName: "customHeaderClass",
//       flex: 0.8,
//       renderCell: (params) => {
//         return (
//           <StatusChip variant={params?.row?.status} />
//         );
//       },
//     },
//     {
//       field: "Action",
//       headerClassName: "customHeaderClass",
//       flex: 1,
//       renderCell: (params) => {
//         return <ActionsDropdown item={params?.row} actions={dropdownActions} />;
//       },
//     },
//   ];
// };

export const ProjectsColumns = (dropdownActions) => {
  return [
    {
      field: "Project Name",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Typography className="projectRowTxt" sx={{ py: 1 }}>
              {params?.row?.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Creator",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 2.1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.creatorData ? (
              <Box
                className="project-cellWrap"
                // sx={{ pl: 1.2, pr: 2, py: 0.3, }}
              >
                <div className="customerImg">
                  <DefaultImage
                    image={params?.row?.creatorData?.image}
                    name={params?.row?.creatorData?.name}
                    type={5}
                  />
                </div>
                <Tooltip
                  title={
                    <Grid>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.creatorData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.creatorData?.email}
                      </Typography>
                    </Grid>
                  }
                  placement="top"
                >
                  <div className="new-customerNameTable">
                    <Box
                      className="new-userNameTable"
                      sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                    >
                      <Typography
                        className="new-userNameTable"
                        sx={{
                          color: "#000000",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                          lineHeight: "19.12px",
                        }}
                      >
                        {params?.row?.creatorData?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: "16.39px",
                          p: 0,
                          mt: -0.4,
                          color: "#5D6164",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.creatorData?.email}
                      </Typography>
                    </Box>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ---
              </Box>
            )}

            {/* <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "100%",
                  overflow: "hidden",
                }}
              >
                <DefaultImage
                  image={params?.row?.creatorData?.image}
                  name={params?.row?.creatorData?.name}
                />
              </Box>
              <Box>
                <Typography>{params?.row?.creatorData?.name}</Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    p: 0,
                    mt: -0.4,
                    color: "#667085",
                  }}
                >
                  {params?.row?.creatorData?.email}
                </Typography>
              </Box>
            </Box> */}
          </>
        );
      },
    },
    {
      field: "Customer",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 1.9,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.customerData ? (
              <Box
                className="project-cellWrap"
                sx={
                  {
                    // py: params?.row?.customerData?.email ? 0.3 : 0.6,
                  }
                }
              >
                <div className="customerImg">
                  <DefaultImage
                    image={params?.row?.customerData?.image}
                    name={params?.row?.customerData?.name}
                    type={5}
                  />
                </div>
                <Tooltip
                  title={
                    <Grid>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.customerData?.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                        {params?.row?.customerData?.email}
                      </Typography>
                    </Grid>
                  }
                  placement="top"
                >
                  <div className="new-customerNameTable">
                    <Box
                      className="new-userNameTable"
                      sx={{ maxWidth: { xl: "100%", xs: "95%" } }}
                    >
                      <Typography
                        className="new-userNameTable"
                        sx={{
                          color: "#000000",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                          lineHeight: "19.12px",
                        }}
                      >
                        {params?.row?.customerData?.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: "16.39px",
                          p: 0,
                          mt: -0.4,
                          color: "#5D6164",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: { lg: "100%", xs: "93px" },
                        }}
                      >
                        {params?.row?.customerData?.email}
                      </Typography>
                    </Box>
                  </div>
                </Tooltip>
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ---
              </Box>
            )}

            {/* <Typography sx={{ py: 1, color: "#667085" }}>
              {params?.row?.customerData?.name}
            </Typography> */}
          </>
        );
      },
    },
    // {
    //   field: "Customer Email",
    //   headerClassName: "customHeaderClass",
    //   flex: 1.5,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Typography sx={{ py: 1, color: "#667085" }}>
    //           {params?.row?.customerData?.email}
    //         </Typography>
    //       </>
    //     );
    //   },
    // },

    {
      field: "Location",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 0.9,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title={params?.row?.addressData?.name} placement="top">
              <Typography className="projectRowTxt" sx={{ py: 1 }}>
                {params?.row?.addressData?.name}
              </Typography>
            </Tooltip>
          </>
        );
      },
    },

    {
      field: "Created Date",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 0.9,
      renderCell: (params) => {
        return (
          <>
            <Typography className="projectRowTxt" sx={{ width: 190, py: 1 }}>
              {new Date(params?.row?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Amount Quoted",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <Typography className="projectRowTxt" sx={{ width: 200, py: 1 }}>
              ${params?.row?.totalAmountQuoted?.toFixed(2) || 0}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Status",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return <StatusChip variant={params?.row?.status} />;
      },
    },
    {
      field: "Action",
      headerClassName: "ProjectsColumnsHeaderClass",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => {
        return <ActionsDropdown item={params?.row} actions={dropdownActions} />;
      },
    },
  ];
};

export const teamColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 1.2,
    renderCell: (params) => {
      return (
        <div className="user-cellWrap">
          <div className="customerImg">
            <DefaultImage
              image={params.row.image}
              name={params.row.name}
              type={5}
            />
          </div>
          <div className="new-customerNameTable">
            {params.row.name}
            <div className="new-userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 1.5,
    renderCell: (params) => {
      return (
        <>
          <Typography className="new-table-text">{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Date added",
    headerName: "Date added",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography className="new-table-text">
            {new Date(params.row.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Last quote",
    headerName: "Last quote",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography className="new-table-text">
            {params.row.lastQuoted
              ? new Date(params.row.lastQuoted).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Total quoted",
    headerName: "Total quoted",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography className="new-table-text">
            $ {params.row.totalQuoted?.toFixed(2) || 0}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Status",
    headerName: "Status",
    headerClassName: "customHeaderClass-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography
            className={params.row.status ? "status-active" : "status-inActive"}
          >
            {params.row.status ? "Active" : "Inactive"}
          </Typography>
        </>
      );
    },
  },
];
export const AdminColumns = [
  {
    field: "Team Members",
    headerName: "User Name",
    headerClassName: "customHeaderClass-admin-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <div className="user-cellWrap">
          <div className="customerImg">
            <DefaultImage
              image={params.row.image}
              name={params.row.name}
              type={5}
            />
          </div>
          <div className="new-customerNameTable">
            {params.row.name}
            <div className="new-userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass-admin-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return <div className="new-table-text">{params.row.email}</div>;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date Added",
    headerClassName: "customHeaderClass-admin-team",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <div className="new-table-text">
          {/* {new Date(params.row.createdAt).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })} */}
          {new Date(params.row.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </div>
      );
    },
  },
];

export const AdminColumns2 = [
  {
    field: "Team Members",
    headerName: "Name",
    width: 230,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <DefaultImage image={params.row.image} name={params.row.name} />
          </div>
          <div className="customerNameTable" style={{ marginLeft: "10px" }}>
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return <div style={{ color: "#667085" }}>{params.row.email}</div>;
    },
  },
  {
    field: "dateAdded",
    headerName: "Date added",
    width: 220,
    sortable: false,
    renderCell: (params) => {
      return (
        <div style={{ color: "#667085" }}>
          {new Date(params.row.updatedAt).toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      );
    },
  },
];

export const CustomerColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.2,
    renderCell: (params) => {
      return (
        <>
          <div className="cellWrapper">
            <div className="customerImg">
              <DefaultImage image={params.row.image} name={params.row.name} />
            </div>
            <div className="customerNameTable">
              {params.row.name}
              <div className="userNameTable">{params.row.username}</div>
            </div>
          </div>
        </>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.4,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Phone",
    headerName: "Phone number",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>
            {params.row.phone === "" ? "---" : params.row.phone}
          </Typography>
        </>
      );
    },
  },
  {
    field: "Address",
    headerName: "Address",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.address}</Typography>
        </>
      );
    },
  },
  {
    field: "lastQuotedOn",
    headerName: "Last quoted on",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.lastQuotedOn}</Typography>
        </>
      );
    },
  },
  ,
];

export const Super_SuperColumns = [
  {
    field: "name",
    headerName: "Name",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.2,
    renderCell: (params) => {
      return (
        <>
          <div className="Super_cellWrapper">
            <div className="customerImg">
              <DefaultImage image={params.row.image} name={params.row.name} />
            </div>
            <div className="customerNameTable">
              {params.row.name}
              <div className="userNameTable">{params.row.username}</div>
            </div>
          </div>
        </>
      );
    },
  },
  {
    field: "email",
    headerName: "Email address",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 1.4,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>{params.row.email}</Typography>
        </>
      );
    },
  },
  {
    field: "Date Added",
    headerName: "Date Added",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 2,
    renderCell: (params) => {
      return (
        <>
          <Typography color={"#667085"}>
            {new Date(params.row.createdAt).toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </>
      );
    },
  },
];
export const CustomerQuoteColumns = [
  {
    headerName: "Reference",
    width: 300,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Typography>{params.row.label}</Typography>
        </>
      );
    },
  },
  {
    field: "name",
    headerName: "ID",
    sortable: false,
    width: 200,
  },
];
export const userColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 40,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Customer Name",
    sortable: false,
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="customerImg">
            <img className="cellImg" src={params.row.img} alt="" />
          </div>
          <div className="customerNameTable">
            {params.row.name}
            <div className="userNameTable">{params.row.username}</div>
          </div>
        </div>
      );
    },
  },
  { field: "Email", headerName: "Email", width: 330, sortable: false },
  {
    field: "Address",
    headerName: "Address",
    width: 120,
    sortable: false,
  },
  {
    field: "LastQuote",
    headerName: "Last Quoted On",
    width: 180,
    sortable: false,
  },
];

export const userRows = [
  {
    id: 1,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 2,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 3,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 4,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 5,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 6,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 7,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
  {
    id: 8,
    name: "Olivia Rhye",
    img: userImg,
    username: "@olivia",
    Email: "olivia@untitleui.com",
    Address: "-",
    LastQuote: "Jan 4,2022",
  },
];

export const userColumnsHardware = [
  {
    field: "name",
    headerName: "Finish Type",
    headerClassName: "customHeaderClass",
    sortable: false,
    flex: 6,

    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div
            style={{ fontSize: "14px", fontWeight: 700, paddingLeft: "16px" }}
          >
            {params.row.name}
          </div>
        </div>
      );
    },
  },
];

export const userRowsHardware = [
  {
    _id: 1,
    hardwareLabel: "maya",
    image: userImg,
    Thickness: "",
    PartNumber: "",
    Cost: "",
    Price: "",
    Status: "",
  },
];
export const columnsHardwareHandle = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWrapper">
          <div className="hardwareImg">
            <img className="cellImg" src={params.row.img} alt="" />
          </div>
          <div className="hardwareNameTable">{params.row.name}</div>
        </div>
      );
    },
  },
  // { field: "PartNumber", headerName: "Part number", width: 330 },
  {
    field: "Cost",
    headerName: "Cost",
    sortable: false,
    width: 120,
  },
  {
    field: "Price",
    headerName: "Price",
    sortable: false,
    width: 180,
  },
  {
    field: "Status",
    headerName: "Status",
    sortable: false,
    width: 80,
  },
];

export const rowsHardwareHandle = [
  {
    id: 1,
    name: "8 x 8 RM Pull ",
    img: wheel,

    PartNumber: "",
    Cost: "",
    Price: "",
    Status: "",
    item: [{}],
  },
];
