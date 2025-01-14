import DefaultImage from "@/components/ui-components/defaultImage";
const { FileCopyOutlined, CheckCircle } = require("@mui/icons-material");
const { Box, Typography } = require("@mui/material");

export const ItemTypes = ({ type, item, handleSelect, isSelected }) => {
    let currentItemJsx = <></>;
    switch (type) {
        case 'project':
            currentItemJsx = <ProjectItem item={item} />
            break;
        case 'customer':
            currentItemJsx = <CustomerItem item={item} />
            break;
        case 'preview':
            currentItemJsx = <PreviewItem item={item} />
            break;
        default:
            currentItemJsx = <></>;
    }
    return (<Box
        onClick={() => handleSelect(item)}
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
        {currentItemJsx}
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
    </Box>);
}

const ProjectItem = ({ item }) => {
    return (<Box sx={{ display: "flex" }}>
        <Box
            sx={{
                mr: 1,
                mt: 0.4,
            }}
        >
            <FileCopyOutlined sx={{ color: "back", width: 20, height: 20 }} />
        </Box>
        <Box alignSelf='center'>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                {item.name}
            </Typography>
        </Box>
    </Box>);
}

const CustomerItem = ({ item }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box
                sx={{
                    mr: 1,
                    mt: 0.4,
                    borderRadius: "100%",
                    overflow: "hidden",
                }}
            >
                <DefaultImage name={item.name} image={item.image} />
            </Box>
            <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {item.name}
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                    {" "}
                    {item.email}
                </Typography>
            </Box>
        </Box>
    );
}

const PreviewItem = ({ item }) => {
    return (<Box sx={{ display: "flex" }}>
        <Box
            sx={{
                mr: 1,
                mt: 0.4,
            }}
        >
            <FileCopyOutlined sx={{ color: "back", width: 20, height: 20 }} />
        </Box>
        <Box alignSelf='center'>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                {item.name}
            </Typography>
        </Box>
    </Box>);
}