const HardWareComponentHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        alignContent: "center",
        backgroundColor: "rgb(232, 232, 232)",
        paddingTop: 15,
        paddingBottom: 15,

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
  );
};
export default HardWareComponentHeader;
