import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import DefaultImage from "./defaultImage";
import "./singleLocation.scss";
import { AddCircleRounded, East } from "@mui/icons-material";
import cloneIcon from "../../Assets/copy-icon.svg";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import TableRow from "../SuperAdmin/tableRow";

const SingleLocation = ({
  data,
  handleToggleChange,
  nonActiveUsers,
  handleAccessLocation,
  handleClone,
  handleDelete,
  handleEdit,
  refetch,
}) => {
  return (
    <>
      <Box
        sx={{
          width: {lg:"448px", xs: "600px"},
          borderRadius: "8px",
          border: "1px solid rgba(208, 213, 221, 1)",
          boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
          padding: "16px",
          backgroundColor: "white",
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
            <DefaultImage
              image={data.company?.image}
              name={data.company?.name}
              type={6}
            />
            <Tooltip title={data.company?.name} placement="top">
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
                {data.company?.name}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            className={data.user?.status ? "status-active" : "status-inActive"}
          >
            {data.user?.status ? "Active" : "inActive"}
          </Typography>
        </Box>
        {/* statuses */}
        <Box
          sx={{
            borderBottom: "1px solid rgba(208, 213, 221, 1)",
            borderTop: " 1px solid rgba(208, 213, 221, 1)",
            display: "flex",
            justifyContent: "space-between",
            py: 1,
            my: 1.5,
          }}
        >
          {/* users */}
          <Box>
            <Typography className="section-name-text">Users</Typography>
            <Box>
              {nonActiveUsers?.length !== 0 ? (
                <Box className="user-cellWrap">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    {nonActiveUsers?.slice(0, 3).map((user, index) => {
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
                    {nonActiveUsers?.length > 3 && (
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
                    {nonActiveUsers?.length} Users
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ color: "#667085", py: 0.7 }}>
                  <Typography>No Users</Typography>
                </Box>
              )}
            </Box>
          </Box>
          {/* Layouts */}
          <Box>
            <Typography className="section-name-text"> Layouts</Typography>
            <Typography py={0.7} sx={{ fontWeight: 600 }}>
              {data.layouts}
            </Typography>
          </Box>
          {/* Customers */}
          <Box>
            <Typography className="section-name-text"> Customers</Typography>
            <Typography py={0.7} sx={{ fontWeight: 600 }}>
              {data.customers}
            </Typography>
          </Box>
          {/* Layouts */}
          <Box>
            <Typography className="section-name-text"> Estimates</Typography>
            <Typography py={0.7} sx={{ fontWeight: 600 }}>
              {data.estimates}
            </Typography>
          </Box>
        </Box>
        {/* actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={!data.user.status}
            onClick={() => handleAccessLocation(data)}
            variant="outlined"
            sx={{
              color: "rgba(132, 119, 218, 1)",
              borderColor: "rgba(132, 119, 218, 1)",
              ":hover": {
                borderColor: "rgba(132, 119, 218, 1)",
              },
            }}
            endIcon={<East sx={{ color: "rgba(132, 119, 218, 1)" }} />}
          >
            Access Location
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", height: "40px" }}>
            {handleClone && (
              <IconButton
                sx={{ width: 40, height: 40 }}
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
                sx={{ width: 40, height: 40 }}
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
                sx={{ width: 40, height: 40 }}
                onClick={() => handleEdit(data)}
              >
                <img
                  src={EditIcon}
                  alt="delete icon"
                  style={{ width: "20px", height: "20px" }}
                />
              </IconButton>
            )}
            {handleToggleChange && (
              <Box>
                <TableRow
                  title={
                    data?.user?.status ? "" : "This Location is not Active"
                  }
                  text={""}
                  row={data?.user}
                  onToggleChange={handleToggleChange}
                  type={"superAdmin"}
                  refetch={refetch}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleLocation;
