import { useDispatch, useSelector } from "react-redux";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { useEffect } from "react";
import { backendURL, getDecryptedToken } from "@/utilities/common";
import { setMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getMirrorsHardwareRefetch } from "@/redux/refetch";

export const MirrorsHardware = () => {
  const dispatch = useDispatch();
  const mirrorsHardwareRefetch = useSelector(getMirrorsHardwareRefetch);
  const decryptedToken = getDecryptedToken();

  const { data: mirrorsHardware, refetch: refetchMirrorsHardware } =
    useFetchSingleDocument(`${backendURL}/hardwares/mirrorsHardware`);

  useEffect(() => {
    if (mirrorsHardware) {
      dispatch(setMirrorsHardware(mirrorsHardware));
    }
  }, [mirrorsHardware]);

  useEffect(() => {
    if (decryptedToken?.company_id) {
      refetchMirrorsHardware();
    }
  }, [mirrorsHardwareRefetch]);

  return null;
};
