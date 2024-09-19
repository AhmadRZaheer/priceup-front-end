import { useDispatch, useSelector } from "react-redux";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { useEffect } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { setWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getWineCellarsHardwareRefetch } from "@/redux/refetch";

export const WineCellarsHardware = () => {
  const dispatch = useDispatch();
  const wineCellarsHardwareRefetch = useSelector(getWineCellarsHardwareRefetch);
  const decryptedToken = getDecryptedToken();

  const { data: wineCellarsHardware, refetch: refetchWineCellarsHardware } =
    useFetchSingleDocument(`${backendURL}/hardwares/wineCellarsHardware`);

  useEffect(() => {
    if (wineCellarsHardware) {
      dispatch(setWineCellarsHardware(wineCellarsHardware));
    }
  }, [wineCellarsHardware]);

  useEffect(() => {
    if (decryptedToken?.company_id) {
      refetchWineCellarsHardware();
    }
  }, [wineCellarsHardwareRefetch]);

  return null;
};
