import { Box, Typography } from "@mui/material";
import DefaultImage from "./defaultImage";

function SingleUser({ item, active, handleClick }) {
  return (
    <>
      <Typography
        key={item?.id}
        sx={{
          width: "83.8%",
          ml: "10px",
          marginBottom: "5px",
          textTransform: "lowercase",
          marginLeft: "20px",
          display: "flex",
          border: "1px solid #D9D9D9",
          ":hover": {
            bgcolor: "rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          },
          py: 0.4,
          px: 1,
          borderRadius: "14px",
        }}
        onClick={handleClick}
      >
        <div style={{ width: "20%" }}>
          <DefaultImage image={item?.image} name={item?.name} />
        </div>
        <div
          style={{
            paddingLeft: "10px",
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <a
            style={{
              cursor: "pointer",
              display: "inline-block",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item?.name}
          </a>
          <p style={{ fontSize: "10px", marginTop: -5 }}>{item?.address}</p>
        </div>
        {active ? (
          <Box
            sx={{
              width: "10%",
              display: "flex",
              justifyContent: "end",
              mt: 1.7,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "100%",
                background: "#4de369",
              }}
            ></div>
          </Box>
        ) : (
          ""
        )}
      </Typography>
    </>
  );
}
export default SingleUser;
