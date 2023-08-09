import { Button } from "@mui/material";
import LayoutHeader from "./layoutHeader";

const DefaultComponentHeader = ({ selected, handleEditClick }) => {
  return (
    <>
      <LayoutHeader />

      <div
        style={{
          display: "flex",
          gap: 4,
          alignContent: "center",
          backgroundColor: "rgb(232, 232, 232)",
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
            }}
          >
            Default count
          </div>
          <Button
            onClick={handleEditClick}
            sx={{ backgroundColor: "#8477DA", boxShadow: 0, "&:hover": {backgroundColor: "#8477DA"} }}
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
