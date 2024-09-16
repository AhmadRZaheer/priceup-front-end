import { Check } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import "../style.scss";
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { backendURL } from '@/utilities/common';
import CustomInputMenu from '@/components/ui-components/CustomInputMenu';
import { useFormik } from 'formik';
import { setWineItemsStatusAfterFirstLoad } from '@/utilities/layouts';
import CustomInputField from '@/components/ui-components/CustomInput';
import AddMoreItems from '@/components/ShowerLayout/EditLayout/addMoreItems';
import { thicknessTypes } from '@/utilities/constants';

const WineLayout = [
  {
    "_id": "660507a8a4983e276851de31",
    "name": "Sliding Glass Door",
    "image": "images/layouts/layout_1.png",
    "company_id": "660507a8a4983e276851dc29",
    "settings": {
      "hardwareFinishes": {
        "_id": "660507a8a4983e276851dc31",
        "name": "Brushed Nickel",
        "image": "images/finishes/brushed_nickel.jpeg"
      },
      "handles": {
        "handleType": {
          "_id": "660507a8a4983e276851dc50",
          "name": "Modern Handle",
          "image": "images/hardwares/modern_handle.png"
        },
        "count": 2
      },
      "hinges": {
        "hingesType": {
          "_id": "660507a8a4983e276851dc9a",
          "name": "Concealed Hinges",
          "image": "images/hardwares/concealed_hinge.png"
        },
        "count": 4
      },
      "channelOrClamps": "Channel",
      "glassType": {
        "type": {
          "_id": "660507a8a4983e276851dd46",
          "name": "Frosted",
          "image": "images/others/frosted.png"
        },
        "thickness": "1/2"
      },
      "outages": 1,
      "other": {
        "people": 4,
        "hours": 3
      },
      "measurementSides": 3,
      "variant": "slidingdoor",
      "pivotHingeOption": {
        "pivotHingeType": {
          "_id": "660507a8a4983e276851dc70",
          "name": "Standard Pivot",
          "image": "images/hardwares/standard_pivot.png"
        },
        "count": 2
      },
      "heavyDutyOption": {
        "heavyDutyType": {
          "_id": "660507a8a4983e276851dc71",
          "name": "Heavy Duty Pivot",
          "image": "images/hardwares/heavy_duty_pivot.png"
        },
        "threshold": 10,
        "height": 100
      },
      "heavyPivotOption": {
        "heavyPivotType": {
          "_id": "660507a8a4983e276851dc72",
          "name": "Extra Heavy Pivot",
          "image": "images/hardwares/extra_heavy_pivot.png"
        },
        "threshold": 15,
        "height": 120
      },
      "wallClamp": {
        "count": 1
      },
      "sleeveOver": {
        "count": 2
      },
      "glassToGlass": {
        "count": 1
      },
      "cornerWallClamp": {
        "count": 1
      },
      "cornerSleeveOver": {
        "count": 0
      },
      "cornerGlassToGlass": {
        "count": 0
      },
      "slidingDoorSystem": {
        "count": 2
      },
      "notch": 1,
      "transom": "660507a8a4983e276851dcea"
    }
  },
  {
    "_id": "660507a8a4983e276851de32",
    "name": "French Door",
    "image": "images/layouts/layout_2.png",
    "company_id": "660507a8a4983e276851dc2a",
    "settings": {
      "hardwareFinishes": {
        "_id": "660507a8a4983e276851dc32",
        "name": "Antique Brass",
        "image": "images/finishes/antique_brass.jpeg"
      },
      "handles": {
        "handleType": {
          "_id": "660507a8a4983e276851dc51",
          "name": "Classic Handle",
          "image": "images/hardwares/classic_handle.png"
        },
        "count": 2
      },
      "hinges": {
        "hingesType": {
          "_id": "660507a8a4983e276851dc9b",
          "name": "Traditional Hinges",
          "image": "images/hardwares/traditional_hinge.png"
        },
        "count": 4
      },
      "channelOrClamps": "Clamps",
      "glassType": {
        "type": {
          "_id": "660507a8a4983e276851dd47",
          "name": "Tinted",
          "image": "images/others/tinted.png"
        },
        "thickness": "5/16"
      },
      "outages": 3,
      "other": {
        "people": 3,
        "hours": 4
      },
      "measurementSides": 2,
      "variant": "frenchdoor",
      "pivotHingeOption": {
        "pivotHingeType": null,
        "count": 0
      },
      "heavyDutyOption": {
        "heavyDutyType": {
          "_id": "660507a8a4983e276851dc73",
          "name": "Heavy Duty",
          "image": "images/hardwares/heavy_duty.png"
        },
        "threshold": 5,
        "height": 80
      },
      "heavyPivotOption": {
        "heavyPivotType": null,
        "threshold": 0,
        "height": 0
      },
      "wallClamp": {
        "count": 1
      },
      "sleeveOver": {
        "count": 1
      },
      "glassToGlass": {
        "count": 0
      },
      "cornerWallClamp": {
        "count": 0
      },
      "cornerSleeveOver": {
        "count": 0
      },
      "cornerGlassToGlass": {
        "count": 0
      },
      "slidingDoorSystem": {
        "count": 0
      },
      "notch": 0,
      "transom": "660507a8a4983e276851dcfb"
    }
  }
];
const singleLayout = {
  "layoutData": {
    "settings": {
      "handles": {
        "handleType": "660507a8a4983e276851dc59",
        "count": 2
      },
      "doorLock": {
        "type": "660507a8a4983e276851dc59",
        "count": 1
      },
      "hinges": {
        "hingesType": 'None',
        "count": 0
      },
      "pivotHingeOption": {
        "pivotHingeType": 'None',
        "count": 0
      },
      "heavyDutyOption": {
        "heavyDutyType": 'None',
        "threshold": 0,
        "height": 0
      },
      "glassType": {
        "type": "660507a8a4983e276851dd45",
        "thickness": "3/8"
      },

      "other": {
        "people": 2,
        "hours": 2
      },

      "hardwareFinishes": "660507a8a4983e276851dc30",
      "outages": 2,
      "measurementSides": 2,
      "variant": "doublebarn",
      "channelOrClamps": "Channel",
      "mountingChannel": 'None',
      "notch": 0,
      "transom": 'None',
      "header": 'None',
      "glassAddon": 'None'
    },
    "_id": "660507a8a4983e276851de74",
    "name": "Double Barn",
    "image": "images/layouts/layout_9.png",
    "company_id": "660507a8a4983e276851dc28",
    "createdAt": "2024-03-28T06:01:12.494Z",
    "updatedAt": "2024-09-06T10:58:41.944Z",
    "__v": 0
  },
  "listData": {
    "hardwareFinishes": [
      {
        "_id": "660507a8a4983e276851dc2b",
        "name": "Polished Nickel",
        "slug": "polished-nickel",
        "image": "images/finishes/polished_nickle.jpeg",
        "partNumber": "1",
        "holesNeeded": 1,
        "cost": 0,
        "status": false,
        "company_id": "660507a8a4983e276851dc28",
        "createdAt": "2024-03-28T06:01:12.240Z",
        "updatedAt": "2024-08-23T11:36:41.804Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dc2f",
        "name": "Brushed Nickel",
        "slug": "brushed-nickel",
        "image": "images/finishes/brushed_nickle.jpeg",
        "partNumber": "1",
        "holesNeeded": 1,
        "cost": 0,
        "status": false,
        "company_id": "660507a8a4983e276851dc28",
        "createdAt": "2024-03-28T06:01:12.240Z",
        "updatedAt": "2024-03-28T06:01:12.240Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dc2c",
        "name": "Satin Brass",
        "slug": "satin-brass",
        "image": "images/finishes/satin_brass.jpeg",
        "partNumber": "1",
        "holesNeeded": 1,
        "cost": 0,
        "status": false,
        "company_id": "660507a8a4983e276851dc28",
        "createdAt": "2024-03-28T06:01:12.240Z",
        "updatedAt": "2024-03-28T06:01:12.240Z",
        "__v": 0
      },

    ],
    "handles": [
      {
        "_id": "66d6f8a6a82554091c3f2341",
        "name": "Google ddd",
        "slug": "google-ddd",
        "image": "images/hardwares/uploads/1725364388791-2024-03-11.png",
        "operableTransom": false,
        "hardware_category_slug": "handles",
        "oneInchHoles": null,
        "hingeCut": null,
        "clampCut": null,
        "notch": null,
        "outages": null,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "66d6f8a6a82554091c3f2343"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "66d6f8a6a82554091c3f2344"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "66d6f8a6a82554091c3f2345"
          },
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "66d6f8a6a82554091c3f2346"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "66d6f8a6a82554091c3f2347"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "66d6f8a6a82554091c3f2348"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "66d6f8a6a82554091c3f2349"
          }
        ],
        "createdAt": "2024-09-03T11:53:10.021Z",
        "updatedAt": "2024-09-13T05:42:57.151Z",
        "__v": 0
      },
      {
        "_id": "66d6d3e8a82554091c3eb8ad",
        "name": "Test",
        "slug": "test",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "handles",
        "oneInchHoles": null,
        "hingeCut": null,
        "clampCut": null,
        "notch": null,
        "outages": null,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "66d6d3e8a82554091c3eb8af"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "66d6d3e8a82554091c3eb8b0"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "66d6d3e8a82554091c3eb8b1"
          },
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "66d6d3e8a82554091c3eb8b2"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "66d6d3e8a82554091c3eb8b3"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "66d6d3e8a82554091c3eb8b4"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "1",
            "cost": 0,
            "status": false,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "66d6d3e8a82554091c3eb8b5"
          }
        ],
        "createdAt": "2024-09-03T09:16:24.289Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },
    ],
    "hinges": [
      {
        "_id": "660507a8a4983e276851dc89",
        "name": "Pivot Bevel",
        "slug": "pivot-bevel",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "hinges",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dc8a"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dc8b"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dc8c"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dc8d"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dc8e"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dc8f"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dc90"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dc71",
        "name": "Sleeve Over Pivot (PPH07)",
        "slug": "sleeve-over-pivot-pph07",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "hinges",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dc72"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dc73"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dc74"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dc75"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dc76"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dc77"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dc78"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },],
    "glassType": [
      {
        "_id": "660507a8a4983e276851dd48",
        "name": "Rain",
        "slug": "rain",
        "image": "images/others/default.png",
        "company_id": "660507a8a4983e276851dc28",
        "options": [
          {
            "partNumber": "",
            "cost": 13.96,
            "priceBySqFt": true,
            "thickness": "3/8",
            "status": false,
            "_id": "660507a8a4983e276851dd49"
          },
          {
            "partNumber": "",
            "cost": 0,
            "priceBySqFt": true,
            "thickness": "1/2",
            "status": true,
            "_id": "660507a8a4983e276851dd4a"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.352Z",
        "updatedAt": "2024-09-06T07:47:10.115Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dd3c",
        "name": "Grey",
        "slug": "grey",
        "image": "images/others/default.png",
        "company_id": "660507a8a4983e276851dc28",
        "options": [
          {
            "partNumber": "",
            "cost": 14.5,
            "priceBySqFt": true,
            "thickness": "3/8",
            "status": true,
            "_id": "660507a8a4983e276851dd3d"
          },
          {
            "partNumber": "",
            "cost": 18.75,
            "priceBySqFt": true,
            "thickness": "1/2",
            "status": false,
            "_id": "660507a8a4983e276851dd3e"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.352Z",
        "updatedAt": "2024-09-02T14:16:44.860Z",
        "__v": 0
      },],
    "mountingChannel": [
      {
        "_id": "660507a8a4983e276851dca9",
        "name": "U-Channel (3/8)",
        "slug": "u-channel-3-8",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "mounting-channels",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dcaa"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dcab"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dcac"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dcad"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dcae"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dcaf"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dcb0"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dca1",
        "name": "U-Channel (1/2)",
        "slug": "u-channel-1-2",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "mounting-channels",
        "oneInchHoles": 1,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dca2"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dca3"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dca4"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dca5"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dca6"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dca7"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dca8"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      }
    ],
    "heavyDutyOption": [
      {
        "_id": "660507a8a4983e276851dc89",
        "name": "Pivot Bevel",
        "slug": "pivot-bevel",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "hinges",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dc8a"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dc8b"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dc8c"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dc8d"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dc8e"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dc8f"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dc90"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dc71",
        "name": "Sleeve Over Pivot (PPH07)",
        "slug": "sleeve-over-pivot-pph07",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "hinges",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dc72"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dc73"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dc74"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dc75"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dc76"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dc77"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dc78"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      },
      {
        "_id": "660507a8a4983e276851dc69",
        "name": "HVY Pivot Bevel",
        "slug": "hvy-pivot-bevel",
        "image": "images/hardwares/default.png",
        "operableTransom": false,
        "hardware_category_slug": "hinges",
        "oneInchHoles": 0,
        "hingeCut": 0,
        "clampCut": 0,
        "notch": 0,
        "outages": 0,
        "company_id": "660507a8a4983e276851dc28",
        "finishes": [
          {
            "name": "Brushed Bronze",
            "image": "images/finishes/brushed_bronze.jpeg",
            "partNumber": "",
            "cost": 10,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2a",
            "_id": "660507a8a4983e276851dc6a"
          },
          {
            "name": "Polished Nickel",
            "image": "images/finishes/polished_nickle.jpeg",
            "partNumber": "",
            "cost": 12,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2b",
            "_id": "660507a8a4983e276851dc6b"
          },
          {
            "name": "Satin Brass",
            "image": "images/finishes/satin_brass.jpeg",
            "partNumber": "",
            "cost": 14,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2c",
            "_id": "660507a8a4983e276851dc6c"
          },
          {
            "name": "Matte Black",
            "image": "images/finishes/matte_black.jpeg",
            "partNumber": "",
            "cost": 16,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2d",
            "_id": "660507a8a4983e276851dc6d"
          },
          {
            "name": "Oil Rubbed Bronze",
            "image": "images/finishes/oil_rubbed_bronze.jpeg",
            "partNumber": "",
            "cost": 18,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2e",
            "_id": "660507a8a4983e276851dc6e"
          },
          {
            "name": "Brushed Nickel",
            "image": "images/finishes/brushed_nickle.jpeg",
            "partNumber": "",
            "cost": 20,
            "status": true,
            "finish_id": "660507a8a4983e276851dc2f",
            "_id": "660507a8a4983e276851dc6f"
          },
          {
            "name": "Polished Chrome",
            "image": "images/finishes/polished_chrome.jpeg",
            "partNumber": "",
            "cost": 22,
            "status": true,
            "finish_id": "660507a8a4983e276851dc30",
            "_id": "660507a8a4983e276851dc70"
          }
        ],
        "createdAt": "2024-03-28T06:01:12.351Z",
        "updatedAt": "2024-09-13T05:42:57.152Z",
        "__v": 0
      }
    ],
  },

};

const EditWineLayoutComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const layoutId = searchParams.get("id");
  const [selectedlayoutId, setSelectedLayoutId] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [addMoreItemsArray, setAddMoreItemsArray] = useState({});
  const [mounting, setMounting] = useState(null);

  useEffect(() => {
    if (layoutId) {
      setSelectedLayoutId(layoutId)
    }
  }, [layoutId]);

  useEffect(() => {
    if (singleLayout) {
      const items = setWineItemsStatusAfterFirstLoad(singleLayout?.layoutData)
      setAddMoreItemsArray(items);
      setMounting({
        channelOrClamps: singleLayout?.layoutData?.settings?.channelOrClamps || "Channel",
        mountingChannel: singleLayout?.layoutData?.settings?.mountingChannel,
      });
      setPageLoading(false);
    }
  }, [singleLayout]);

  //Formik
  const initialValues = {
    image: singleLayout?.layoutData?.image,
    name: singleLayout?.layoutData?.name,
    handles: {
      handleType: singleLayout?.layoutData?.settings?.handles.handleType,
      count: singleLayout?.layoutData?.settings?.handles.count,
    },
    doorLock: {
      type: singleLayout?.layoutData?.settings?.doorLock.type,
      count: singleLayout?.layoutData?.settings?.doorLock.count,
    },

    heavyDutyOption: {
      heavyDutyType:
        singleLayout?.layoutData?.settings?.heavyDutyOption.heavyDutyType,
      height: singleLayout?.layoutData?.settings?.heavyDutyOption.height,
      threshold: singleLayout?.layoutData?.settings?.heavyDutyOption.threshold,
    },

    hardwareFinishes: singleLayout?.layoutData?.settings?.hardwareFinishes,

    hinges: {
      hingesType: singleLayout?.layoutData?.settings?.hinges?.hingesType,
      count: singleLayout?.layoutData?.settings?.hinges?.count,
    },

    channel: singleLayout?.layoutData?.settings?.mountingChannel,

    glassType: {
      type: singleLayout?.layoutData?.settings?.glassType?.type,
      thickness: singleLayout?.layoutData?.settings?.glassType?.thickness,
    },

    other: {
      people: singleLayout?.layoutData?.settings?.other?.people,
      hours: singleLayout?.layoutData?.settings?.other?.hours,
    },
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log({ settings: { ...values, ...mounting } });
      // updateDefault({ settings: { ...values, ...mounting }, id: layoutId });
    },
  });

  const handleAddMoreItemClick = (id) => {
    switch (id) { // remove formik seelcted val
      case 'hardwareFinishes':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('hardwareFinishes', null);
        }
        break;
      case 'handles':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('handles.handleType', null);
          formik.setFieldValue('handles.count', 0);
        }
        break;
      case 'doorLock':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('doorLock.type', null);
          formik.setFieldValue('doorLock.count', 0);
        }
        break;
        case 'heavyDutyOption':
          if (addMoreItemsArray[id]?.status) {
            formik.setFieldValue('heavyDutyOption.heavyDutyType', null);
            formik.setFieldValue('heavyDutyOption.height', 0);
          }
          break;
      case 'hinges':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('hinges.hingesType', null);
          formik.setFieldValue('hinges.count', 0);
        }
        break;
      case 'glassType':
        if (addMoreItemsArray[id]?.status) {
          formik.setFieldValue('glassType.type', null);
          // formik.setFieldValue('glassType.thickness', '0');
        }
        break;

      case 'channel':
        if (addMoreItemsArray[id]?.status) {
          setMounting({
            channelOrClamps: 'Channel',
            mountingChannel: null,
          });
        }
        break;
      default:
        break;
    }
    setAddMoreItemsArray((prevVal) => ({  // update item status
      ...prevVal,
      [id]: {
        ...prevVal[id],
        status: !prevVal[id].status,
      },
    }));
  };

  const handleChangeLayout = (event) => {
    setSelectedLayoutId(event.target.value);
    navigate(`/wine-cellar/layouts/edit?id=${event.target.value}`);
  };

  const activeGlassThickness = formik.values.glassType.thickness;

  const channelAccordingToGlassThickness = useMemo(() => {
    let item = null;
    if (activeGlassThickness === thicknessTypes.ONEBYTWO) {
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-1-2"
      );
    } else if (activeGlassThickness === thicknessTypes.THREEBYEIGHT) {
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    } else {
      // if returns empty value 0
      item = singleLayout?.listData?.mountingChannel?.find(
        (item) => item.slug === "u-channel-3-8"
      );
    }
    return item ? [item] : [];
  }, [activeGlassThickness, singleLayout?.listData]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "12px" }}>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography className="layouttitle">
            Wine Cellar
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
          <Typography onClick={() => navigate(`/wine-cellar/layouts`)} className="layouttitle" sx={{ color: "#000000", cursor: 'pointer' }}>
            Layouts
          </Typography>
          <Typography className="layouttitle">
            /
          </Typography>
        </Box>
        <FormControl
          sx={{ width: "197px" }}
          size="small"
          className="custom-textfield"
        >
          <Select
            value={selectedlayoutId}
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            sx={{ height: "40px", background: "#F6F5FF", width: "262px" }}
            onChange={handleChangeLayout}
            displayEmpty
            renderValue={(value) => {
              const selectedItem = WineLayout?.find(item => item?._id === value);
              return <Typography sx={{
                fontSize: "14px",
                fontFamily: '"Roboto", sans-serif !important',
                color: '#000000',
                textOverflow: 'ellipsis', overflow: 'hidden',
                textWrap: 'nowrap',
                pt: '2px'
              }}>{selectedItem?.name}</Typography>;
            }}
          >
            {WineLayout?.map((data, index) => (
              <MenuItem key={index} value={data?._id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    {data?.name}
                  </Typography>
                  {data?._id === selectedlayoutId ? (
                    <Check sx={{ color: "#8477DA" }} />
                  ) : null}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {pageLoading ? (
        <Box
          sx={{
            height: "60vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#8477DA" }} />
        </Box>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 3,
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: "23px",
                  color: "#000000",
                }}
              >
                {/* {singleLayout?.layoutData?.name} */}
                {(WineLayout?.find(item => item?._id === selectedlayoutId)).name}
              </Typography>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#8477DA",
                    width: "88px",
                    height: "42px",
                    color: "white",
                    textTransform: "capitalize",
                    borderRadius: 1,
                    fontSize: 16,
                    fontWeight: 600,
                    padding: "10px 13px",
                    display: "box",
                    "&:hover": { backgroundColor: "#8477DA" },
                  }}
                >
                  Update
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={5.2}>
                <Box
                  sx={{
                    width: { md: "auto", xs: "100%" },
                    background: "#F3F5F6",
                    border: "1px solid #D4DBDF",
                    p: "14px 30px",
                    borderRadius: "4px 4px 0px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "21px",
                      color: "#000000",
                    }}
                  >
                    Layout
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "808px",
                    border: "1px solid #D4DBDF",
                    px: { md: 2, xs: 1 },
                    background: "#FFFF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`${backendURL}/${singleLayout?.layoutData?.image}`}
                    alt="/"
                    style={{ width: "423px", height: "557px" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={6.8}>
                <Box
                  sx={{
                    width: { md: "auto", xs: "100%" },
                    background: "#F3F5F6",
                    border: "1px solid #D4DBDF",
                    p: "14px 30px",
                    borderRadius: "4px 4px 0px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: "21px",
                      color: "#000000",
                    }}
                  >
                    Modifications
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #D0D5DD",
                    p: "24px 30px",
                    background: "#FFFF",
                    borderRadius: "0px 0px 12px 12px",
                  }}
                >
                  <Grid container spacing={2}>
                    {addMoreItemsArray?.hardwareFinishes?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Hardware Finishes
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Box>
                            <CustomInputMenu
                              size="small"
                              variant="outlined"
                              name="hardwareFinishes"
                              color={"purple"}
                              fullWidth={true}
                              value={formik.values.hardwareFinishes || null}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.hardwareFinishes}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>}
                    {addMoreItemsArray?.handles?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Handles
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <CustomInputMenu
                            size="small"
                            variant="outlined"
                            name="handles.handleType"
                            fullWidth={true}
                            color={"purple"}
                            value={formik.values.handles.handleType || ""}
                            onChange={(e) => {
                              formik.handleChange(e);

                              if (e.target.value === null) {
                                formik.setFieldValue("handles.count", 0);
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.handles}
                          />
                          <CustomInputField
                            type="number"
                            InputProps={{
                              inputProps: { min: 0 },
                            }}
                            size="small"
                            variant="outlined"
                            name="handles.count"
                            color={"purple"}
                            fullWidth={true}
                            value={
                              formik.values.handles.count !== undefined
                                ? formik.values.handles.count
                                : 0
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </Box>
                      </Box>
                    </Grid>}
                    {addMoreItemsArray?.glassType?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Glass Type
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <CustomInputMenu
                            color={"purple"}
                            size="small"
                            variant="outlined"
                            name="glassType.type"
                            fullWidth={true}
                            value={formik.values.glassType.type || ""}
                            onChange={(event) => {
                              formik.handleChange(event);

                              if (event.target.value === null) {
                                formik.setFieldValue("glassType.thickness", "0");
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.glassType}
                          />
                          <TextField
                            select
                            size="small"
                            variant="outlined"
                            name="glassType.thickness"
                            style={{ width: "100%" }}
                            value={formik.values.glassType.thickness || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required={true}
                            className={"custom-textfield-purple"}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                height: "40px",
                              },
                            }}
                          >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem key="1/2" value="1/2">
                              1/2
                            </MenuItem>
                            <MenuItem key="3/8" value="3/8">
                              3/8
                            </MenuItem>
                          </TextField>
                        </Box>
                      </Box>
                    </Grid>}
                    {addMoreItemsArray?.hinges?.status && <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Hinges
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <CustomInputMenu
                            color={"purple"}
                            size="small"
                            variant="outlined"
                            name="hinges.hingesType"
                            fullWidth={true}
                            value={formik.values.hinges.hingesType || ""}
                            onChange={(e) => {
                              formik.handleChange(e);

                              if (e.target.value === null) {
                                formik.setFieldValue("hinges.count", 0);
                              }
                            }}
                            onBlur={formik.handleBlur}
                            MenuData={singleLayout?.listData?.hinges}
                          />
                          <CustomInputField
                            color={"purple"}
                            type="number"
                            InputProps={{
                              inputProps: { min: 0 },
                            }}
                            size="small"
                            variant="outlined"
                            name="hinges.count"
                            fullWidth={true}
                            value={
                              formik.values.hinges.count !== undefined
                                ? formik.values.hinges.count
                                : 0
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </Box>
                      </Box>
                    </Grid>}

                    {addMoreItemsArray?.doorLock?.status &&
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Door Lock
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              size="small"
                              variant="outlined"
                              name="doorLock.type"
                              fullWidth={true}
                              color={"purple"}
                              value={formik.values.doorLock.type || ""}
                              onChange={(e) => {
                                formik.handleChange(e);

                                if (e.target.value === null) {
                                  formik.setFieldValue("doorLock.type", 0);
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.handles}
                            />
                            <CustomInputField
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                              size="small"
                              variant="outlined"
                              name="doorLock.count"
                              color={"purple"}
                              fullWidth={true}
                              value={
                                formik.values.doorLock.count !== undefined
                                  ? formik.values.doorLock.count
                                  : 0
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>}

                    {addMoreItemsArray?.heavyDutyOption?.status && (
                      <Grid item md={6} xs={12} sx={{ pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Heavy Duty Option
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <CustomInputMenu
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="heavyDutyOption.heavyDutyType"
                              fullWidth={true}
                              value={
                                formik.values.heavyDutyOption.heavyDutyType || ""
                              }
                              onChange={(e) => {
                                formik.handleChange(e);

                                if (e.target.value === null) {
                                  formik.setFieldValue(
                                    "heavyDutyOption.threshold",
                                    0
                                  );
                                  formik.setFieldValue(
                                    "heavyDutyOption.height",
                                    0
                                  );
                                }
                              }}
                              onBlur={formik.handleBlur}
                              MenuData={singleLayout?.listData?.heavyDutyOption}
                            />

                            <CustomInputField
                              color={"purple"}
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                              size="small"
                              variant="outlined"
                              placeholder={"height"}
                              name="heavyDutyOption.height"
                              fullWidth={true}
                              value={
                                formik.values.heavyDutyOption.height !== undefined
                                  ? formik.values.heavyDutyOption.height
                                  : null
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    {addMoreItemsArray?.channel?.status && (
                      <Grid xs={6} sx={{ p: 1.8, pb: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography className="modificationTitle">
                            Channel
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            {channelAccordingToGlassThickness?.map((item) => {
                              const isSelected = mounting?.mountingChannel === item._id;
                              return (
                                <MenuItem
                                  key={item.id}
                                  onClick={() =>
                                    setMounting((prev) => ({
                                      ...prev,
                                      mountingChannel: isSelected ? null : item._id
                                    }))
                                  }
                                  sx={{ padding: 0 }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      borderRadius: "8px",
                                      height: "46px",
                                      border: isSelected ? "1px solid #8477DA" : "1px solid #D4DBDF",
                                      background: isSelected ? "#8477DA0F" : "white",
                                      px: "8px",
                                      display: "flex",
                                      gap: 2,
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                      <img
                                        width="25px"
                                        height="25px"
                                        src={`${backendURL}/${item.image}`}
                                        alt={item.name}
                                      />
                                      <Typography>{item.name}</Typography>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              );
                            })}
                          </Box>
                        </Box>
                      </Grid>
                    )}

                    <Grid item xs={12} sx={{ pb: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          width: "100%",
                        }}
                      >
                        <Typography className="modificationTitle">
                          Labor
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "16px",
                            width: "100%",
                          }}
                        >
                          <Box sx={{
                            width: "50%", display: "flex", flexDirection: 'column',
                            gap: "8px",
                          }}>
                            {" "}
                            <Typography
                              className="modificationTitle"
                              sx={{ fontSize: 16 }}
                            >
                              People
                            </Typography>
                            <CustomInputField
                              color={"purple"}
                              size="small"
                              variant="outlined"
                              name="other.people"
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                              fullWidth={true}
                              value={formik.values.other.people}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                          <Box sx={{
                            width: "50%", display: "flex", flexDirection: 'column',
                            gap: "8px",
                          }}>
                            {" "}
                            <Typography
                              className="modificationTitle"
                              sx={{ fontSize: 16 }}
                            >
                              Hours
                            </Typography>
                            <CustomInputField
                              color={"purple"}
                              size="small"
                              type="number"
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                              variant="outlined"
                              name="other.hours"
                              fullWidth={true}
                              value={formik.values.other.hours}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <AddMoreItems items={addMoreItemsArray}
                    handleItemClick={handleAddMoreItemClick}
                  />
                </Box>

              </Grid>
            </Grid>
          </form>
        </>
      )}


    </Box>
  )
}

export default EditWineLayoutComponent
