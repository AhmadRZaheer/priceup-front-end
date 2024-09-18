import { getEstimateCategory } from "@/redux/estimateSlice"
import { EstimateCategory } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { ShowerDimensions } from "./Showers/dimensions";
import { MirrorDimensions } from "./Mirrors/dimensions";
import { WineCellarDimensions } from "./WineCellar/dimensions";

export const SetDimensions = () => {
    const estimateCategory = useSelector(getEstimateCategory);
    return (<>
        {estimateCategory === EstimateCategory.SHOWERS ?
            <ShowerDimensions /> :
            estimateCategory === EstimateCategory.MIRRORS ?
                <MirrorDimensions /> :
                estimateCategory === EstimateCategory.WINECELLARS ?
                    <WineCellarDimensions /> : ''}
    </>)
}