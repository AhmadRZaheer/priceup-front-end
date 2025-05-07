import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Chip } from "@mui/material";
import {
  useFetchAdminLocation,
} from "../../utilities/ApiHooks/superAdmin";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAddLocation } from "../../utilities/ApiHooks/team";
import { Close } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

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

export default function LocationModel({
  open,
  onClose,
  selectedRow,
  staffRefetch,
}) {
  const { data: locationData, refetch } = useFetchAdminLocation();
  const {
    mutate: editTeamMembers,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useAddLocation();
  const [haveAccessArray, setHaveAccessArray] = useState([]);
  const [giveAccessArray, setGiveAccessArray] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const handleOpen = () => {
    if (isOpen) {
      setisOpen(false);
    } else setisOpen(true);
  };
  const handleDelete = (chipToDelete) => () => {
    const itemToRemove = haveAccessArray.find(
      (item) => item.id === chipToDelete.id
    );
    const result = haveAccessArray.filter(
      (chip) => chip.id !== chipToDelete.id
    );
    setHaveAccessArray(result);
    setGiveAccessArray([...giveAccessArray, itemToRemove]);
  };

  const handleAddLocation = (chipToAdd) => {
    if (!haveAccessArray.includes(chipToAdd.id)) {
      setHaveAccessArray([...haveAccessArray, chipToAdd]);
    }
    const result = giveAccessArray.filter((chip) => chip.id !== chipToAdd.id);
    setGiveAccessArray(result);
  };
  const handleEditClick = () => {
    const idsToAdd = haveAccessArray?.map((item) => {
      return item.id;
    });
    const id = selectedRow?._id;
    editTeamMembers({ data: idsToAdd, locId: id });
    onClose();
  };
  useEffect(() => {
    if (selectedRow) {
      const filteredlocationData = locationData.filter((data) =>
        selectedRow?.haveAccessTo.includes(data.id)
      );
      const excludedLocationData = locationData.filter(
        (data) => !selectedRow?.haveAccessTo.includes(data.id)
      );
      setHaveAccessArray(filteredlocationData);
      setGiveAccessArray(excludedLocationData);
    }
  }, [locationData, selectedRow]);
  useEffect(() => {
    if (SuccessForEdit) {
      staffRefetch();
    }
  }, [SuccessForEdit]);
  useEffect(() => {
    refetch();
  }, []);
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
            {selectedRow?.name} is currently added in the following locations:
          </Typography>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: 1,
                p: 0,
              }}
              component="ul"
            >
              {haveAccessArray.map((data) => {
                return (
                  <Tooltip
                    key={data.id}
                    title={
                      selectedRow.company_id === data.id ? "Cannot Remove" : ""
                    }
                  >
                    <Box
                      sx={{
                        borderRadius: "7px",
                      }}
                      key={data.id}
                    >
                      <Chip
                        label={data.name}
                        onDelete={data.id ? handleDelete(data) : undefined}
                        deleteIcon={
                          <Close
                            style={{
                              color: "white",
                              width: "16px",
                              height: "16px",
                              display:
                                selectedRow.company_id === data.id
                                  ? "none"
                                  : "block",
                            }}
                          />
                        }
                        sx={{
                          color: "white",
                          bgcolor:
                            selectedRow.company_id === data.id
                              ? "#8477DA"
                              : "#C6C6C6",
                          borderRadius: "7px",
                        }}
                      />
                    </Box>
                  </Tooltip>
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
              onClick={handleOpen}
            >
              {isOpen ? (
                <Typography
                  sx={{
                    color: "#4D5463",

                    borderBottom: "1px solid #ccc",
                    width: "100%",
                    pr: 4,
                    mr: -3,
                    pb: 1,
                    mb: -1,
                  }}
                >
                  Add location
                </Typography>
              ) : (
                <Typography color={"#4D5463"}>Add location</Typography>
              )}
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
                      p: 0,
                      gap: 1,
                    }}
                    component="ul"
                  >
                    {giveAccessArray.map((data) => {
                      return (
                        <Box sx={{ borderRadius: "7px" }} key={data.id}>
                          <Chip
                            onClick={() => handleAddLocation(data)}
                            label={data.name}
                            onDelete={data.id ? undefined : handleDelete(data)}
                            sx={{
                              color: "white",
                              bgcolor: "#C6C6C6",
                              borderRadius: "7px",
                            }}
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
                color: "#101828",
                border: "1px solid #D0D5DD",
                width: "50%",
                "&:hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#8477DA",
                width: "50%",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
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
