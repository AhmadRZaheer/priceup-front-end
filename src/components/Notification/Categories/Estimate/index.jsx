import { EstimateCategory } from "@/utilities/constants";
import { ShowerSummarySection } from "./showers";
import { MirrorSummarySection } from "./mirrors";
import { WineCellarSummarySection } from "./wineCellars";

export const EstimateSummary = ({ data, handleEditEstimate }) => {
  return data.category === EstimateCategory.SHOWERS ? (
    <ShowerSummarySection data={data} handleEditEstimate={handleEditEstimate} />
  ) : data.category === EstimateCategory.MIRRORS ? (
    <MirrorSummarySection data={data} handleEditEstimate={handleEditEstimate} />
  ) : data.category === EstimateCategory.WINECELLARS ? (
    <WineCellarSummarySection
      data={data}
      handleEditEstimate={handleEditEstimate}
    />
  ) : (
    <></>
  );
};
