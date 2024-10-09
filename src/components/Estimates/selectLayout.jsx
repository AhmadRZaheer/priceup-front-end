import { getEstimateCategory } from "@/redux/estimateSlice"
import { EstimateCategory } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { ShowerLayouts } from "./Showers/layouts";
import { MirrorLayouts } from "./Mirrors/layouts";
import { WineCallerLayouts } from "./WineCellar/layouts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const SelectLayout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const estimateCategory = searchParams.get('category');
    const projectId = searchParams.get("projectId");
    useEffect(() => {
      if (
        estimateCategory === '' &&
        ![
          EstimateCategory.SHOWERS,
          EstimateCategory.MIRRORS,
          EstimateCategory.WINECELLARS,
        ].includes(estimateCategory)
      ) {
          navigate(`/projects/${projectId}`)
      }
    }, []);

    return (<>
        {estimateCategory === EstimateCategory.SHOWERS ?
            <ShowerLayouts /> :
            estimateCategory === EstimateCategory.MIRRORS ?
                <MirrorLayouts /> :
                estimateCategory === EstimateCategory.WINECELLARS ?
                    <WineCallerLayouts /> : ''}
    </>)
}