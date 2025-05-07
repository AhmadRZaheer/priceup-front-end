import CustomInputField from "@/components/ui-components/CustomInput";
import { Box, Button, TextareaAutosize, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

const FAQSection = ({ accordionData, setAccordionData }) => {
  const [fields, setFields] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const handleAddFields = () => {
    setShowFields(true);
    setFields([...fields, { title: "", desc: "" }]);
  };
  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };
  const handleSubmit = () => {
    setAccordionData([...accordionData, ...fields]);

    setFields([]);
    setShowFields(false);
  };
  const handleDeleteAccordionItem = (index) => {
    const updatedData = accordionData.filter((_, i) => i !== index);
    setAccordionData(updatedData);
  };

  return (
    <>
      <div>
        {accordionData &&
          accordionData.length > 0 &&
          accordionData.map((item, index) => (
            <Box
              sx={{
                pb: 1,
                position: "relative",
                "&:hover": {
                  "& .delete-icon": {
                    opacity: 1,
                  },
                },
              }}
              key={index}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <h3>{index + 1})</h3>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <h3>{item.title}</h3>
                  <IconButton
                    className="delete-icon"
                    sx={{
                      color: "#FF0000",
                      padding: 0,
                      opacity: 0,
                    }}
                    onClick={() => handleDeleteAccordionItem(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <p>{item.desc}</p>
            </Box>
          ))}
      </div>

      {!showFields && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              background: "#8477DA",
              ":hover": {
                background: "#8477DA",
              },
            }}
            onClick={handleAddFields}
          >
            Add New
          </Button>
        </Box>
      )}

      {/* Dynamically render fields */}
      {showFields &&
        fields.map((field, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: "30%" }}>
              <CustomInputField
                fullWidth
                size="small"
                variant="outlined"
                type="text"
                name="title"
                value={field.title}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder="Enter title"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <TextareaAutosize
                style={{
                  padding: "10px",
                  borderColor: "#cccc",
                  borderRadius: "5px",
                  width: "100%",
                }}
                className="custom-textfield"
                color="neutral"
                minRows={4}
                maxRows={19}
                size="large"
                variant="outlined"
                sx={{ padding: "10px" }}
                name="desc"
                value={field.desc}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder="Enter description"
              />
            </Box>
            <Box sx={{ pl: 1, mt: "-12px", ml: "-15px" }}>
              <IconButton
                sx={{
                  color: "#FF0000",
                  p: "0px",
                }}
                onClick={() => {
                  setShowFields(false);
                  setFields([]);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

      {/* Submit Button */}
      {showFields && (
        <Box sx={{ textAlign: "center", pt: 1 }}>
          <Button
            variant="contained"
            component="label"
            sx={{
              background: "#8477DA",
              ":hover": {
                background: "#8477DA",
              },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      )}
    </>
  );
};

export default FAQSection;
