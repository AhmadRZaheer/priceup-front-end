import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import MountingItem from "./mountingItem";
import { useState } from "react";

const MountingList = ({ type, mounting, handleSetMounting, list }) => {
    const [anchorEl, setAnchorEl] = useState(false);
    const handleOpenClose = () => {
        setAnchorEl(!anchorEl);
    }
    return (<>
        <Button
            onClick={handleOpenClose}
            id="basic-button"
            sx={{ color: { sm: "#000000 !important ", xs: "white" }, width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
            <Typography sx={{ textTransform: 'capitalize' }}>{type}</Typography>
            {anchorEl ? (
                <RemoveCircle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#000000 !important",
                    }}
                />
            ) : (
                <AddCircle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#000000 !important",
                    }}
                />
            )}
        </Button>
        {anchorEl ? (<Box sx={{ width: '100%' }}>
            {list?.[type]?.map((item, index) => <MountingItem key={index} item={item} type={type} handleSetMounting={handleSetMounting} selectedItem={mounting?.[type]} />)}
        </Box>) : anchorEl && list?.[type]?.length ? <Typography> No item found.</Typography> : ''}
    </>);

};

export default MountingList;