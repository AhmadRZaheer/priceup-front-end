import { quoteState } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { SimpleLayoutDimensions } from "./Dimensions/simpleLayoutDimensions";
import { CustomLayoutDimensions } from "./Dimensions/customLayoutDimensions";
import { getQuoteState, selectedItem } from "@/redux/estimateCalculations";

export const ShowerDimensions = () => {
    const activeQuoteState = useSelector(getQuoteState);
    const item = useSelector(selectedItem);
    return (<>
        {activeQuoteState === quoteState.CREATE || (activeQuoteState === quoteState.EDIT && item?.config?.layout_id) ? <SimpleLayoutDimensions /> : activeQuoteState === quoteState.CUSTOM || (activeQuoteState === quoteState.EDIT && !item?.config?.layout_id) ? <CustomLayoutDimensions /> : ''}
    </>)
}