import { Box, Typography } from "@mui/material";
import DefaultImage from "./defaultImage";
import "./singleLocation.scss";

const SingleLocation = ({ data, handleToggleChange }) => {
  return (
    <>
      <Box
        sx={{
          width: "448px",
          borderRadius: "8px",
          border: "1px solid rgba(208, 213, 221, 1)",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          padding: "16px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DefaultImage
              image={data.company?.image}
              name={data.company?.name}
              type={6}
            />
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
              {data.company?.name}
            </Typography>
          </Box>
          <Typography>Active</Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid rgba(208, 213, 221, 1)",
            borderTop: " 1px solid rgba(208, 213, 221, 1)",
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            my: 1
          }}
        >
          <Box>
            <Typography className="section-name-text">Users</Typography>
            <Box>
                {/* <DefaultImage image={} name={} type={7} /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleLocation;
