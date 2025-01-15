import CustomInputField from "@/components/ui-components/CustomInput";
import { Box, Button, TextareaAutosize, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import React, { useState } from "react";

const FAQSection = ({ accordionData, setAccordionData }) => {
  // State for dynamically added question/answer fields
  const [fields, setFields] = useState([]);

  // State for controlling whether to show fields or not
  const [showFields, setShowFields] = useState(false);

  // Function to handle adding a new pair of question/answer fields
  const handleAddFields = () => {
    setShowFields(true);
    setFields([...fields, { title: "", desc: "" }]);
  };

  // Function to handle input changes
  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  // Function to handle form submission (API call can go here)
  const handleSubmit = () => {
    // API call logic here (e.g., POST request)
    console.log("Submit data:", fields);

    // Optionally, you can add the new items to the accordion data
    setAccordionData([...accordionData, ...fields]);

    // Reset fields after submission
    setFields([]);
    setShowFields(false);
  };

  const handleDeleteAccordionItem = (index) => {
    const updatedData = accordionData.filter((_, i) => i !== index);
    setAccordionData(updatedData);
  };

  return (
    <>
      {/* Display existing FAQ data */}
      <div>
        {accordionData &&
          accordionData.length > 0 &&
          accordionData.map((item, index) => (
            <Box
              sx={{
                pb: 1,
                position: "relative", // Ensure that the icon is positioned relative to the parent container
                "&:hover": {
                  "& .delete-icon": {
                    opacity: 1, // Show the close icon on hover
                  },
                },
              }}
              key={index}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <h3>{index + 1})</h3>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <h3>{item.title}</h3>
                  {/* Add the close (delete) icon */}
                  <IconButton
                    className="delete-icon"
                    sx={{
                      color: "#FF0000", // red color for delete icon
                      padding: 0,
                      opacity: 0, // Initially hide the icon
                      // position: "absolute", // Position it absolutely relative to the parent
                      // right: 0, // Align to the right of the parent
                    }}
                    onClick={() => handleDeleteAccordionItem(index)} // Function to delete
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
              <p>{item.desc}</p>
            </Box>
          ))}
      </div>

      {/* Button to toggle fields visibility */}
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
            <Box sx={{ pl: 1 }}>
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
