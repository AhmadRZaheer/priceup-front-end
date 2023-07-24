import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import pencil from "../../Assets/estimates/edit-2.svg";
import { useDispatch } from "react-redux";
import {
  reinitializeState,
  setNavigation,
} from "../../redux/estimateCalculations";
import {
  useFetchDataEstimate,
  useGetEstimates,
} from "../../utilities/ApiHooks/Estimate";
import { useState } from "react";

export default function ExitingQuotes() {
  // let a = [1, 2, 3];

  // let t = [1, 2, 3];

  // const newarray = a.filter((item) => item !== t);

  // console.log(newarray, "newarray");
  // console.log(a, "a")

  // let a = [1, 2, 3];

  // let b = [1, 2, 3];

  // const newarray = a.map((item) => item + b);

  // const newarray2 = b.find((item) => item === 2);
  // const newarray3 = b.find((item) => item === a);
  // const c = b[2];
  // const newarray4 = b.find((item) => item === c);

  // const newarray5 = a.filter((item) => item === 1);
  // const newarray6 = a.filter((item) => item === b[2]);
  // const newarray7 = a.filter((item) => item !== b[1]);
  // const newarray8 = a.filter((item) => item > 1);
  // const newarray9 = a.filter((item) => item + 2);// why it dosenot add 2 in the array numbers.
  // const newarraytest1 = a.filter((item) => item)
  // const newarraytest2 = a.map((item) => item)
  // const newarraytest3 = a.find((item) => item)

  // console.log(newarraytest1, "newarraytest1")
  // console.log(newarraytest2, "newarraytest2")
  // console.log(newarraytest3, "newarraytest3")

  // console.log(newarray9, "newarray9");

  // console.log(newarray8, "newarray8");

  // console.log(newarray7, "newarray7");

  // console.log(newarray6, "newarray6");

  // console.log(newarray5, "newarray5");

  // console.log(newarray4, "newarray4");

  // console.log(newarray3, "newarray3");

  // console.log(newarray2, "newarray2");

  // console.log(newarray, "newarray1");
  const [selectedQuote, setSelectedQuote] = useState(null);
  console.log(selectedQuote);
  const { data: estimates, isFetching } = useGetEstimates();
  const { data: estimateListData } = useFetchDataEstimate();
  const dispatch = useDispatch();
  console.log(estimateListData, "selectedQuote ");
  const handleIconButtonClick = (item) => {
    setSelectedQuote(item);
    dispatch(
      reinitializeState({ estimateData: item, listData: estimateListData })
    );
    dispatch(setNavigation("review"));
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          height: "92.8vh",
          color: "#ffff",
          backgroundColor: "rgba(16, 13, 36, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <Box sx={{}}>
          <Box
            sx={{
              paddingY: 2,
              paddingX: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: "Medium" }}>
              Existing Quotes
            </Typography>
          </Box>

          <Box
            sx={{ paddingX: 2, marginTop: 2, height: "60vh", overflow: "auto" }}
          >
            {isFetching ? (
              <Box
                sx={{
                  width: 40,
                  m: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 600,
                }}
              >
                <CircularProgress sx={{}} />
              </Box>
            ) : (
              estimates?.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 2,
                    borderBottom: "1px solid rgba(102, 112, 133, 0.5)",
                  }}
                >
                  <Typography sx={{ fontWeight: "Medium" }}>
                    {new Date(item?.updatedAt).toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography color="red" marginRight={3}></Typography>

                    <IconButton
                      onClick={() => handleIconButtonClick(item)}
                      sx={{ marginRight: 1, height: 25 }}
                    >
                      <img src={pencil} alt="image of pencil" />
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box
          sx={{
            paddingX: 2,
            py: 3,
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "92%",
            borderTop: "1px solid rgba(102, 112, 133, 0.5)",
          }}
        >
          <Button
            onClick={() => {
              dispatch(setNavigation("layout"));
            }}
            color="primary"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              background: "#8477DA",
              color: "white",
              fontSize: 18,
              "&:hover": { background: "#8477DA", color: "white" },
            }}
          >
            Create New Qoute
          </Button>
        </Box>
      </Box>
    </>
  );
}
