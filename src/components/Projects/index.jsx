import { Box, Typography } from "@mui/material";
import image1 from "@/Assets/test.png";
import image2 from "@/Assets/ok.png";
import image3 from "@/Assets/cancel.png";
import image4 from "@/Assets/calculator.svg";

import { useEffect } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ExistingList from "./existingList";

export default function Projects() {
    const routePrefix = `${backendURL}/projects`;
    const decodedToken = getDecryptedToken();

    const {
        data: stats,
        refetch: refetchStats,
    } = useFetchSingleDocument(`${routePrefix}/allStats`);
    useEffect(() => {
        refetchStats();
    }, [refetchStats]);
    return (
        <>
            <Box sx={{ backgroundColor: "white" }}>
                <Typography
                    sx={{
                        padding: 2.4,
                        fontWeight: "bold",
                        fontSize: 26,
                    }}
                >
                    Projects
                </Typography>
            </Box>
            <Box
                sx={{
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    overflow: "auto",
                    gap: 5,
                }}
            >
                {decodedToken?.role !== userRoles.STAFF ? <Box
                    sx={{
                        display: "flex",
                        width: "98%",
                        justifyContent: "space-between",
                        gap: 2.6,
                    }}
                >
                    <Box
                        sx={{
                            width: "50%",
                            height: 90,
                            padding: 3,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            backgroundColor: "white",
                            boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: 60 }}>
                            <img
                                style={{ width: "75%", height: "100%" }}
                                src={image1}
                                alt=""
                            />
                            <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                                {stats?.pending}
                            </Typography>
                        </Box>
                        <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                            <Typography sx={{ fontSize: 18 }}>Pending</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: "50%",
                            height: 90,
                            padding: 3,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            backgroundColor: "white",
                            boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: 60 }}>
                            <img
                                style={{ width: "75%", height: "100%" }}
                                src={image2}
                                alt=""
                            />
                            <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                                {stats?.approved}
                            </Typography>
                        </Box>
                        <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                            <Typography sx={{ fontSize: 18 }}>Approved</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: "50%",
                            height: 90,
                            padding: 3,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            backgroundColor: "white",
                            boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: 60 }}>
                            <img
                                style={{ width: "76%", height: "100%" }}
                                src={image3}
                                alt=""
                            />
                            <Typography pt={0.5} pl={0.8} fontSize={26} fontWeight="bold">
                                {stats?.voided}
                            </Typography>
                        </Box>
                        <Box sx={{ paddingLeft: 1, pt: 0.5 }}>
                            <Typography sx={{ fontSize: 18 }}>Voided</Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: "50%",
                            height: 90,
                            padding: 3,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "start",
                            backgroundColor: "white",
                            boxShadow: "0px 1px 4px 0px rgba(16, 24, 40, 0.2)",
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ width: 60 }}>
                            <img
                                style={{ width: "76%", height: "100%" }}
                                src={image4}
                                alt=""
                            />
                            <Typography pl={0.8} fontSize={26} fontWeight="bold">
                                ${stats?.total?.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box sx={{ paddingLeft: 1, pt: 1.5 }}>
                            <Typography sx={{ fontSize: 18 }}>Invoice Total</Typography>
                        </Box>
                    </Box>
                </Box> : ''}
                <Box
                    sx={{
                        width: "98%",
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                        mb: 2,
                    }}
                >
                    <ExistingList />
                </Box>
            </Box>
        </>
    );
}
