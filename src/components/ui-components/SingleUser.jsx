import { Box, Tooltip, Typography } from "@mui/material";
import DefaultImage from "./defaultImage";

function SingleUser({ item, active, handleClick, disabled = false }) {
  return (
    <Tooltip
      title={disabled ? "This Location is not Active" : ""}
      placement="top"
      arrow
    >
      <Typography
        key={item?.id}
        sx={{
          width: "85.8%",
          height:'44px',
          ml: "10px",
          marginBottom: "5px",
          textTransform: "lowercase",
          marginLeft: "20px",
          display: "flex",
          p:'6px 12px',
          // border: "1px solid #D9D9D9",
          ":hover": {
            bgcolor: disabled ? "rgba(0, 0, 0, 0.1)" : "#8477DA",
            cursor: disabled ? "" : "pointer",
            color: "#FFFF"
          },
          // py: 0.4,
          // px: 1,
          borderRadius: "4px",
          bgcolor: disabled ? "rgba(0, 0, 0, 0.1)" : active ? "#8477DA":'',
          color: active ? "#FFFF": '#101828',
          opacity: disabled ? 0.6 : 1,
          alignItems:'center'
        }}
        onClick={handleClick}
      >
        <div style={{ width: "20%" }}>
          <DefaultImage image={item?.image} name={item?.name} type={3} />
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
              textTransform: "capitalize",
              fontSize:'16px',
              fontWeight:'500',
              lineHeight:'24px'
            }}
          >
            {item?.name}
          </a>
          <p style={{ fontSize: "10px", marginTop: -5 }}>{item?.address}</p>
        </div>
        {/* {active ? (
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
        )} */}
      </Typography>
    </Tooltip>
  );
}
export default SingleUser;
