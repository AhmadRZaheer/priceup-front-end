import CustomInputField from "@/components/ui-components/CustomInput";
import DefaultImage from "@/components/ui-components/defaultImage";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { CheckCircle, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  // Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

const SelectFromList = ({
  // handleCancel,
  selectedCustomer,
  setSelectedCustomer,
  handleStepChange,
}) => {
  const { data: customerList, refetch, isFetching } = useFetchDataCustomer();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [user, setUser] = useState(selectedCustomer || null);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredCustomer(customerList ?? []);
    } else {
      const filteredData = customerList?.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(value.toLowerCase()) ||
          customer.email?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomer(filteredData ?? []);
    }
  };
  const handleSelect = () => {
    setSelectedCustomer(user);
    // handleStepChange(2);
  };
  useEffect(() => {
    if (customerList && customerList?.length) {
      setFilteredCustomer(customerList);
    }
    refetch();
  }, [customerList]);
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
          {/* <Box sx={{ display: { sm: "block", xs: "none" } }}>
              <label htmlFor="search by name">Search by name</label>
            </Box> */}
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
            sx={{
              color: { sm: "black", xs: "white" },
              width: "100%",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            // placeholder="Search by name"
            // label="Search by name"
            placeholder={"Search by name"}
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
            // boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          {isFetching ? (
            <CircularProgress
              size={28}
              color="primary"
              sx={{ justifySelf: "center", alignSelf: "center" }}
            />
          ) : customerList?.length === 0 || !customerList ? (
            <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
              No existing customer found.
            </Typography>
          ) : customerList?.length > 0 && filteredCustomer?.length === 0 ? (
            <Box>
              <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                No result found. Try adjusting your search.
              </Typography>
            </Box>
          ) : (
            filteredCustomer?.map((option) => {
              const isSelected = user?._id === option?._id;
              return (
                <Box
                  onClick={() => setUser(option)}
                  sx={{
                    display: "flex",
                    backgroundColor: isSelected ? "#F6F5FF" : "white",
                    "&:hover": {
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    },

                    color: "black",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 0.5,
                    width: "96%",
                    borderRadius: "4px",
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
                        borderRadius: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <DefaultImage name={option.name} image={option.image} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {option.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                        {" "}
                        {option.email}
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
            disabled={user ? false : true}
          >
            Select Customer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectFromList;
