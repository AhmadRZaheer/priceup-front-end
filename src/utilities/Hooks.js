import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "./common";
// import { useQuery } from "react-query";

// export const useFetchDataFinishes = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(`${backendURL}/finishes`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.status === 200) {
//           setData(response.data.data);
//         } else {
//           setError("An error occurred while fetching the data.");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching the data.");
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [backendURL]);

//   return { data, error };
// };

export const useFetchDataFinishes = () => {
  const { data, error } = useQuery("finishesData", fetchData, {
    onError: (error) => {
      console.error(error);
    },
  });

  async function fetchData() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${backendURL}/finishes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error("An error occurred while fetching the data.");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching the data.");
    }
  }

  return { data, error };
};

// export function useGetNFTsByWallet() {
//     const chain = useChain();
//     // const { address: connectedAddress } = useAccount();
//     // const address = (inputAddress || connectedAddress) as string;
//     const fetchNFTsByWallet = async (chainId: number): Promise<NFTItemType[]> => {
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/nfts/nftsByWallet/${chainId}/${address}`
//         );
//         return res.data.code === 200 ? res.data.data.result : [];
//       } catch (error) {
//         console.log(error);
//       }
//       return [];
//     };

//     return useQuery({
//       queryKey: ['nftsByWallet', chain?.id],
//       queryFn: () => fetchNFTsByWallet(chain?.id as number),
//       refetchInterval: 120_000,
//       enabled: Boolean(address && chain?.id),
//     });
//   }

export const useDeleteFinishes = () => {
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendURL}/finishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "delete response");
    } catch (error) {
      setError("Delete failed");
      console.error("Delete failed", error);
    }
  };

  return { handleDelete, error };
};
