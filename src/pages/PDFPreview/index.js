import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";
import { Box, IconButton, Typography } from "@mui/material";
import CustomToggle from "../../components/ui-components/Toggle";
import { Close } from "@mui/icons-material";
import CustomInputField from "../../components/ui-components/CustomInput";

const PDFPreview = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "20%", background: "white", p: 2, py: 3 }}>
        {/* Title */}
        <Typography variant="h6" fontWeight={"bold"}>
          Quote Settings
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >
          {/* <Box>
            <Typography sx={{ fontWeight: "bold", color: "#9c9b9f" }}>
              PDF Type
            </Typography>
            <Box sx={{ mt: 1.6 }}>
              <Typography
                component={"div"}
                sx={{ p: 1, border: "2px solid #9c9b9f", borderRadius: "8px" }}
              >
                Quote
              </Typography>
              <Typography
                component={"div"}
                sx={{
                  p: 1,
                  border: "2px solid #9c9b9f",
                  borderRadius: "8px",
                  mt: 1,
                }}
              >
                Invoice
              </Typography>
            </Box>
          </Box> */}
          <Box>
            {/* SubTitle */}
            <Typography sx={{ fontWeight: "bold", color: "#9c9b9f" }}>
              Material Details
            </Typography>
            <Box sx={{ mt: 1.6 }}>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Group SubTotals"} />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Quantity"} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <PDFViewer width={"60%"}>
        <PDFFile />
      </PDFViewer>
      <Box sx={{ width: "20%", p: 2 }}>
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          <IconButton
            sx={{
              borderRadius: "100%",
              border: "2px solid black",
              color: "black",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Close sx={{ width: "20px", height: "20px" }} />
          </IconButton>
          Close
        </Typography>
        <hr style={{ width: "100%", marginTop: 12 }} />
        <Box sx={{ overflowY: "auto", height: "95%" }}>
          <Box mt={1}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              Contact Details
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "flex-start",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Quote Number</Typography>
              <CustomInputField fullWidth={true} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold" }}>Date</Typography>
                <CustomInputField
                  fullWidth={true}
                  placeholder={"Select a date"}
                />
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Expiration Date
                </Typography>
                <CustomInputField
                  fullWidth={true}
                  placeholder={"Select a date"}
                />
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                Customer Contact
              </Typography>
              <textarea
                style={{
                  width: "93%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  padding: 10,
                  fontSize: "15px",
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Job Info</Typography>
              <textarea
                style={{
                  width: "93%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  padding: 10,
                  fontSize: "15px",
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Name:</Typography>
              <CustomInputField
                fullWidth={true}
                placeholder={"Select a date"}
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Description:</Typography>
              <textarea
                style={{
                  width: "93%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  padding: 10,
                  fontSize: "15px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PDFPreview;
