import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ItemTypes } from "./itemTypes";
import { searchItems } from "./helper";
import CustomInputField from "@/components/ui-components/CustomInput";

const { Box, Typography, Modal, IconButton, InputAdornment, CircularProgress, Button } = require("@mui/material");

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    bgcolor: "background.paper",
    p: 2,
    borderRadius: { sm: "4px", xs: "10px" },
    width: { sm: "480px", xs: "80%" },
};

const SelectItemModal = ({
    itemsList,
    selectedItem,
    setSelectedItem,
    open,
    handleClose,
    title,
    itemType,
    loading
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [item, setItem] = useState(null);
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        if (value === "") {
            setFilteredItems(itemsList ?? []);
        } else {
            const result = searchItems(itemsList, value, itemType);
            setFilteredItems(result ?? []);
        }
    };
    const handleSelectItem = (item) => {
        setItem(item);
    };
    const handleSubmit = () => {
        setSelectedItem(item);
        // handleClose();
    }
    useEffect(() => {
        if (itemsList && itemsList?.length) {
            setFilteredItems(itemsList);
        }
    }, [itemsList]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-customer-select"
        >
            <Box sx={style}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: "center",
                            p: 0.2,
                            fontSize: "18px",
                            fontWeight: 700,
                        }}
                    >
                        Select a {title}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
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
                                sx={{
                                    color: { sm: "black", xs: "white" },
                                    width: "100%",
                                }}
                                value={searchQuery}
                                onChange={handleSearchChange}

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
                            }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={28}
                                    color="primary"
                                    sx={{ justifySelf: "center", alignSelf: "center" }}
                                />
                            ) : itemsList?.length === 0 || !itemsList ? (
                                <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                                    No existing {itemType} found.
                                </Typography>
                            ) : itemsList?.length > 0 && filteredItems?.length === 0 ? (
                                <Box>
                                    <Typography sx={{ color: "gray", textAlign: "center", p: 1 }}>
                                        No result found. Try adjusting your search.
                                    </Typography>
                                </Box>
                            ) : (
                                filteredItems?.map((_item) =>
                                    <ItemTypes isSelected={item?._id === _item?._id} item={_item} handleSelect={handleSelectItem} type={itemType} key={`${itemType}-${_item?._id}`} />
                                )
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
                                onClick={handleSubmit}
                                sx={{
                                    width: "100%",
                                    textTransform: "initial",
                                    backgroundColor: "#8477da",
                                    "&:hover": {
                                        backgroundColor: "#8477da",
                                    },
                                }}
                                variant="contained"
                                disabled={item ? false : true}
                            >
                                Select {title}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default SelectItemModal;
