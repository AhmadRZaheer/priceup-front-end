import DefaultImage from "@/components/ui-components/defaultImage";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

const SelectFromList = ({
  handleCancel,
  selectedUser,
  setSelectedUser,
  handleStepChange,
}) => {
  const { data: customerList, refetch, isFetching } = useFetchDataCustomer();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredCustomer(customerList);
    } else {
      const filteredData = customerList.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(value.toLowerCase()) ||
          customer.email?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomer(filteredData);
    }
  };
  const HandleSelected = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  useEffect(() => {
    setFilteredCustomer(customerList);
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
          <TextField
            // size="small"
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
                border: "1px solid #cccccc",
                backgroundColor: "white",
              },
              inputProps: { min: 0, max: 50 },
            }}
            sx={{
              color: { sm: "black", xs: "white" },
              width: "100%",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            // placeholder="Search by name"
            label="Search by name"
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
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
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
            filteredCustomer.map((option) => (
              <Box
                onClick={() => HandleSelected(option)}
                sx={{
                  display: "flex",
                  backgroundColor:
                    selectedUser?._id === option?._id ? "#8477da" : "white",
                  "&:hover": {
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  },

                  color: selectedUser?._id === option?._id ? "white" : "black",
                  p: 0.5,
                  width: "96%",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
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
                  <Typography>{option.name}</Typography>
                  <Typography> {option.email}</Typography>
                </Box>
              </Box>
            ))
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
            onClick={handleCancel}
            variant="outlined"
            sx={{
              width: "48%",
              textTransform: "initial",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white",
              },
              color: "#101828",
              border: "1px solid #D0D5DD",
            }}
          >
            {" "}
            Cancel
          </Button>
          {/* <Link to={"/Estimates"} style={{width: "48%"}}> */}
          <Button
            onClick={() => handleStepChange(2)}
            sx={{
              width: "48%",
              textTransform: "initial",
              backgroundColor: "#8477da",
              "&:hover": {
                backgroundColor: "#8477da",
              },
            }}
            variant="contained"
            disabled={selectedUser ? false : true}
          >
            Next
          </Button>
        </Box>
        {/* create new User */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            color: "gray"
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
          Create new Customer{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default SelectFromList;
