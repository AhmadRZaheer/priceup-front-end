import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
const AddMoreItems = ({ items, handleItemClick }) => {
    const [expandAccordian, setExpandAccordian] = useState(true);
    return <Accordion
        expanded={expandAccordian}
        onChange={() => {
            setExpandAccordian(!expandAccordian);
        }}
        sx={{
            border: "none",
            background: "none",
            boxShadow: "none",
            ":before": {
                backgroundColor: "white !important",
            },
        }}
    >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#8477DA" }} />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
                color: "#5D6164",
                p: 0,
                flexGrow: `0 !important`,
                width: "130px",
                "&.Mui-expanded": {
                    minHeight: "40px",
                },
            }}
        >
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "21px",
                    color: "#9088C0",
                }}
            >
                Add more items
            </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: "0px" }}>
            {Object.entries(items).map(([key, value]) => (
                <Button onClick={() => handleItemClick(key)}
                    key={key}
                    variant="contained"
                    sx={{
                        height: "36px",
                        border: "1px solid #8477DA",
                        background: "#F6F5FF",
                        borderRadius: "4px !important",
                        p: "10px",
                        gap: "10px",
                        mr: "10px",
                        mb: "10px",
                        boxShadow: "none",
                        ":hover": {
                            background: "#F6F5FF",
                        },
                    }}>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            lineHeight: "16.14px",
                            color: "#000000",
                        }}
                    >
                        {value.name}
                    </Typography>
                    {!value.status ? (
                        <Add sx={{ color: "#8477DA !important" }} />
                    ) : (
                        <RemoveIcon sx={{ color: "#8477DA !important" }} />
                    )}
                </Button>
            ))}
        </AccordionDetails>
    </Accordion>
}

export default AddMoreItems;