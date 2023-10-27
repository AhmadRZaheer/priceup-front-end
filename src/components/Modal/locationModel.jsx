import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Chip } from "@mui/material";
import {
  useFetchAdminLocation,
  useFetchDataAdmin,
} from "../../utilities/ApiHooks/superAdmin";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAddLocation } from "../../utilities/ApiHooks/team";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

export default function LocationModel({ open, onClose, selectedRow }) {
  var [addLocation, setAddLocation] = React.useState([]);
  console.log("addLOca", addLocation);
  const { data: locationData } = useFetchAdminLocation();
  console.log("fetchuser", selectedRow);
  const {
    mutate: editTeamMembers,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useAddLocation();
  const handleDelete = (chipToDelete) => () => {
    locationData.filter((chip) => chip._id !== chipToDelete._id);
  };
  const filteredlocationData = locationData.filter((data) =>
    selectedRow?.haveAccessTo.includes(data.id)
  );
  const excludedLocationData = locationData.filter(
    (data) => !selectedRow?.haveAccessTo.includes(data.id)
  );

  const handleAddLocation = (dataId) => {
    if (!addLocation.includes(dataId)) {
      setAddLocation([...addLocation, dataId]);
    }
  };
  const handleEditClick = () => {
    const id = selectedRow?._id;
    editTeamMembers({ data: addLocation, locId: id });
    onClose();
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={style}>
          <Typography variant="h6">
            Olivia is currently added in the following locations:
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "4px",
              }}
              component="ul"
            >
              {filteredlocationData.map((data) => {
                return (
                  <Box
                    sx={{ padding: "10px", borderRadius: "7px" }}
                    key={data.id}
                  >
                    <Chip
                      label={data.name}
                      onDelete={data.id ? handleDelete(data) : undefined}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* <ChipsArray /> */}
          </Box>
          {/* <BasicAccordion /> */}

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Add location</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                {/* <ChipsArray /> */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "4px",
                    }}
                    component="ul"
                  >
                    {excludedLocationData.map((data) => {
                      return (
                        <Box
                          sx={{ padding: "10px", borderRadius: "7px" }}
                          key={data.id}
                        >
                          <Chip
                            onClick={() => handleAddLocation(data.id)}
                            label={data.name}
                            onDelete={data.id ? undefined : handleDelete(data)}
                          />
                        </Box>
                      );
                    })}
                  </Box>

                  {/* <ChipsArray /> */}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                color: "black",
                border: "1px solid #D0D5DD",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#8477DA", width: "50%" }}
              onClick={() => handleEditClick()}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
