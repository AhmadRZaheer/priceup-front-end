import { Box, Button, IconButton, Typography } from "@mui/material";
import logout from "../../Assets/estimates/log-out.svg";
import pencil from "../../Assets/estimates/edit-2.svg";
import { NavLink } from "react-router-dom";

export default function ExitingQuotes({ setHandleEstimatesPages }) {
  const dates = [
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
    {
      Date: "7/06/2023",
      status: "Draft",
    },
  ];
  return (
    <>
      <Box sx={{ marginTop: 10 }}>
        <Box
          sx={{
            paddingY: 2,
            paddingX: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
            Existing Quotes
          </Typography>
          <IconButton sx={{ height: 25 }}>
            <NavLink to="/login">
              <img src={logout} alt="image of log out icon" />
            </NavLink>
          </IconButton>
        </Box>
        <Box sx={{ paddingX: 2, marginTop: 2, height: 345, overflow: "auto" }}>
          {dates.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 2,
                borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
              }}
            >
              <Typography sx={{ fontWeight: "Medium" }}>{item.Date}</Typography>
              <Box sx={{ display: "flex" }}>
                <Typography color="red" marginRight={3}>
                  {item.status}
                </Typography>
                <IconButton sx={{ marginRight: 1, height: 25 }}>
                  <img src={pencil} alt="image of pencil" />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ paddingX: 2, pt: 2 }}>
          <Button
            onClick={() => setHandleEstimatesPages("layout")}
            color="primary"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              background: "#8477DA",
              color: "white",
              fontSize: 18,
              "&:hover": { background: "#8477DA", color: "white" },
            }}
          >
            {" "}
            Create New Qoute
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              border: "2px solid rgba(102, 112, 133, 0.5)",
              fontSize: 18,
              width: "100%",
              marginTop: 1,
              color: "black",
              "&:hover": { border: "2px solid rgba(102, 112, 133, 0.5)" },
            }}
          >
            {" "}
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}
