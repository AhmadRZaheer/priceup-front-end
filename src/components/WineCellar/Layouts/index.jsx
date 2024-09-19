import { Box,  CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import "./style.scss";
import { useFetchDataDefault } from "@/utilities/ApiHooks/defaultLayouts";
import SingleShowerCard from "@/components/common/Layouts/SingleLayoutCard";
import { useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";

// const WineLayouts = [
//   {
//       "_id": "660507a8a4983e276851de31",
//       "name": "Sliding Glass Door",
//       "image": "images/layouts/layout_1.png",
//       "company_id": "660507a8a4983e276851dc29",
//       "settings": {
//           "hardwareFinishes": {
//               "_id": "660507a8a4983e276851dc31",
//               "name": "Brushed Nickel",
//               "image": "images/finishes/brushed_nickel.jpeg"
//           },
//           "handles": {
//               "handleType": {
//                   "_id": "660507a8a4983e276851dc50",
//                   "name": "Modern Handle",
//                   "image": "images/hardwares/modern_handle.png"
//               },
//               "count": 2
//           },
//           "hinges": {
//               "hingesType": {
//                   "_id": "660507a8a4983e276851dc9a",
//                   "name": "Concealed Hinges",
//                   "image": "images/hardwares/concealed_hinge.png"
//               },
//               "count": 4
//           },
//           "channelOrClamps": "Channel",
//           "glassType": {
//               "type": {
//                   "_id": "660507a8a4983e276851dd46",
//                   "name": "Frosted",
//                   "image": "images/others/frosted.png"
//               },
//               "thickness": "1/2"
//           },
//           "outages": 1,
//           "other": {
//               "people": 4,
//               "hours": 3
//           },
//           "measurementSides": 3,
//           "variant": "slidingdoor",
//           "pivotHingeOption": {
//               "pivotHingeType": {
//                   "_id": "660507a8a4983e276851dc70",
//                   "name": "Standard Pivot",
//                   "image": "images/hardwares/standard_pivot.png"
//               },
//               "count": 2
//           },
//           "heavyDutyOption": {
//               "heavyDutyType": {
//                   "_id": "660507a8a4983e276851dc71",
//                   "name": "Heavy Duty Pivot",
//                   "image": "images/hardwares/heavy_duty_pivot.png"
//               },
//               "threshold": 10,
//               "height": 100
//           },
//           "heavyPivotOption": {
//               "heavyPivotType": {
//                   "_id": "660507a8a4983e276851dc72",
//                   "name": "Extra Heavy Pivot",
//                   "image": "images/hardwares/extra_heavy_pivot.png"
//               },
//               "threshold": 15,
//               "height": 120
//           },
//           "wallClamp": {
//               "count": 1
//           },
//           "sleeveOver": {
//               "count": 2
//           },
//           "glassToGlass": {
//               "count": 1
//           },
//           "cornerWallClamp": {
//               "count": 1
//           },
//           "cornerSleeveOver": {
//               "count": 0
//           },
//           "cornerGlassToGlass": {
//               "count": 0
//           },
//           "slidingDoorSystem": {
//               "count": 2
//           },
//           "notch": 1,
//           "transom": "660507a8a4983e276851dcea"
//       }
//   },
//   {
//       "_id": "660507a8a4983e276851de32",
//       "name": "French Door",
//       "image": "images/layouts/layout_2.png",
//       "company_id": "660507a8a4983e276851dc2a",
//       "settings": {
//           "hardwareFinishes": {
//               "_id": "660507a8a4983e276851dc32",
//               "name": "Antique Brass",
//               "image": "images/finishes/antique_brass.jpeg"
//           },
//           "handles": {
//               "handleType": {
//                   "_id": "660507a8a4983e276851dc51",
//                   "name": "Classic Handle",
//                   "image": "images/hardwares/classic_handle.png"
//               },
//               "count": 2
//           },
//           "hinges": {
//               "hingesType": {
//                   "_id": "660507a8a4983e276851dc9b",
//                   "name": "Traditional Hinges",
//                   "image": "images/hardwares/traditional_hinge.png"
//               },
//               "count": 4
//           },
//           "channelOrClamps": "Clamps",
//           "glassType": {
//               "type": {
//                   "_id": "660507a8a4983e276851dd47",
//                   "name": "Tinted",
//                   "image": "images/others/tinted.png"
//               },
//               "thickness": "5/16"
//           },
//           "outages": 3,
//           "other": {
//               "people": 3,
//               "hours": 4
//           },
//           "measurementSides": 2,
//           "variant": "frenchdoor",
//           "pivotHingeOption": {
//               "pivotHingeType": null,
//               "count": 0
//           },
//           "heavyDutyOption": {
//               "heavyDutyType": {
//                   "_id": "660507a8a4983e276851dc73",
//                   "name": "Heavy Duty",
//                   "image": "images/hardwares/heavy_duty.png"
//               },
//               "threshold": 5,
//               "height": 80
//           },
//           "heavyPivotOption": {
//               "heavyPivotType": null,
//               "threshold": 0,
//               "height": 0
//           },
//           "wallClamp": {
//               "count": 1
//           },
//           "sleeveOver": {
//               "count": 1
//           },
//           "glassToGlass": {
//               "count": 0
//           },
//           "cornerWallClamp": {
//               "count": 0
//           },
//           "cornerSleeveOver": {
//               "count": 0
//           },
//           "cornerGlassToGlass": {
//               "count": 0
//           },
//           "slidingDoorSystem": {
//               "count": 0
//           },
//           "notch": 0,
//           "transom": "660507a8a4983e276851dcfb"
//       }
//   }
// ];


const WineLayoutsComponent = () => {
  const {
    data: WineLayouts,
    refetch,
    isLoading: isLoadingWineLayouts,
  } = useFetchAllDocuments(`${backendURL}/wineCellars/layouts`);

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: 5,
          pr: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography className="layouttitle">
            Wine Cellar
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
          <Typography className="layouttitle" sx={{ color: "#000000" }}>
            Layouts
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        gap={"21px"}
      >
        {isLoadingWineLayouts ? (
          <Box sx={{ height: "60vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress sx={{ color: "#8477DA" }} />
          </Box>
        ) : (
          WineLayouts?.map((data, index) => (
            <Grid item>
              <SingleShowerCard key={index} data={data}  variant='wineCellar' />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default WineLayoutsComponent;
