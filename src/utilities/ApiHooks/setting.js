import { backendURL } from "../common";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseJwt } from "../../components/ProtectedRoute/authVerify";

export const useFetchDataSetting = () => {
  async function fetchData() {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.get(
        `${backendURL}/companies/${decodedToken?.company_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.code === 200) {
        return response.data.data ? response.data.data : [];
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  }
  return useQuery({
    queryKey: ["settingData"],
    queryFn: fetchData,
    enabled: true,
    placeholderData: {},
  });
};

export const useEditSetting = () => {
  const handleEditSetting = async (editedData) => {

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendURL}/companies/${editedData?.id}`,
        {
          address: editedData.data.location,
          image: editedData.data.image,

          miscPricing: {
            pricingFactor: editedData.data.miscPricing.pricingFactor,
            hourlyRate: editedData.data.miscPricing.hourlyRate,
            pricingFactorStatus:
              editedData.data.miscPricing?.pricingFactorStatus,
          },
          fabricatingPricing: {
            oneHoleOneByTwoInchGlass:
              editedData?.data.fabricatingPricing?.oneHoleOneByTwoInchGlass,
            oneHoleThreeByEightInchGlass:
              editedData?.data.fabricatingPricing?.oneHoleThreeByEightInchGlass,
            clampCutoutOneByTwoInch:
              editedData?.data.fabricatingPricing?.clampCutoutOneByTwoInch,
            clampCutoutThreeByEightInch:
              editedData?.data.fabricatingPricing?.clampCutoutThreeByEightInch,
            hingeCutoutOneByTwoInch:
              editedData?.data.fabricatingPricing?.hingeCutoutOneByTwoInch,
            hingeCutoutThreeByEightInch:
              editedData?.data.fabricatingPricing?.hingeCutoutThreeByEightInch,
            minterOneByTwoInch:
              editedData?.data.fabricatingPricing?.minterOneByTwoInch,
            minterThreeByEightInch:
              editedData?.data.fabricatingPricing?.minterThreeByEightInch,
            notchOneByTwoInch:
              editedData?.data.fabricatingPricing?.notchOneByTwoInch,
            notchThreeByEightInch:
              editedData?.data.fabricatingPricing?.notchThreeByEightInch,
            outageOneByTwoInch:
              editedData?.data.fabricatingPricing?.outageOneByTwoInch,
            outageThreeByEightInch:
              editedData?.data.fabricatingPricing?.outageThreeByEightInch,
            polishPricePerOneByTwoInch:
              editedData?.data.fabricatingPricing?.polishPricePerOneByTwoInch,
            polishPricePerThreeByEightInch:
              editedData?.data.fabricatingPricing
                ?.polishPricePerThreeByEightInch,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.code === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while updating the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while updating the data.");
    }
  };

  return useMutation(handleEditSetting);
};
