import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useGetEstimatesStats } from "@/utilities/ApiHooks/estimate";
import { useEffect, useState } from "react";
import WidgetCard from "../ui-components/widgetCard";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CustomBarChart from "../charts/CustomBarChart";
import CustomPieChart from "../charts/CustomPieChart";
import CustomLineChart from "../charts/CustomLineChart";
import CustomAreaChart from "../charts/CustomAreaChart";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import { useMemo } from "react";
import { EstimateCategory } from "@/utilities/constants";
import GraphSkeleton from "./GraphSkeleton";

const dateSx = {
  "& .MuiInputBase-root": {
    height: 40,
    width: 150,
    backgroundColor: "white",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
    padding: "8px 14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: '"Roboto",sans-serif !important',
    top: "-5px",
    color: "#000000",
  },
};
const barData = [
  { x: "2019/01/01", y: 400 },
  { x: "2019/04/01", y: 430 },
  { x: "2019/07/01", y: 448 },
  { x: "2019/10/01", y: 470 },
  { x: "2020/01/01", y: 540 },
  { x: "2020/04/01", y: 580 },
];

const pieChartData = [55, 55, 55];

export default function Dashboard() {
  const currentDate = dayjs();
  const [graphDate, setGraphDate] = useState({
    start: currentDate.subtract(1, "month"),
    end: currentDate,
  });
  const {
    data: graphData,
    refetch: refetchGraphData,
    isFetching,
    isFetched,
  } = useFetchAllDocuments(
    `${backendURL}/dashboard-graph-data?startDate=${graphDate.start}&endDate=${graphDate.end}`
  );
  const { data, refetch } = useFetchAllDocuments(
    `${backendURL}/dashboard-stats`
  );
  console.log(isFetched, "isFetchedisFetched");
  const handleGraphDateChange = (newDate, isStartDate) => {
    if (newDate) {
      const adjustedDate = dayjs(newDate)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0);
      setGraphDate((prev) => ({
        ...prev,
        [isStartDate ? "start" : "end"]: adjustedDate,
      }));
    } else {
      setGraphDate((prev) => ({
        ...prev,
        [isStartDate ? "start" : "end"]: null,
      }));
    }
  };

  const handleShowGraph = () => {
    refetchGraphData();
  };
  useEffect(() => {
    refetchGraphData();
    refetch();
  }, []);

  const graphDataFormatted = useMemo(() => {
    const estimateBarChart = graphData?.estimates?.barChart ?? [];
    let pieChart = [];
    if (graphData?.estimates?.pieChart?.length) {
      const showerCount = graphData?.estimates?.pieChart?.find(
        (data) => data.category === EstimateCategory.SHOWERS
      )?.count;
      const mirrorCount = graphData?.estimates?.pieChart?.find(
        (data) => data.category === EstimateCategory.MIRRORS
      )?.count;
      const wineCellarCount = graphData?.estimates?.pieChart?.find(
        (data) => data.category === EstimateCategory.WINECELLARS
      )?.count;
      pieChart.push(showerCount ?? 0);
      pieChart.push(mirrorCount ?? 0);
      pieChart.push(wineCellarCount ?? 0);
    }
    // const estimatePieChart =
    //   graphData?.estimates?.pieChart?.map((item) => item.count) ?? [];
    const customerChart = graphData?.customers?.lineChart ?? [];
    const projectChart = graphData?.projects?.lineChart ?? [];

    return { estimateBarChart, projectChart, customerChart, pieChart };
  }, [graphData]);

  console.log(graphDataFormatted, "graphDatagraphData");

  return (
    <>
      {/* <Box
        sx={{
          backgroundColor: "#F6F5FF",
          p: { sm: "0px 0px 20px 0px", xs: "70px 0px 20px 10px" },
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Estimates
        </Typography>
      </Box> */}
      <Box
        sx={{
          backgroundColor: "#F6F5FF",
          width: "100%",
          height: "auto",
          pt:4
        }}
      >
        <Box
          sx={{
            px: { sm: 0, xs: 1 },
          }}
        >
          <Grid container spacing={2}>
            {[
              {
                title: "Estimates",
                text: data?.estimateCount,
                variant: "blue",
              },
              {
                title: "Projects",
                text: data?.projectCount,
                variant: "green",
              },
              {
                title: "Customers",
                text: data?.customerCount,
                variant: "red",
              },
              //   {
              //     title: "Invoice Total",
              //     text: estimatesStats?.total?.toFixed(2),
              //     variant: "purple",
              //   },
            ].map((item) => (
              <Grid item lg={3} md={4} xs={6}>
                <WidgetCard
                  text={item.text}
                  title={item.title}
                  varient={item.variant}
                />
              </Grid>
            ))}
          </Grid>
          <Box>
            <Box
              sx={{
                display: { sm: "flex", xs: "block" },
                justifyContent: "space-between",
                alignItems: "center",
                pr: { sm: 0, xs: 1 },
                pl: { sm: 0, xs: 1 },
                my: 1,
                pt: 3,
              }}
            >
              <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                Graph
              </Typography>
              <Box
                sx={{
                  display: { sm: "flex", xs: "block" },
                  gap: 1,
                  pt: { sm: 0, xs: 1 },
                }}
              >
                <Box
                  sx={{ display: "flex", gap: 1, mr: { sm: 0, xs: "26px" } }}
                >
                  <Box>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/DD/YYYY"
                      className="custom-textfield"
                      value={graphDate.start}
                      onChange={(newValue) =>
                        handleGraphDateChange(newValue, true)
                      }
                      sx={{
                        ...dateSx,
                      }}
                      maxDate={currentDate}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Box>
                  <Box>
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="MM/DD/YYYY"
                      className="custom-textfield"
                      value={graphDate.end}
                      onChange={(newValue) =>
                        handleGraphDateChange(newValue, false)
                      }
                      sx={{
                        ...dateSx,
                      }}
                      maxDate={currentDate}
                      renderInput={(params) => (
                        <TextField {...params} size="small" />
                      )}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, pt: { sm: 0, xs: 1 } }}>
                  <Button
                    variant="text"
                    onClick={handleShowGraph}
                    sx={{
                      p: "6px 8px !important",
                      fontFamily: '"Roboto",sans-serif !important',
                    }}
                  >
                    Apply Filter
                  </Button>
                </Box>
              </Box>
            </Box>
            {isFetching ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                    gap: 2,
                  }}
                >
                  <GraphSkeleton name="Estimate" />
                  <GraphSkeleton name="Estimate" />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                    gap: 2,
                  }}
                >
                  <GraphSkeleton name="Projects" />
                  <GraphSkeleton name="Customers" />
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Box sx={{ background: "white", width: "49%", pt: 1 }}>
                    <CustomBarChart
                      dataType="Estimate"
                      data={graphDataFormatted.estimateBarChart}
                    />
                  </Box>
                  <Box
                    sx={{
                      background: "white",
                      width: "49%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Helvetica, Arial, sans-serif !important",
                        fontSize: "14px",
                        fontWeight: `${800} !important`,
                        p: 1.3,
                      }}
                    >
                      Estimate
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <CustomPieChart data={graphDataFormatted.pieChart} />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: 2,
                  }}
                >
                  <Box sx={{ background: "white", width: "49%", pt: 1 }}>
                    <CustomLineChart
                      dataType="Projects"
                      data={graphDataFormatted.projectChart}
                    />
                  </Box>
                  <Box sx={{ background: "white", width: "49%", pt: 1 }}>
                    <CustomAreaChart
                      dataType="Customers"
                      data={graphDataFormatted.customerChart}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
