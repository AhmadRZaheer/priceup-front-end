import { Close, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import InputImageIcon from "../../Assets/imageUploader.svg";
import CustomInputField from "../ui-components/CustomInput";
import { useState } from "react";

function EditLocationModal({ open, close, handleSave }) {
  const [sections, setSections] = useState([false, false, false]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid white",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };
  const toggleSection = (index) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };

  return (
    <>
      <Modal open={open} onClose={close}>
        <Box sx={style}>
          <Box sx={{ width: "100%", justifyContent: "end", display: "flex" }}>
            <Close
              onClick={close}
              sx={{
                color: "#7F56D9",
                cursor: "pointer",
                mt: -1,
                mr: -1,
              }}
            />
          </Box>
          <Typography
            sx={{ color: "#667085", fontSize: "16px", fontWeight: "bold" }}
          >
            Locations Management
          </Typography>

          <Box sx={{ mt: 2, mb: 10 }}>
            <Accordion
              sx={{
                paddingX: "6px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => toggleSection(0)}
              >
                {sections[0] ? (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                      borderBottom: "1px solid #667085",
                      width: "100%",
                      pr: 4,
                      mr: -3,
                      pb: 1,
                      mb: -1,
                    }}
                  >
                    Locations Info{" "}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                    }}
                  >
                    Locations Info{" "}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Box mb={2}>
                  <input
                    accept="image/*"
                    id="image-input"
                    type="file"
                    // {...getInputProps()}
                    style={{ display: "none" }}
                  />

                  {/* {formik.errors.image && (
                    <Typography color="error">{formik.errors.image}</Typography>
                  )} */}
                  {/* {selectedImage ? (
                    <img
                      width={"80px"}
                      height={"80px"}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  ) : ( */}
                  <label htmlFor="image-input">
                    <Box
                      sx={{
                        border: "1px solid #EAECF0",
                        textAlign: "center",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ height: 60 }}>
                        <img
                          width={60}
                          src={InputImageIcon}
                          alt="icon of input image"
                        />
                      </Box>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Typography sx={{ color: "#8477DA" }}>
                          Click to Upload
                        </Typography>
                      </span>
                      <Typography variant="body2" sx={{ color: "#667085" }}>
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </Typography>
                    </Box>
                  </label>
                  {/* )} */}
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        First name
                      </Typography>
                      <CustomInputField />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Typography
                        sx={{
                          color: "#344054",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        Last name
                      </Typography>
                      <CustomInputField />
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%", mt: 1.5 }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Email address
                    </Typography>
                    <CustomInputField fullWidth={true} />
                  </Box>
                  <Box sx={{ width: "100%", mt: 1.5 }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Phone
                    </Typography>
                    <CustomInputField fullWidth={true} />
                  </Box>
                  <Box sx={{ width: "100%", mt: 1.5 }}>
                    <Typography
                      sx={{
                        color: "#344054",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Password
                    </Typography>
                    <CustomInputField fullWidth={true} />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion
              sx={{
                padding: "6px",
                mt: 1,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => toggleSection(1)}
              >
                {sections[1] ? (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                      borderBottom: "1px solid #ccc",
                      width: "100%",
                      pr: 4,
                      mr: -3,
                      pb: 1,
                      mb: -1,
                    }}
                  >
                    User Allotment{" "}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#4D5463",
                      fontSize: "15px",
                    }}
                  >
                    User Allotment{" "}
                  </Typography>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{p: 0}}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "4px",
                      pl: 3,
                      pb: 2
                    }}
                    component="ul"
                  >
                    {/* {haveAccessArray.map((data) => {
                      return ( */}
                    <Tooltip
                    // title={
                    //   selectedRow.company_id === data.id
                    //     ? "Cannot Remove"
                    //     : ""
                    // }
                    >
                      <Box
                        sx={{
                          borderRadius: "7px",
                        }}
                        // key={data.id}
                      >
                        <Chip
                          label={"Add User"}
                          // onDelete={
                          //   data.id ? handleDelete(data) : undefined
                          // }
                          deleteIcon={
                            <Close
                              style={{
                                color: "white",
                                width: "16px",
                                height: "16px",
                                display:
                                  // selectedRow.company_id === data.id
                                  //   ? "none"
                                  // :
                                  "block",
                              }}
                            />
                          }
                          sx={{
                            color: "white",
                            bgcolor: "#C6C6C6",
                            // selectedRow.company_id === data.id
                            //   ? "#8477DA"
                            //   : "#C6C6C6",
                            borderRadius: "7px",
                          }}
                        />
                      </Box>
                    </Tooltip>
                    {/* );
                    })} */}
                  </Box>
                </Box>
                <Accordion
                  sx={{
                    paddingX: "6px",
                    boxShadow: "none !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore sx={{ color: "#4D5463" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => toggleSection(2)}
                  >
                    {sections[2] ? (
                      <Typography
                        sx={{
                          color: "#4D5463",
                          fontSize: "14px",
                          borderBottom: "1px solid #ccc",
                          width: "100%",
                          pr: 5.8,
                          mr: -3.5,
                          pb: 1,
                          mb: -1,
                          ml: -0.6,
                          pl: 0.2,
                        }}
                      >
                        Add User
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                        }}
                      >
                        Add User
                      </Typography>
                    )}
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baselines",
                        gap: "4px",
                        p: 0,
                      }}
                      component="ul"
                    >
                      {/* {giveAccessArray.map((data) => {
                            return ( */}
                      <Box
                        sx={{ borderRadius: "7px", p: 0 }}
                        // key={data.id}
                      >
                        <Chip
                          // onClick={() => handleAddLocation(data)}
                          label="User name"
                          // onDelete={
                          //   data.id ? undefined : handleDelete(data)
                          // }
                          sx={{
                            color: "white",
                            bgcolor: "#C6C6C6",
                            borderRadius: "7px",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                      {/* );
                          })} */}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}>
            <Button
              onClick={close}
              variant="outlined"
              sx={{
                border: "1px solid #D0D5DD",
                width: "20%",
                color: "#344054",
                ":hover": {
                  border: "1px solid #D0D5DD",
                },
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                bgcolor: "#8477DA",
                width: "20%",
                color: "white",
                ":hover": {
                  bgcolor: "#8477DA",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default EditLocationModal;
