import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";
import { Box, IconButton, Typography } from "@mui/material";
import CustomToggle from "../../components/ui-components/Toggle";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const location = {
  name: "GCS Glass & Mirror",
  street: "20634 N. 28th Street, Suite 150",
  state: "Phoenix",
  zipCode: "AZ 85050",
  website: "www.gcs.glass",
};

const PDFPreview = () => {
  const [viewPricingSubCategory, setViewPricingSubCategory] = useState(true);
  const [viewGrossProfit, setViewGrossProfit] = useState(true);
  const [viewSummary, setViewSummary] = useState(true);
  const [viewLayoutImage, setViewLayoutImage] = useState(true);
  const [viewFabrication, setViewFabrication] = useState(true);
  const [viewAdditionalFields, setViewAdditionalFields] = useState(true);

  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const handleClose = () => {
    localStorage.removeItem('pdf-estimate');
    // navigate(-1);
    if(quote?.projectId){
      navigate(`/projects/${quote?.projectId}`);
    }else{
    navigate('/estimates');
    }
  }
  useEffect(() => {
    const item = localStorage.getItem("pdf-estimate");
    // if (!item) {
    //   navigate(-1);
    // }
    setQuote(JSON.parse(item));
  }, []);
  console.log(quote, "quote", new Date(quote?.updatedAt)?.toLocaleDateString(),quote?.glassType?.item?.name);
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
            onClick={handleClose}
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
                  text={"Pricing Sub Categories"}
                  checked={viewPricingSubCategory}
                  onChange={() => setViewPricingSubCategory(!viewPricingSubCategory)}
                />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle
                  text={"Gross Profit"}
                  checked={viewGrossProfit}
                  onChange={() => setViewGrossProfit(!viewGrossProfit)}
                />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Summary"}
                  checked={viewSummary}
                  onChange={() => setViewSummary(!viewSummary)} />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Layout Image"}
                  checked={viewLayoutImage}
                  onChange={() => setViewLayoutImage(!viewLayoutImage)} />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Fabrication"}
                  checked={viewFabrication}
                  onChange={() => setViewFabrication(!viewFabrication)} />
              </Typography>
              <Typography
                component={"div"}
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <CustomToggle text={"Additional Fields"}
                  checked={viewAdditionalFields}
                  onChange={() => setViewAdditionalFields(!viewAdditionalFields)} />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <PDFViewer width={"80%"}>
        <PDFFile
          controls={{ viewPricingSubCategory, viewGrossProfit, viewSummary, viewLayoutImage, viewFabrication, viewAdditionalFields }}
          data={{ quote, location }}
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
