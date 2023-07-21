import { AddCircle, CreateOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import image1 from "../../Assets/hourglass.svg";
import image2 from "../../Assets/ok.svg";
import image3 from "../../Assets/cancel.svg";
import image4 from "../../Assets/calculator.svg";
import { NavLink } from "react-router-dom";
import { useGetEstimates } from "../../utilities/ApiHooks/Estimate";

export default function ExistingQuotes() {
  const { data: estimates, isLoading, isFetching } = useGetEstimates();
  console.log(estimates.length, "estimates")
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          height: "96vh",
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          gap: 5,
          pt: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: 2
            }}
          >
            <Box sx={{width: 60}}>
            <img style={{ width: "60%", height: "100%" }} src={image1} alt="" />
            <Typography pt={0.5} pl={0.8}  fontSize={26} fontWeight="bold">
                {estimates?.length}
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
              <Typography sx={{ fontSize: 18, color: "#575761" }}>
                Pending
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: 2
            }}
          >
            <Box sx={{width: 60}}>
            <img style={{ width: "60%", height: "100%" }} src={image2} alt="" />
            <Typography pt={0.5} pl={0.8}  fontSize={26} fontWeight="bold">
                0
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
              <Typography sx={{ fontSize: 18 }}>
              Approved
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: 2
            }}
          >
            <Box sx={{width: 60}}>
            <img style={{ width: "60%", height: "100%" }} src={image3} alt="" />
            <Typography pt={0.5} pl={0.8}  fontSize={26} fontWeight="bold">
            131
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
              <Typography sx={{ fontSize: 18}}>
              Voided
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 300,
              height: 80,
              padding: 3,
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              backgroundColor: "white",
              boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              borderRadius: 2
            }}
          >
            <Box sx={{width: 60}}>
            <img style={{ width: "80%", height: "100%" }} src={image4} alt="" />
            <Typography pl={0.8}  fontSize={26} fontWeight="bold">
            $28,956.00
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
              <Typography sx={{ fontSize: 18,  }}>
              Invoice Total
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "white", width: "92%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              Estimates Queue
            </Typography>
            <NavLink to="Steps">
              <AddCircle sx={{ fontSize: 30, color: "#6676f2" }} />
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", backgroundColor: "#e8e8e8", p: 2 }}>
            <Typography sx={{ width: 340 }}>Customer Name</Typography>
            <Typography sx={{ width: 300 }}>Email</Typography>
            <Typography sx={{ width: 180 }}>Date Quoted</Typography>
            <Typography sx={{ width: 190 }}>Estimated Total</Typography>
            <Typography sx={{ width: 180 }}>Measurer</Typography>
            <Typography sx={{ width: 180 }}>Status</Typography>
            <Typography sx={{ width: 60 }}></Typography>
          </Box>

          {estimates?.map((item) => (
            <Box
              sx={{ display: "flex", borderBottom: "1px solid #f0ecec", p: 2 }}
            >
              <Typography sx={{ width: 340 }}></Typography>
              <Typography sx={{ width: 300 }}></Typography>
              <Typography sx={{ width: 180 }}>
                {new Date(item?.updatedAt).toLocaleString()}
              </Typography>
              <Typography sx={{ width: 190 }}></Typography>
              <Typography sx={{ width: 180 }}></Typography>
              <Typography sx={{ width: 180 }}></Typography>
              <CreateOutlined sx={{ color: "gray", fontSize: 25 }} />
              <DeleteOutline sx={{ color: "rgb(255, 103, 96)", fontSize: 25 }} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
