import { Close } from "@mui/icons-material";
import { useState } from "react";

const { default: CreateAddressForm } = require("./createAddressForm");
const { default: SelectFromList } = require("./selectFromList");
const { Box, Typography, Modal, IconButton } = require("@mui/material");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: { sm: "4px", xs: "10px" },
  width: { sm: "480px", xs: "80%" },
};

const CompanySelect = ({
  selectedContact,
  setSelectedContact,
  open,
  handleClose,
}) => {
  const [steps, setSteps] = useState(0); // 0 for list, 1 for create
  const handleStepChange = (step) => {
    setSteps(step);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-company-select"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              p: 0.2,
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            {steps === 0
              ? "Select an contact"
              : steps === 1
              ? "Create an contact"
              : ""}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        {steps === 0 ? (
          <SelectFromList
            handleStepChange={handleStepChange}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            key={"select-from-list-modal"}
          />
        ) : steps === 1 ? (
          <CreateAddressForm
            setSelectedContact={setSelectedContact}
            key={"create-company-form"}
            handleStepChange={handleStepChange}
          />
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
};

export default CompanySelect;
