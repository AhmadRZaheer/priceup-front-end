import React, { useEffect } from "react";
import "./hardwareTable.scss";

import { Box } from "@mui/material";

import DefaultComponentHeader from "./DefaultComponentHeader";
import DefaultComponent from "./DefaultComponent";
import LayoutHeader from "./LayoutHeader";

import {
  useFetchDataDefault,
  useFetchSingleDefault,
} from "../../utilities/ApiHooks/DefaultLayouts";
import { CircularProgress } from "@material-ui/core";

const DefaultSection = () => {
  const [showNext, SetShowNext] = React.useState("");
  console.log(showNext, "showNext test11");

  const { data: defaultData, refetch: defaultDataRefetch } =
    useFetchDataDefault();
  // const [singleDefaultdata, setSingleDefault] = React.useState({});

  const {
    data: singleDefault,
    refetch: defaultRefetch,
    isLoading: isLoadingDefaultSingle,
    isFetching: isfetchingDefaultSingle,
  } = useFetchSingleDefault(showNext);

  useEffect(() => {
    if (defaultData?.length) {
      SetShowNext(defaultData[0]?._id);
    }
  }, [defaultData]);

  console.log(showNext, "showNext default");

  console.log(defaultData, "defaultDatadefaultData");

  return (
    <>
      <div className="page-title">
        <h2>Default</h2>
      </div>
      <div
        style={{
          marginLeft: "15px",
          marginRight: "15px",
          background: "rgb(232, 232, 232)",
        }}
      >
        <LayoutHeader types={defaultData} showMore={SetShowNext} />
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
            {isfetchingDefaultSingle ? (
              <CircularProgress />
            ) : (
              <DefaultComponent singleDefault={singleDefault} />
            )}
          </div>
        </div>
      </Box>
    </>
  );
};
export default DefaultSection;
