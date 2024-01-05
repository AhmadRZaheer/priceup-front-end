import { Box, Button } from "@mui/material";
import LayoutHeader from "./layoutHeader";

const DefaultComponentHeader = ({ selected, handleEditClick }) => {
  return (
    <>
      <Box sx={{ width: "96%", m: "auto" }}>
        <LayoutHeader />
      </Box>
      <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "#EAECF0",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: "1rem",
        }}
      >
        {" "}
        <div
          style={{
            width: "380px",
            paddingTop: 6,
            fontSize: 18,
            paddingLeft: 5,
            alignItems: "center",
            color: "#667085",
          }}
        >
          Image
        </div>{" "}
        <div
          style={{
            width: "250px",
            paddingTop: 6,
            fontSize: 18,
            paddingLeft: 10,
            color: "#667085",
          }}
        >
          Setting
        </div>{" "}
        <div
          style={{
            width: "250px",
            paddingTop: 6,
            fontSize: 18,
            paddingLeft: 10,
            color: "#667085",
          }}
        >
          Default
        </div>
        <div
          style={{
            width: "40%",

            fontSize: 18,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              paddingTop: 6,
              fontSize: 18,
              paddingLeft: 5,
              color: "#667085",
            }}
          >
            Default count
          </div>
          <Button
            onClick={handleEditClick}
            sx={{
              backgroundColor: "#8477DA",
              boxShadow: 0,
              height: 40,
              width: 90,
              "&:hover": { backgroundColor: "#8477DA" },
            }}
            variant="contained"
          >
            {" "}
            Update
          </Button>
        </div>{" "}
      </div>
    </>
  );
};
export default DefaultComponentHeader;
