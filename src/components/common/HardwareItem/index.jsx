import { Box, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DeleteIcon from "@/Assets/Delete-Icon.svg";
import CustomIconButton from "@/components/ui-components/CustomButton";
import DefaultImage from "@/components/ui-components/defaultImage";
import HardwareOption from "@/components/common/HardwareOption";

const HardwareItem = ({ entry, mainIndex, handleOpenUpdateModal, handleOpenDeleteModal, handleHardwareOptionDelete, handleUpdateItem, setItemToModify }) => {
    console.log(entry,'fgfgfgfgfgfg');
    const [itemOptions, setItemOptions] = useState(entry?.options ?? []);
    const handleUpdateOption = (option) => {
        const index = itemOptions.findIndex((item) => item._id === option._id);
        const array = [...itemOptions];
        if (index !== -1) {
            array[index] = { ...array[index], cost: option.cost, status: option.status };
        }
        console.log(array, 'array options', option)
        setItemOptions(array);
    }
    const handleDeleteOption = (optionId) => {
        handleHardwareOptionDelete(entry._id, optionId);
    }
    useEffect(() => {
        const scrollToIndex = localStorage.getItem("scrollToIndex");
        if (scrollToIndex) {
            const updateButton = document.getElementById(scrollToIndex);
            if (updateButton) {
                updateButton.scrollIntoView({ behavior: "smooth" });
                localStorage.removeItem("scrollToIndex");
            }
        }
    }, []);

    return (
        <>
            <div
                style={{ borderBottom: "2px solid rgb(232, 232, 232)" }}
                key={mainIndex}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        p: 2,
                    }}
                >
                    {" "}
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <DefaultImage image={entry.image} type={2} name={entry.name} />
                        {entry.name}
                        <CustomIconButton
                            icon={<Edit sx={{ fontSize: 18, mr: 0.4 }} />}
                            handleClick={() => { setItemToModify(entry); handleOpenUpdateModal(); }}
                        />
                    </Box>
                    <Box>
                        <IconButton onClick={() => { setItemToModify(entry); handleOpenDeleteModal(); }}>
                            <img src={DeleteIcon} alt="delete icon" />
                        </IconButton>
                        <CustomIconButton
                            handleClick={() => handleUpdateItem({ options: itemOptions, id: entry._id })}
                            buttonText="Update"
                        />
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    {entry?.options?.map((option, index) => (
                        <HardwareOption
                            key={index}
                            option={option}
                            handleUpdateOption={handleUpdateOption}
                            handleDeleteOption={handleDeleteOption}
                        />
                    ))}
                </Box>
            </div>

        </>
    );
};

export default HardwareItem;
