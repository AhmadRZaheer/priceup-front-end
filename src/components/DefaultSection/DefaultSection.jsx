import React, { useEffect } from "react";
import "./hardwareTable.scss";

import { Box, Typography } from "@mui/material";

import DefaultComponent from "./DefaultComponent";
import LayoutHeader from "./LayoutHeader";

import {
  useFetchDataDefault,
  useFetchSingleDefault,
} from "../../utilities/ApiHooks/DefaultLayouts";
import { CircularProgress } from "@material-ui/core";
import { getDefaultId } from "../../redux/defaultSlice";
import { useSelector } from "react-redux";

const DefaultSection = () => {
  const [showNext, SetShowNext] = React.useState("");

  const { data: defaultData, refetch: defaultDataRefetch } =
    useFetchDataDefault();

  // const defaultId = useSelector(getDefaultId);

  // const { data: singleDefault, isFetching: isfetchingDefaultSingle } =
  //   useFetchSingleDefault(defaultId);

  // const {
  //   data: singleDefault,
  //   isFetching: isfetchingDefaultSingle,
  // } = useFetchSingleDefault("64b1519397c2fbba74ad806b");

  // useEffect(() => {
  //   if (defaultData?.length) {
  //     SetShowNext(defaultData[0]?._id);
  //   }
  // }, [defaultData]);

  console.log(showNext, "showNext default");

  // console.log(defaultData, "defaultDatadefaultData");

  return (
    <>
      <Box
        sx={{
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          pt: 2,
        }}
      >
        <div className="page-title">
          <Typography sx={{ fontSize: 30, pl: 1 }}>Default</Typography>
        </div>
        <div
          style={{
            marginLeft: "15px",
            marginRight: "15px",
            background: "rgb(232, 232, 232)",
          }}
        >
          <LayoutHeader
            types={defaultData}
            //  showMore={SetShowNext}
          />
        </div>
        <Box
          sx={{
            border: "1px solid rgb(232, 232, 232)",
            margin: 2,
          }}
        >
          <div className="hardwareTable">
            <div className="hardwareTable">
              {/* <DefaultComponentHeader selected={showNext} /> */}
              {/* {isfetchingDefaultSingle ? (
                <CircularProgress />
              ) : (
                <DefaultComponent singleDefault={singleDefault} />
              )} */}
              <DefaultComponent />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default DefaultSection;
