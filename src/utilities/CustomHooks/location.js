import { useSelector, useDispatch } from "react-redux";
import { useFetchSingleDocument } from "@/utilities/ApiHooks/common";
import { getLocationSettingsRefetch } from "@/redux/refetch";
import { useEffect } from "react";
import { setLocationInfo } from "@/redux/locationSlice";
import { backendURL, getDecryptedToken } from "@/utilities/common";

export const Location = () => {
  const dispatch = useDispatch();
  const locationSettingsRefetch = useSelector(getLocationSettingsRefetch);
  const decryptedToken = getDecryptedToken();
  const { data, refetch, error } = useFetchSingleDocument(
    `${backendURL}/companies/${decryptedToken?.company_id}`
  );

  useEffect(() => {
    if (data) {
      dispatch(setLocationInfo(data));
    }
  }, [data]);

  useEffect(() => {
    if (decryptedToken?.company_id) {
      refetch();
    }
  }, [locationSettingsRefetch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching document:", error);
    }
  }, [error]);

  return null;
};
