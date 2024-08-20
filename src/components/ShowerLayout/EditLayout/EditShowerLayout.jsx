import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image from "../../../Assets/DoorImg.png";
import "../style.scss";
import CheckIcon from "@mui/icons-material/Check";
import ModificationItem from "./ModificationItem";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const data = [
  { id: 1, name: "Hardware Finishes", status: true, default: true },
  { id: 2, name: "Handles", status: true, default: true },
  { id: 3, name: "Pivot Hinge Option", status: true, default: true },
  { id: 4, name: "Hinges", status: true, default: true },
  { id: 5, name: "Glass Type", status: true, default: true },
  { id: 6, name: "Heavy Duty Option", status: false, default: false },
  { id: 7, name: "Channel or Clamps", status: false, default: false },
  { id: 8, name: "Heavy Pivot Option", status: false, default: false },
  { id: 9, name: "Wall Clamps (Mounting)", status: false, default: false },
  { id: 10, name: "Sleeve Over (Mounting)", status: false, default: false },
  { id: 11, name: "Glass to Glass (Mounting)", status: false, default: false },
  { id: 12, name: "Wall Clamps (Corner)", status: false, default: false },
];
const layoutArray = [{ name: "Doors" }, { name: "Doors & Panel" }];

const EditShowerLayout = () => {
  const [modification, setModification] = useState(data);
  const [layout, setLayout] = useState("");
  const [expandAccordian, setExpandAccordian] = useState(false);
  const handleChangeLayout = (event) => {
    setLayout(event.target.value);
  };
  useEffect(() => {
    setLayout("Doors");
  }, []);

  const handleButtonClick = (id) => {
    setModification((prevModification) =>
      prevModification.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Typography className="layouttitle">
          Showers <Box sx={{ color: "#000000" }}>/ Layouts</Box>
        </Typography>
        <FormControl
          sx={{ width: "197px" }}
          size="small"
          className="custom-textfield"
        >
          <Select
            value={layout}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF" }}
            onChange={handleChangeLayout}
            renderValue={(selected) => <Typography>{selected}</Typography>}
            MenuProps={{
              PaperProps: {
                style: {
                  width: "204px",
                },
              },
            }}
          >
            {layoutArray.map((data, index) => (
              <MenuItem key={index} value={data.name}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography>{data.name}</Typography>
                  {data.name === layout ? (
                    <CheckIcon sx={{ color: "#8477DA" }} />
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 3 }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: "23px",
            color: "#000000",
          }}
        >
          {layout}
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8477DA",
              width: "88px",
              height: "42px",
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: 16,
              fontWeight: 600,
              padding: "10px 13px",
              display: "box",
              "&:hover": { backgroundColor: "#8477DA" },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={5.2}>
          <Box
            sx={{
              width: { md: "auto", xs: "100%" },
              background: "#F3F5F6",
              border: "1px solid #D4DBDF",
              p: "14px 30px",
              borderRadius: "4px 4px 0px 0px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "21px",
                color: "#000000",
              }}
            >
              Layout
            </Typography>
          </Box>
          <Box
            sx={{
              height: "808px",
              border: "1px solid #D4DBDF",
              px: { md: 2, xs: 1 },
              background: "#FFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={image}
              alt="/"
              style={{ width: "423px", height: "557px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={6.8}>
          <Box
            sx={{
              width: { md: "auto", xs: "100%" },
              background: "#F3F5F6",
              border: "1px solid #D4DBDF",
              p: "14px 30px",
              borderRadius: "4px 4px 0px 0px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "21px",
                color: "#000000",
              }}
            >
              Modifications
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #D0D5DD",
              p: "24px 30px",
              background: "#FFFF",
              borderRadius: "0px 0px 12px 12px",
            }}
          >
            <Grid container spacing={2}>
              {modification.map(
                (data, index) =>
                  data.status === true && (
                    <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <ModificationItem data={data} />
                    </Grid>
                  )
              )}
            </Grid>
            <Accordion
              expanded={expandAccordian}
              onChange={() => {
                setExpandAccordian(!expandAccordian);
              }}
              sx={{
                border: "none",
                background: "none",
                boxShadow: "none",
                ":before": {
                  backgroundColor: "white !important",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#8477DA" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  color: "#5D6164",
                  p: 0,
                  flexGrow: `0 !important`,
                  width: "130px",
                  "&.Mui-expanded": {
                    minHeight: "40px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "21px",
                    color: "#9088C0",
                  }}
                >
                  Add more items
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: "0px" }}>
                {modification.map(
                  (data, index) =>
                    data.default !== true && (
                      <Button
                        onClick={() => handleButtonClick(data.id)}
                        key={index}
                        variant="contained"
                        sx={{
                          height: "36px",
                          border: "1px solid #8477DA",
                          background: "#F6F5FF",
                          borderRadius: "4px !important",
                          p: "10px",
                          gap: "10px",
                          mr: "10px",
                          mb: "10px",
                          boxShadow: "none",
                          ":hover": {
                            background: "#F6F5FF",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            lineHeight: "16.14px",
                            color: "#000000",
                          }}
                        >
                          {data.name}
                        </Typography>
                        {!data.status ? (
                          <Add sx={{ color: "#8477DA !important" }} />
                        ) : (
                          <RemoveIcon sx={{ color: "#8477DA !important" }} />
                        )}
                      </Button>
                    )
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditShowerLayout;
