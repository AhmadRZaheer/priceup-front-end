import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";
import { Box, IconButton, Typography } from "@mui/material";
import CustomToggle from "../../components/ui-components/Toggle";
import { Close } from "@mui/icons-material";
import CustomInputField from "../../components/ui-components/CustomInput";
import { useEffect, useState } from "react";
import { backendURL } from "../../utilities/common";
import { Link, useNavigate } from "react-router-dom";

const customerContact = {
  name: "sdasdas",
  phone: "2342343223",
  email: "someone@something.com",
};

const quoteInfo = {
  name: "2/29/2024",
  label: "Unique label",
  layoutName: "Door and Panel",
  layoutImage: `${backendURL}/images/layouts/layout_1.png`,
};

const locationInfo = {
  name: "GCS Glass & Mirror",
  street: "20634 N. 28th Street, Suite 150",
  state: "Phoenix",
  zipCode: "AZ 85050",
  website: "www.gcs.glass",
};

const tableRows = [
  { name: "8x8 MT Pull", qty: 1, type: "Handle", cost: 92.09 },
  { name: "STD-Bevel", qty: 2, type: "Hinge", cost: 34.89 },
  { name: "clear", type: "Glass", cost: 54 },
];

const PDFPreview = () => {
  const [viewQty, setViewQty] = useState(false);
  const [viewCostPerUnit, setViewCostPerUnit] = useState(false);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  useEffect(() => {
    const item = localStorage.getItem("pdf-estimate");
    if (!item) {
      navigate(-1);
    }
    setItem(JSON.parse(item));
  }, [navigate]);
  console.log(item,'item',new Date(item?.updatedAt)?.toLocaleDateString());
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={"bold"}>
            PDF Settings
          </Typography>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
            title={"Close"}
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
        </Box>

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
                <CustomToggle
                  text={"Quantity"}
                  checked={viewQty}
                  onChange={() => setViewQty(!viewQty)}
                />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle
                  text={"Cost/Unit"}
                  checked={viewCostPerUnit}
                  onChange={() => setViewCostPerUnit(!viewCostPerUnit)}
                />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Gross Profit Margin"} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <PDFViewer width={"80%"}>
        <PDFFile
          props={{
            viewQty,
            viewCostPerUnit,
            customerContact,
            quoteInfo,
            locationInfo,
            tableRows
          }}
          key={"pdfFile"}
        />
      </PDFViewer>
      {/* <Box sx={{ width: "20%", p: 2 }}>
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
                value={customerContact}
                onChange={(event)=>{setCustomerContact(event.target.value)}}
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
            <PDFDownloadLink document={<PDFFile />} filename="FORM">
              {({ loading }) =>
                loading ? (
                  <button>Loading Document...</button>
                ) : (
                  <button>Download</button>
                )
              }
            </PDFDownloadLink>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default PDFPreview;
