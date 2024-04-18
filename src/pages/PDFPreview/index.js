import { PDFViewer } from "@react-pdf/renderer";
import PDFFile from "../../components/PDFFile";
import { Box, Typography } from "@mui/material";

const PDFPreview = () => {
  return (
    <Box sx={{display:'flex',width:'100%',justifyContent:'center'}}>
    <Box sx={{flexGrow:1,background:'red'}}>
        <Typography>Div 1</Typography>
    </Box>
    <PDFViewer width={'60%'}>
      <PDFFile />
    </PDFViewer>
    <Box sx={{flexGrow:1,background:'green'}}>
    <Typography>Div 2</Typography>
    </Box>
    </Box>
  );
};

export default PDFPreview;
