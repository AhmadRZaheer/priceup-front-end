// import DefaultImage from "@/components/ui-components/defaultImage";
import CustomInputField from "@/components/ui-components/CustomInput";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { backendURL } from "@/utilities/common";
import { CheckCircle, Close, LocationOn } from "@mui/icons-material";
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SelectFromList = ({
  selectedAddress,
  setSelectedProject,
  handleStepChange,
  selectedCustomer,
}) => {
  const routePrefix = `${backendURL}/projects`;

  const {
    data: addressList,
    refetch,
    isFetching,
  } = useFetchAllDocuments(
    `${routePrefix}/by-customer/${selectedCustomer?._id}`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAddress, setFilteredAddress] = useState([]);
  const [address, setAddress] = useState(selectedAddress || null);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredAddress(addressList?.projects ?? []);
    } else {
      const filteredData = addressList?.projects?.filter((address) =>
        address.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAddress(filteredData ?? []);
    }
  };
  const handleSelect = () => {
    setSelectedProject(address);
  };
  useEffect(() => {
    if (addressList && addressList?.projects?.length) {
      setFilteredAddress(addressList?.projects);
    }
    if (selectedCustomer?._id) {
      refetch();
    }
  }, [addressList, selectedCustomer?._id]);
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingBottom: { sm: 0, xs: 2 },
          }}
        >
          <CustomInputField
            size="small"
            InputProps={{
              endAdornment: searchQuery ? (
                <InputAdornment
                  position="end"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchQuery("");
                    handleSearchChange({ target: { value: "" } });
                  }}
                >
                  <Close sx={{}} />
                </InputAdornment>
              ) : (
                ""
              ),
              style: {
                color: "black",
                borderRadius: 4,
                backgroundColor: "white",
              },
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by reference"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 1,
            height: { sm: "212px", xs: "171px" },
            width: "97%",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            overflowY: "auto",
          }}
        >
          {isFetching ? (
            <CircularProgress
              size={28}
              color="primary"
              sx={{ justifySelf: "center", alignSelf: "center" }}
            />
          ) : addressList?.projects?.length === 0 || !addressList ? (
            <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
              No existing address found.
            </Typography>
          ) : addressList?.projects?.length > 0 && filteredAddress?.length === 0 ? (
            <Box>
              <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                No result found. Try adjusting your search.
              </Typography>
            </Box>
          ) : (
            filteredAddress?.map((option) => {
              const isSelected = address?._id === option?._id;
              return (
                <Box
                  onClick={() => setAddress(option)}
                  sx={{
                    display: "flex",
                    backgroundColor: isSelected ? "#F6F5FF" : "white",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "black",
                    p: 1,
                    width: "96%",
                    borderRadius: 2,
                    cursor: "pointer",
                    border: isSelected
                      ? "1px solid #8477DA"
                      : "1px solid #D4DBDF",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        mr: 1,
                        mt: 0.4,
                      }}
                    >
                      <FileCopyOutlinedIcon sx={{ color: "back", width: 20, height: 20 }} />
                    </Box>
                    <Box alignSelf='center'>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {option.name}
                      </Typography>
                    </Box>
                  </Box>
                  {isSelected && (
                    <CheckCircle
                      sx={{
                        color: "rgba(132, 119, 218, 1)",
                        width: "21px",
                        height: "21px",
                        mr: 1,
                      }}
                    />
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Box>
      <Box>
        {/* top buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleSelect}
            sx={{
              width: "100%",
              textTransform: "initial",
              backgroundColor: "#8477da",
              "&:hover": {
                backgroundColor: "#8477da",
              },
            }}
            variant="contained"
            disabled={address ? false : true}
          >
            Select Preview
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectFromList;
