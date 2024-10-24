import { getEstimateCategory } from "@/redux/estimateSlice";
import { EstimateCategory } from "@/utilities/constants";
import { useSelector } from "react-redux";
import { ShowerDimensions } from "./Showers/dimensions";
import { MirrorDimensions } from "./Mirrors/dimensions";
import { WineCellarDimensions } from "./WineCellar/dimensions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const SetDimensions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estimateCategory = searchParams.get("category");
  const projectId = searchParams.get("projectId");
  useEffect(() => {
    if (
      estimateCategory === "" &&
      ![
        EstimateCategory.SHOWERS,
        EstimateCategory.MIRRORS,
        EstimateCategory.WINECELLARS,
      ].includes(estimateCategory)
    ) {
      navigate(`/projects/${projectId}?category=${estimateCategory}`);
    }
  }, []);
  // const estimateCategory = useSelector(getEstimateCategory);
  return (
    <>
      {estimateCategory === EstimateCategory.SHOWERS ? (
        <ShowerDimensions />
      ) : estimateCategory === EstimateCategory.MIRRORS ? (
        <MirrorDimensions />
      ) : estimateCategory === EstimateCategory.WINECELLARS ? (
        <WineCellarDimensions />
      ) : (
        ""
      )}
    </>
  );
};