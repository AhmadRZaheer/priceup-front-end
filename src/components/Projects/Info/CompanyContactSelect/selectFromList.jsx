import CustomInputField from "@/components/ui-components/CustomInput";
import { backendURL } from "@/utilities/common";
import { CheckCircle, Close } from "@mui/icons-material";
import BusinessIcon from '@mui/icons-material/Business';
import {
  Box,
  Button,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SelectFromList = ({
  selectedContact,
  setSelectedContact,
  handleStepChange,
}) => {

  // const routePrefix = `${backendURL}/addresses`;
  // const {
  //   data: addressList,
  //   refetch,
  //   isFetching,
  // } = useFetchAllDocuments(
  //   `${routePrefix}/by-customer/${selectedCustomer?._id}`
  // );
  
const compayConactList = [
  {
      "_id": "673221a58647701db6eeec25",
      "name": "Ahmad Raza",
      "phone": "07435718585"
  },
  {
      "_id": "672b0e61d5172d8d59775834",
      "name": "sahil mubeen",
      "phone": "123456789"
  },
  {
      "_id": "6724aa49afad60e2f15e1ed1",
      "name": "test maria",
      "phone": "45555"
  },
  {
      "_id": "671f3368af3268089326879d",
      "name": "dfdf dfdfd",
      "phone": ""
  },
  {
      "_id": "6717882602ae6626d57eb2f1",
      "name": "sahildddd mubeendddd",
      "phone": "123456789"
  },
  {
      "_id": "671787ef02ae6626d57eb2d6",
      "name": "sahil eeee mubeenee",
      "phone": "123456789"
  },
  {
      "_id": "6717878b02ae6626d57eb0ea",
      "name": "sahil tt mubeent",
      "phone": "123456789"
  },
  {
      "_id": "66fa592f29ce0c67c3a4dd49",
      "name": "Test TEst",
      "phone": ""
  },
  {
      "_id": "66fa554429ce0c67c3a4d9ab",
      "name": "sahil mubeen",
      "phone": "123456789"
  },
  {
      "_id": "66ed87db193295a1131cc732",
      "name": "abc",
      "phone": "567432989"
  }
]

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContact, setFilteredContact] = useState([]);
  const [contact, setContact] = useState(selectedContact || null);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredContact(compayConactList ?? []);
    } else {
      const filteredData = compayConactList?.filter((company) =>
        company.name?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContact(filteredData ?? []);
    }
  };
  const handleSelect = () => {
    setSelectedContact(contact);
  };
  useEffect(() => {
    if (compayConactList && compayConactList?.length) {
      setFilteredContact(compayConactList);
    }
    // if (selectedCustomer?._id) {
    //   refetch();
    // }
  }, [compayConactList]);
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
          {false ? (
            <CircularProgress
              size={28}
              color="primary"
              sx={{ justifySelf: "center", alignSelf: "center" }}
            />
          ) : compayConactList?.length === 0 || !compayConactList ? (
            <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
              No existing company found.
            </Typography>
          ) : compayConactList?.length > 0 && filteredContact?.length === 0 ? (
            <Box>
              <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                No result found. Try adjusting your search.
              </Typography>
            </Box>
          ) : (
            filteredContact?.map((option) => {
              const isSelected = contact?._id === option?._id;
              return (
                <Box
                  onClick={() => setContact(option)}
                  sx={{
                    display: "flex",
                    backgroundColor: isSelected ? "#F6F5FF" : "white",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "black",
                    p: 0.5,
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
                      <BusinessIcon sx={{ color: "back", width: 30, height: 30 }} />
                    </Box>
                    <Box sx={{alignContent:'center'}}>
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
            disabled={contact ? false : true}
          >
            Select Contact
          </Button>
        </Box>
        {/* create new Address */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            color: "gray",
          }}
        >
          <div style={{ width: "100%", background: "gray", height: "1px" }} />{" "}
          or{" "}
          <div style={{ width: "100%", background: "gray", height: "1px" }} />
        </Box>
        <Button
          onClick={() => handleStepChange(1)}
          sx={{
            width: "100%",
            textTransform: "initial",
            backgroundColor: "#8477da",
            "&:hover": {
              backgroundColor: "#8477da",
            },
          }}
          variant="contained"
        >
          Create new Contact{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectFromList;
