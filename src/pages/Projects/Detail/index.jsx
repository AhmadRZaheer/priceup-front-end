import React, { useEffect } from "react";
import { backendURL } from "@/utilities/common";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import ProjectInfoComponent from "@/components/Projects/Info";
import CommonLayout from "@/components/CommonLayout";
import { useDispatch } from "react-redux";
import { setCustomerDetail } from "@/redux/estimateSlice";
const routePrefix = `${backendURL}/projects`;

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    data: getProject,
    isSuccess,
    isLoading: getLoading,
    refetch,
  } = useFetchSingleDocument(`${routePrefix}/${id}`);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (getProject) {
      dispatch(setCustomerDetail(getProject?.customerData));
    }
  }, [isSuccess]);

  return (
    <>
      <CommonLayout>
        <Box className="econtent-wrapper">
          {getLoading ? (
            <Box
              sx={{
                width: "fit-content",
                margin: "100px auto",
                color: "#8477da",
              }}
            >
              <CircularProgress />{" "}
            </Box>
          ) : !getLoading && getProject ? (
            <ProjectInfoComponent
              projectData={getProject}
              projectState="edit"
            />
          ) : (
            <Typography>Invalid ID. No preview found.</Typography>
          )}
        </Box>
      </CommonLayout>
    </>
  );
};

export default ProjectDetail;
