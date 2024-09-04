import { Box, Button, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import DefaultImage from "./defaultImage";
import "./singleLocation.scss";
import { AddCircleRounded, East } from "@mui/icons-material";
import cloneIcon from "../../Assets/copy-icon.svg";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import TableRow from "../SuperAdmin/tableRow";
import { getDecryptedToken } from "@/utilities/common";
import { userRoles } from "@/utilities/constants";

const SingleLocation = ({
  data,
  // handleToggleChange,
  // nonActiveUsers,
  handleAccessLocation,
  handleClone,
  handleDelete,
  handleEdit,
  refetch,
}) => {
  const userToken = getDecryptedToken();
  return (
    <>
      <Box
      className='locationCard'
        sx={{
          // width: { lg: "448px", xs: "600px" },
          borderRadius: "8px",
          border: "1px solid rgba(208, 213, 221, 1)",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          padding: "16px",
          backgroundColor: "white",
          display:'flex',
          flexDirection:'column',
          gap:'10px'
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DefaultImage image={data?.image} name={data?.name} type={6} />
            <Tooltip title={data?.name} placement="top">
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                  width: "200px", // Adjust width as per your requirement
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data?.name}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            className={data.user?.status ? "status-active" : "status-inActive"}
          >
            {data.user?.status ? "Active" : "Inactive"}
          </Typography>
        </Box>
        <Divider sx={{borderColor:'#D0D5DD'}} />
        {/* statuses */}
        <Box
          sx={{
            // borderBottom: "1px solid rgba(208, 213, 221, 1)",
            // borderTop: " 1px solid rgba(208, 213, 221, 1)",
            display: "flex",
            justifyContent: "space-between",
            // py: '10px',
            // my: 1.5,
          }}
        >
          {/* users */}
          <Stack direction='column' gap='6px'>
            <Typography className="section-name-text">Users</Typography>
            <Box>
              {data?.staffs?.length !== 0 ? (
                <Box className="user-cellWrap" sx={{height: "33px"}}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {data?.staffs?.slice(0, 3).map((user, index) => {
                      return (
                        <Box
                          sx={{
                            ml: index > 0 ? -2 : 0,
                            border: "2px solid white",
                            borderRadius: "100%",
                          }}
                        >
                          <DefaultImage
                            key={index}
                            image={user?.image}
                            name={user?.name}
                            type={5}
                          />
                        </Box>
                      );
                    })}
                    {data?.staffs?.length > 3 && (
                      <AddCircleRounded
                        sx={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          fontSize: "14px",
                          color: "#8477DA",
                        }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: 500 }}>
                    {data?.staffs?.length}{" "}
                    {data?.staffs?.length === 1 ? "User" : "Users"}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ color: "#667085" }}>
                  <Typography sx={{height:'39px'}}>No User</Typography>
                </Box>
              )}
            </Box>
          </Stack>
          {/* Layouts */}
          <Stack direction='column' gap='6px'>
            <Typography className="section-name-text"> Layouts</Typography>
            <Typography  sx={{fontSize:'16px', fontWeight: 600 }}>
              {data?.layouts ?? 0}
            </Typography>
          </Stack>
          {/* Customers */}
          <Stack direction='column' gap='6px'>
            <Typography className="section-name-text"> Customers</Typography>
            <Typography sx={{fontSize:'16px', fontWeight: 600 }}>
              {data?.customers ?? 0}
            </Typography>
          </Stack>
          {/* Layouts */}
          <Stack direction='column' gap='6px'>
            <Typography className="section-name-text"> Estimates</Typography>
            <Typography sx={{ fontSize:'16px',fontWeight: 600 }}>
              {data?.estimates ?? 0}
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{borderColor:'#D0D5DD'}} />
        {/* actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={!data.user.status}
            onClick={() => handleAccessLocation(data)}
            variant="outlined"
            sx={{
              fontWeight: 600,
              lineHeight:'21.86px',
              fontSize:'16px',
              height: "40px",
              color: "rgba(132, 119, 218, 1)",
              borderColor: "rgba(132, 119, 218, 1)",
              letterSpacing:'0px',
              ":hover": {
                borderColor: "rgba(132, 119, 218, 1)",
              },
              gap:'10px'
            }}
            // endIcon={<East />}
          >
            Access Location
            <East sx={{width:'17px',height:'17px'}} />
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", height: "40px",gap:'12px' }}>
            {handleClone && (
              <IconButton
                sx={{ width: 20, height: 20 }}
                onClick={() => handleClone(data)}
              >
                <img
                  src={cloneIcon}
                  alt="clone icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {handleDelete && (
              <IconButton
                sx={{ width: 20, height: 20 }}
                onClick={() => handleDelete(data)}
              >
                <img
                  src={DeleteIcon}
                  alt="delete icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {handleEdit && (
              <IconButton
                sx={{ width: 20, height: 20 }}
                onClick={() => handleEdit(data)}
              >
                <img
                  src={EditIcon}
                  alt="delete icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
              {userToken?.role === userRoles.SUPER_ADMIN && <Box>
                <TableRow
                  title={
                    data?.user?.status ? "" : "This Location is not Active"
                  }
                  text={""}
                  row={data?.user}
                  onToggleChange={()=>{}}
                  type={"superAdmin"}
                  refetch={refetch}
                />
              </Box>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleLocation;
