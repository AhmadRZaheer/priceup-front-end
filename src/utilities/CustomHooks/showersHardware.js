import { useDispatch, useSelector } from "react-redux";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { useEffect } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { setListData } from "@/redux/estimateCalculations";
import { getShowersHardwareRefetch } from "@/redux/refetch";

export const ShowersHardware = () => {
  const dispatch = useDispatch();
  const showersHardwareRefetch = useSelector(getShowersHardwareRefetch);
  const decryptedToken = getDecryptedToken();

  const { data: showersHardware, refetch: refetchShowersHardware } =
    useFetchSingleDocument(`${backendURL}/hardwares/showersHardware`);

  useEffect(() => {
    if (showersHardware) {
      dispatch(setListData(showersHardware));
    }
  }, [showersHardware]);

  useEffect(() => {
    if (decryptedToken?.company_id) {
      refetchShowersHardware();
    }
  }, [showersHardwareRefetch]);

  return null;
};
