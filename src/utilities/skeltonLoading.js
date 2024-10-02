import { Skeleton } from "@mui/material";

export const GenrateColumns = (columns) => {
  return columns?.map((item) => {
    return {
      field: item,
      headerName: item,
      headerClassName: "customHeaderClass-admin-team",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return <Skeleton width={"100%"} height={"32px"} />;
      },
    };
  });
};

export const GenrateRows = (rows) => {
  return rows?.map((item) => ({ _id: item }));
};