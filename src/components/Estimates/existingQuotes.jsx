// import { GifBoxTwoTone } from "@mui/icons-material";
import {
  AddCircle,
  CreateOutlined,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import image1 from "../../Assets/hourglass.svg"
import image2 from "../../Assets/ok.svg"
import image3 from "../../Assets/cancel.svg"
import image4 from "../../Assets/calculator.svg"

export default function ExistingQuotes({ setStorePage }) {
  const data = [
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
    {
      dataquotes: "7/13/2022",
      status: "pending",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          
          gap: 5,
        }}
      >
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 2,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <img style={{width: "20%", height: "100%"}} src={image1} alt="" />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography>Pending</Typography>
              <Typography color="blue">211</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 2,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <img style={{width: "20%", height: "100%"}} src={image2} alt="" />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography>Approved</Typography>
              <Typography color="green">0</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 2,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <img style={{width: "20%", height: "100%"}} src={image3} alt="" />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography>Voided</Typography>
              <Typography color="green">131</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 2,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <img style={{width: "20%", height: "100%"}} src={image4} alt="" />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography>Invoice Total</Typography>
              <Typography color="green">$28,956.00</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{backgroundColor: "white", width: '94%', height: "80%"}}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>Estimates Queue</Typography>
            <AddCircle onClick={() => setStorePage("Layout")} sx={{ fontSize: 30, color: "blue" }} />
          </Box>

          <Box sx={{ display: "flex", backgroundColor: "#e8e8e8", p: 2  }}>
            <Typography sx={{width: 340}}>Customer Name</Typography>
            <Typography sx={{width: 300}}>Email</Typography>
            <Typography sx={{width: 180}}>Date Quoted</Typography>
            <Typography sx={{width: 190}}>Estimated Total</Typography>
            <Typography sx={{width: 180}}>Measurer</Typography>
            <Typography sx={{width: 180}}>Status</Typography>
            <Typography sx={{width: 60}}></Typography>
          </Box>

          {data.map((item) => (
            <Box sx={{ display: "flex", borderBottom: "1px solid #f0ecec", p: 2  }}>
              <Typography sx={{width: 340}}></Typography>
              <Typography sx={{width: 300}}></Typography>
              <Typography sx={{width: 180}}>{item.dataquotes}</Typography>
              <Typography sx={{width: 190}}></Typography>
              <Typography sx={{width: 180}}></Typography>
              <Typography sx={{width: 180}}>{item.status}</Typography>
              <CreateOutlined sx={{ color: "gray", fontSize: 25 }} />
              <DeleteOutline sx={{ color: "red", fontSize: 25 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
