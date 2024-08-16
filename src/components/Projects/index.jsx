import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ExistingList from "./existingList";
import WidgetCard from "../ui-components/widgetCard";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomInputField from "../ui-components/CustomInput";
import icon from "../../Assets/search-icon.svg";

export default function Projects() {
  const routePrefix = `${backendURL}/projects`;
  const navigate = useNavigate();
  const decodedToken = getDecryptedToken();
  const [search, setSearch] = useState("");
  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const { data: stats, refetch: refetchStats } = useFetchSingleDocument(
    `${routePrefix}/allStats`
  );
  useEffect(() => {
    refetchStats();
  }, [refetchStats]);
  return (
    <>
      <Box
        sx={{
          p: "20px 20px 20px 8px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              color: "rgba(33, 37, 40, 1)",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Create, edit and manage your Projects.
          </Typography>
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateProject}
            sx={{
              backgroundColor: "#8477DA",
              height:'44px',
              width:'214px',
              "&:hover": { backgroundColor: "#8477DA" },
              color: "white",
              textTransform: "capitalize",
              borderRadius: 1,
              fontSize: {lg:16,md:15},
              padding: '10px 16px',
            }}
          >
            <Add  sx={{ mr: 1.2,color:'#FFFFFF' }} />
            Create New Project
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: {sm:"#F6F5FF",xs:'#FFFFFF'},
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          height: "auto",
          overflow: "auto",
          gap: 5,
        }}
      >
        {decodedToken?.role !== userRoles.STAFF ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: 2.6,
            }}
          >
            <Grid container 
              sx={{
                gap: 3,
                display:'flex ',justifyContent:'space-between',pr:2
              }}
            >
              {[
                { title: "Pending", text: stats?.pending, variant: "blue" },
                { title: "Approved", text: stats?.approved, variant: "green" },
                { title: "Voided", text: stats?.voided, variant: "red" },
              ].map((item) => (
                <WidgetCard
                  type={2}
                  text={item.text}
                  title={item.title}
                  varient={item.variant}
                />
              ))}
            </Grid>
            {/* <Box
              sx={{
                width: "50%",
                height: 90,
                padding: 3,
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "white",
                boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
                borderRadius: 2,
              }}
            >
              <Box sx={{ width: 60 }}>
                <img
                  style={{ width: "76%", height: "100%" }}
                  src={image4}
                  alt=""
                />
                <Typography pl={0.8} fontSize={26} fontWeight="bold">
                  ${stats?.total?.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
                <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
              </Box>
            </Box> */}
          </Box>
        ) : (
          ""
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "98%",
            pr: 3,
            my: 1,
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
            Projects
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomInputField
              id="input-with-icon-textfield"
              placeholder="Search by User Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={icon} alt="search input" />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl
              sx={{ width: "152px" }}
              size="small"
              className="custom-textfield"
            >
              <InputLabel id="demo-select-small-label" className="input-label">
                Status
              </InputLabel>
              <Select
                // value={age}
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Status"
                size="small"
                sx={{ height: "40px" }}
                // onChange={handleChange}
              >
                <MenuItem value={"pending"}>Pending</MenuItem>
                <MenuItem value={"voided"}>Voided</MenuItem>
                <MenuItem value={"approved"}>Approved</MenuItem>
              </Select>
            </FormControl>
            <Button variant='text' sx={{color:'#0075FF',fontSize:'14px'}} >Clear Filters</Button>
          </Box>
        </Box>

        <Box
          sx={{
            width: "98%",
            border: "1px solid #EAECF0",
            borderRadius: "8px",
            background:'#FFFFFF',
            mr: 2,
            mb: 2,
          }}
        >
          <ExistingList />
        </Box>
      </Box>
    </>
  );
}
