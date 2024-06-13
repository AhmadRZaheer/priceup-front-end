import { MenuItem as MuiMenuItem, Tooltip } from "@mui/material";
import { backendURL } from "@/utilities/common";
import { Box, Typography } from "@mui/material";
// import { getActiveStatus } from "@/utilities/estimatorHelper";

const MenuItem = ({
  item,
  handleItemSelect,
  type,
  selectedItem,
  selectedContent,
}) => {
  // const activeFinishOrThickness = type === hardwareTypes.GLASSTYPE ? selectedContent.glassType.thickness : type === hardwareTypes.GLASSADDONS ? null : selectedContent?.hardwareFinishes;
  // const status = getActiveStatus(item, activeFinishOrThickness, type);
  // const [showToolTip, setShowTooltip] = useState(false);
  const handleItemClick = () => {
    // if (status || type === hardwareTypes.GLASSADDONS) {
    handleItemSelect(item);
    // }
  };
  // const captureMouseInteraction = (interaction) => {
  //   switch (interaction) {
  //     case "enter":
  //       if (status === false) {
  //         setShowTooltip(true);
  //       }
  //       break;
  //     case "leave":
  //       setShowTooltip(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  return (
    // <Tooltip
    //   title={
    //     <h3 style={{ color: "white" }}>
    //       This {type === hardwareTypes.GLASSTYPE ? 'glass type' : type === hardwareTypes.GLASSADDONS ? 'glass Addon' : 'hardware'} is not availabe {type === hardwareTypes.GLASSTYPE ? 'in current selected thickness' : type === hardwareTypes.GLASSADDONS ? '' : 'in current selected finish'}.
    //     </h3>
    //   }
    //   sx={{ fontSize: "20px" }}
    //   open={showToolTip}
    //   onMouseEnter={() => captureMouseInteraction("enter")}
    //   onMouseLeave={() => captureMouseInteraction("leave")}
    // >
    <MuiMenuItem
      key={item.id}
      onClick={handleItemClick}
      // sx={{ cursor: status ? "pointer" : "default" }}
      sx={{ cursor: "pointer" }}
    >
      <Box
        sx={{
          width: "200px",
          borderRadius: "12px",
          border: (
            type === "glassAddons"
              ? selectedContent?.glassAddons.some(
                (selectedItem) => selectedItem?._id === item?._id
              ) : type === "hardwares"
                ? selectedContent?.hardwares.some(
                  (selectedItem) => selectedItem?._id === item?._id
                ) :
                item === selectedItem
          )
            ? "2px solid blue"
            : "1px solid #EAECF0",
          boxShadow:
            "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
          p: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          width: { sm: "100%", xs: "95%" },
          justifyContent: "space-between",
          // backgroundColor: status ? "auto" : "darkgray",
          backgroundColor: "auto"
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <img
            width={"25px"}
            height={"25px"}
            src={`${backendURL}/${item?.image}`}
            alt="Selected"
          />
          <Typography>{item?.name}</Typography>
        </Box>
        <Box>
        </Box>
      </Box>
    </MuiMenuItem>
    // </Tooltip>
  );
};

export default MenuItem;
