import { Button } from "@mui/material";
import LayoutHeader from "./LayoutHeader";

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
          marginTop: '1rem',
        }}
      >
        {" "}
        <div
          style={{
            width: "380px",
            padding: 4,
            alignItems: "center",
          }}
        >
          Image
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 4,
          }}
        >
          Setting
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Default
        </div>
        <div
          style={{
            width: "380px",

            padding: 4,
          }}
        >
          Default count
        </div>{" "}
        <div style={{}}>
          <Button
            onClick={handleEditClick}
            sx={{ backgroundColor: "#8477DA", boxShadow: 0 }}
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
