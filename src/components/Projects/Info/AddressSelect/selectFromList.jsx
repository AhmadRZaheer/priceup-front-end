// import DefaultImage from "@/components/ui-components/defaultImage";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { backendURL } from "@/utilities/common";
import { Close, LocationOn } from "@mui/icons-material";
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
    setSelectedAddress,
    handleStepChange,
    selectedCustomer
}) => {
    const routePrefix = `${backendURL}/addresses`;

    const { data: addressList, refetch, isFetching } = useFetchAllDocuments(`${routePrefix}/by-customer/${selectedCustomer?._id}`);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAddress, setFilteredAddress] = useState([]);
    const [address, setAddress] = useState(selectedAddress || null);
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        if (value === "") {
            setFilteredAddress(addressList ?? []);
        } else {
            const filteredData = addressList?.filter(
                (address) =>
                    address.name?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredAddress(filteredData ?? []);
        }
    };
    const handleSelect = () => {
        setSelectedAddress(address);
    };
    useEffect(() => {
        if (addressList && addressList?.length) {
            setFilteredAddress(addressList);
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
                    <TextField
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
                        label="Search by reference"
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
                    ) : addressList?.length === 0 || !addressList ? (
                        <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                            No existing address found.
                        </Typography>
                    ) : addressList?.length > 0 && filteredAddress?.length === 0 ? (
                        <Box>
                            <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                                No result found. Try adjusting your search.
                            </Typography>
                        </Box>
                    ) : (
                        filteredAddress?.map((option) => (
                            <Box
                                onClick={() => setAddress(option)}
                                sx={{
                                    display: "flex",
                                    backgroundColor:
                                        address?._id === option?._id ? "#8477da" : "white",
                                    "&:hover": {
                                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    },

                                    color: address?._id === option?._id ? "white" : "black",
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
                                    <LocationOn sx={{color:"#FF3333",fontSize:'27px'}} />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '17px' }}>{option.name}</Typography>
                                    <Typography sx={{ fontWeight: '16px' }}> {option.street}</Typography>
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
                        Select Address
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
                    Create new Address{" "}
                </Button>
            </Box>
        </Box>
    );
};

export default SelectFromList;
