import {
    ManageSearch,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CustomIconButton from "@/components/ui-components/CustomButton";
import { useState } from "react";

const ActionsDropdown = ({
    item,
    actions
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ borderRadius: 2, fontSize: "14px", border: '1px solid #ccc', padding: { sm: '8px', xs: '0px 8px' } }}
            >
                <ManageSearch /> View
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
                        borderRadius: "8px"
                    },
                }}
            >
                {actions?.map((action, index) =>
                    <MenuItem key={`menu-item-${index}`} onClick={() => { action.handleClickItem(item); handleClose() }}>
                        <CustomIconButton
                            disable={action?.loading || false}
                            buttonText={action.title}
                            icon={action.icon}
                            {...action}
                        />
                    </MenuItem>)}
            </Menu>
        </>
    );
};
export default ActionsDropdown;
