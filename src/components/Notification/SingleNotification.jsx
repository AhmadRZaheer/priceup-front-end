import React from 'react'
import { Divider,  Stack, Typography,Box } from "@mui/material";
import Tick from "../../Assets/Tick.svg";
import PersonIcon from "../../Assets/Persons.svg";

const SingleNotification = ({data}) => {
  return (
     <>
            <Box sx={{ py: 2.2,px: 2,':hover':{
              background:'rgba(217, 217, 217, 0.39)'
            }  }}>
              <Stack direction="row" gap={1} sx={{}}>
                <img alt="not" src={PersonIcon} />
                <Typography
                  sx={{
                    fontSize: "16.3px",
                    fontWeight: 500,
                    lineHeight: "20.65px",
                    color: "#8477DA",
                  }}
                >
                  Estimates
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} sx={{ py: 1.5 }}>
                <img alt="not" src={Tick} />
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "26.6px",
                    color: "#100D24",
                  }}
                >
                  Estimate Updated Successfully
                </Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Box
                  sx={{
                    border: "1px solid #8477DA",
                    borderRadius: "50%",
                    color: "#8477DA",
                    height: "38px",
                    width: "38px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:'#FFFF'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16.3px",
                      fontWeight: 600,
                      lineHeight: "20.65px",
                    }}
                  >
                    CP
                  </Typography>
                </Box>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "16.3px",
                      fontWeight: 500,
                      lineHeight: "20.65px",
                      color: "#8477DA",
                    }}
                  >
                    Chris Phillips{" "}
                    <span
                      style={{
                        fontWeight: `${300} !important`,
                        color: "#100D24",
                      }}
                    >
                      updated an estimate
                    </span>{" "}
                    <span
                      style={{
                        color: "rgba(119, 117, 131, 0.76)",
                        fontSize: "14.35px",
                        lineHeight: "11.84px",
                      }}
                    >
                      . 2h ago
                    </span>
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Divider/>
            </>
  )
}

export default SingleNotification