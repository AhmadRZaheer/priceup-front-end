import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { addFormEntry } from "../../redux/formSlice";
import { useDispatch } from "react-redux";

const HardWareComponentHeader = ({ type }) => {
  const dispatch = useDispatch();
  const handleAddFormEntry = () => {
    dispatch(
      addFormEntry({
        id: Date.now() % 10000,
        img: "",
        title: "",
        additionalFinishType: "",
        hardwarePartNumber: "",
        cost: "",
        price: "",
        isChecked: "",
        thickness: "",
        items: [],
      })
    );
  };
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
          {type}
        </div>{" "}
        <div
          style={{
            padding: 4,
          }}
        >
          <IconButton onClick={handleAddFormEntry}>
            <Add style={{ color: "rgb(65, 106, 238)" }} />
          </IconButton>
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
            width: "250px",
            padding: 4,
            alignItems: "center",
          }}
        >
          Name
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          PartNnumber{" "}
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Cost
        </div>
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Price
        </div>{" "}
        <div
          style={{
            width: "250px",

            padding: 4,
          }}
        >
          Status
        </div>{" "}
      </div>
    </>
  );
};
export default HardWareComponentHeader;
