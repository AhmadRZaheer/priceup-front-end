import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import InputImageIcon from "../../Assets/imageUploader.svg";
import DefaultImageIcon from "../../Assets/default-image.jpg";
import { useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DefaultImage from "../ui-components/defaultImage";
import { CloseTwoTone } from "@mui/icons-material";


const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: '19px',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 809,
  bgcolor: "#FFFFFF",
  borderRadius: "12px",
  p: '24px 16px 24px 16px',
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const fieldSx = {
  '.MuiOutlinedInput-input': {
    p: '10px !important',
  },
  border: '1px solid #8477DA !important',
  background: '#F6F5FF',
  borderRadius: '4px !important'
}

export default function ShowerHardwareModel({
  open,
  close,
  recordToModify,
}) {


  const inputRef = useRef(null); // Create a ref for the file input

  const handleButtonClick = () => {
    inputRef.current.click(); // Trigger click on the file input
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          // backdropFilter: "blur(2px)",
          backgroundColor: "rgba(5, 0, 35, 0.1)",
          '.MuiModal-backdrop': {
            backgroundColor: "rgba(5, 0, 35, 0.1)",
          }
        }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Typography sx={{
                fontWeight: 700,
                fontSize: 18,
                lineHeight: '21.09px',
                fontFamily: '"Roboto",sans-serif !important'
              }}>
                {recordToModify ? "Edit Hardware" : "Add Hardware"}
              </Typography>
              <Typography
                sx={{
                  color: "#212528",
                  lineHeight: '21.86px',
                  fontWeight: 600,
                  // mt:'5px',
                  fontSize: 16,
                  opacity: '70%'
                }}
              >
                {recordToModify ? "Edit" : "Add"} Hardware details.
              </Typography>
            </Box>
            <Box>
              <IconButton
                sx={{ p: 0 }}
                onClick={() => {
                  close();
                }}
              >
                <CloseTwoTone />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              background: "#F3F5F6",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                lineHeight: '16.39px',
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Hardware image
            </Typography>
            <Box sx={{ display: "flex", gap: '19px', my: 2 }}>
              <Box>
                {/* {formik.values.image !== undefined && formik.values.image !== null ? (
                  <img
                    width={"84px"}
                    height={"84px"}
                    style={{ overflow: "hidden", borderRadius: "100%" }}
                    src={typeof formik.values.image === 'string' ? `${backendURL}/${formik.values.image}` : URL.createObjectURL(formik.values.image)}
                    alt="logo team"
                  />
                ) : ( */}
                <img
                  width={"84px"}
                  height={"84px"}
                  style={{ overflow: "hidden", borderRadius: "100%" }}
                  src={DefaultImageIcon}
                  alt="Selected"
                />
                {/* )} */}
              </Box>
              <input
                accept="image/*"
                id="image-input"
                type="file"
                // {...getInputProps()}
                ref={inputRef} // Attach the ref to the input
                style={{ display: "none" }}
              />

              <label htmlFor="image-input" style={{ alignSelf: 'center' }}>
                <Box
                  sx={{
                    // padding: 2,
                  }}
                >
                  <Button
                    sx={{
                      color: "#000000",
                      fontWeight: 600,
                      borderRadius: "54px !important",
                      border: "1px solid #D4DBDF",
                      textTransform: "capitalize",
                      p: '10px 12px !important',
                      lineHeight: '21px',
                      fontSize: 16
                    }}
                    onClick={handleButtonClick}
                  >
                    Upload Image
                  </Button>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#8477DA",
                      fontSize: "12px",
                      fontWeight: 600,
                      lineHeight: '16.39px', mt: 0.5
                    }}
                  >
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Typography>
                </Box>
              </label>
              {/* {formik.errors.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )} */}
            </Box>
            <Box  sx={{display:'flex',flexDirection:'column' ,gap:'16px'}}>
              <Box sx={{ width: "100%", }} className='model-field'>
                <Typography className="input-label-text">Hardware Label</Typography>
                <TextField
                  size="small"
                  placeholder="Enter Hardware Label"
                  name="hardwarelabel"
                  sx={{
                    '.MuiOutlinedInput-input': {
                      p: '10px !important',
                    }
                  }}
                  className="custom-textfield"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box sx={{ width: "100%", }} className='model-field'>
                <Typography className="input-label-text">Hardware Label</Typography>
                <Accordion sx={{ background: '#FFFFFF', boxShadow: 'none', border: '1px solid #D4DBDF', borderRadius: '4px', }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#000000' }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      p: '10px',
                      m: '0px !important',
                      minHeight: "40px",
                      "&.Mui-expanded": {
                        minHeight: "40px",
                        height: '40px'
                      },
                      ".MuiAccordionSummary-content": {
                        margin: '0px !important'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', lineHeight: '19.12px', color: '#959EA3' }}>Using customized values</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ p: "24px 30px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                        <Typography className="input-label-text">1" Holes</Typography>
                        <TextField
                          size="small"
                          placeholder="01"
                          name="holes"
                          className="custom-textfield"
                          variant="outlined"
                          fullWidth
                          sx={{...fieldSx}}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditOutlinedIcon sx={{width:'20px',height:'20px'}} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                        <Typography className="input-label-text">Hinge Cut Out</Typography>
                        <TextField
                          size="small"
                          placeholder="01"
                          name="hinge"
                          className="custom-textfield"
                          variant="outlined"
                          fullWidth
                          sx={{...fieldSx}}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditOutlinedIcon sx={{width:'20px',height:'20px'}} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                        <Typography className="input-label-text">Clamp Cut Out
                        </Typography>
                        <TextField
                          size="small"
                          placeholder="01"
                          name="clamp"
                          className="custom-textfield"
                          variant="outlined"
                          fullWidth
                          sx={{...fieldSx}}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditOutlinedIcon sx={{width:'20px',height:'20px'}} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ width: "100%", }} className='model-field'>
                        <Typography className="input-label-text">Notch</Typography>
                        <TextField
                          size="small"
                          placeholder="01"
                          name="notch"
                          className="custom-textfield"
                          variant="outlined"
                          fullWidth
                          sx={{...fieldSx}}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditOutlinedIcon sx={{width:'20px',height:'20px'}} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ width: "100%" }} className='model-field'>
                        <Typography className="input-label-text">Outages</Typography>
                        <TextField
                          size="small"
                          placeholder="01"
                          name="outages"
                          className="custom-textfield"
                          variant="outlined"
                          fullWidth
                          sx={{...fieldSx}}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <EditOutlinedIcon sx={{width:'20px',height:'20px'}} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              // marginTop: 2,
              width: "100%",
            }}
          >

            <Box sx={{ display: "flex", gap: '12px' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  //   if (recordToModify) {
                  //     formik.resetForm();
                  //   } else {
                  close();
                  //   }
                }}
                sx={{
                  color: "#212528",
                  border: "1px solid #D6DAE3",
                  width: "fit-content",
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                {recordToModify ? "Discard Changes" : "Cancel"}
              </Button>
              <Button
                variant="contained"
                onClick={close}
                // disabled={createLoading || updateLoading}
                sx={{
                  backgroundColor: "#8477DA",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  padding: "10px 16px !important",
                  position: "relative",
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                {recordToModify ? (
                  "Save Changes"
                ) : (
                  "Add"
                )}
                {/* {createLoading || updateLoading ? (
                  <Box sx={{ position: "absolute", bottom: "-1px" }}>
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  </Box>
                ) : recordToModify ? (
                  "Save Changes"
                ) : (
                  "Add"
                )} */}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
