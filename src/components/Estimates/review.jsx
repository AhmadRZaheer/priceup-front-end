import { getEstimateCategory } from "@/redux/estimateSlice"
import { EstimateCategory } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { ShowerReview } from "./Showers/review";
import { MirrorReview } from "./Mirrors/review";

export const Review = () => {
    const estimateCategory = useSelector(getEstimateCategory);
    return (<>
        {estimateCategory === EstimateCategory.SHOWERS ? <ShowerReview /> : estimateCategory === EstimateCategory.MIRRORS ? <MirrorReview /> : ''}
    </>)
}