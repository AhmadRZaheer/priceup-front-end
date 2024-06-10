import { getEstimateCategory } from "@/redux/estimateSlice"
import { EstimateCategory } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { ShowerLayouts } from "./Showers/layouts";
import { MirrorLayouts } from "./Mirrors/layouts";

export const SelectLayout = () => {
    const estimateCategory = useSelector(getEstimateCategory);
    return (<>
        {estimateCategory === EstimateCategory.SHOWERS ? <ShowerLayouts /> : estimateCategory === EstimateCategory.MIRRORS ? <MirrorLayouts /> : ''}
    </>)
}