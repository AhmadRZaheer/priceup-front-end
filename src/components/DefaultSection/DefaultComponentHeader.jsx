import { Add } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

const DefaultComponentHeader = ({ selected }) => {
  console.log(selected, "type in default component header");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: 15,
          paddingBottom: 15,
          paddingLeft: "10px",
          paddingRight: "10px",
          // background: "red",
        }}
      >
        {" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
          }}
        >
          {selected}
        </div>{" "}
        <div
          style={{
            width: "250px",
            padding: 4,
            alignItems: "center",
            color: "red",
          }}
        >
          {/* {selected?._id} */}
        </div>{" "}
        <div
          style={{
            padding: 4,
          }}
        >
        
          <Button variant="contained"> Update</Button>
        </div>{" "}
      </div>

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

          // background: "red",
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
            width: "250px",

            padding: 4,
          }}
        >
          Default count
        </div>{" "}
      </div>
    </>
  );
};
export default DefaultComponentHeader;
