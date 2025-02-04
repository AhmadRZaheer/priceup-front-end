import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { getContent } from '@/redux/wineCellarEstimateSlice';
import {
  getSelectedCostDifferenceErrorMsgs,
} from '@/utilities/estimatorHelper';
import {
  Box,
  Typography,
} from '@mui/material';

const WineCallerCostDifferenceMsgs = () => {
  const selectedContent = useSelector(getContent);
  const hardwareDisable = useMemo(() => {
    const getErrors = getSelectedCostDifferenceErrorMsgs(selectedContent);
    return getErrors;
  }, [selectedContent]);

  console.log(hardwareDisable, "hardwareDisablehardwareDisable");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/** Hardware finish not selected */}
      {hardwareDisable?.hardwareFinish && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Hardware Finish:</Typography>
          <Typography>{hardwareDisable?.hardwareFinish?.message}</Typography>
        </Box>
      )}
      {/** Handle not available */}
      {hardwareDisable?.handle && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Handle:</Typography>
          <Typography>{hardwareDisable?.handle?.message}</Typography>
        </Box>
      )}
      {/** Door Lock not available */}
      {hardwareDisable?.doorLock && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Door Lock:</Typography>
          <Typography>{hardwareDisable?.doorLock?.message}</Typography>
        </Box>
      )}
      {/** Hinge not available */}
      {hardwareDisable?.hinge && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Hinge:</Typography>
          <Typography>{hardwareDisable?.hinge?.message}</Typography>
        </Box>
      )}
      {/** Sliding Door System not available */}
      {hardwareDisable?.slidingDoorSystem && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Sliding Door System:
          </Typography>
          <Typography>{hardwareDisable?.slidingDoorSystem?.message}</Typography>
        </Box>
      )}
      {/** Header not available */}
      {hardwareDisable?.header && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Header:</Typography>
          <Typography>{hardwareDisable?.header?.message}</Typography>
        </Box>
      )}
      {/** Hardware addons not available */}
      {hardwareDisable?.hardwareAddons && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Hardware Addons:</Typography>
          {hardwareDisable?.hardwareAddons?.length > 0 &&
            hardwareDisable?.hardwareAddons.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
      {/** Glass type not available */}
      {hardwareDisable?.glassType && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Glass Type:</Typography>
          <Typography>{hardwareDisable?.glassType?.message}</Typography>
        </Box>
      )}
      {/** Glass addons not available */}
      {hardwareDisable?.glassAddons && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Glass Addons:</Typography>
          {hardwareDisable?.glassAddons?.length > 0 &&
            hardwareDisable?.glassAddons.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
      {/** Mounting Channel not available */}
      {hardwareDisable?.mountingChannel &&
        selectedContent.mountingState === "channel" && (
          <Box
            sx={{
              display: "flex",
              textAlign: "baseline",
              gap: 0.6,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Mounting Channel:
            </Typography>
            <Typography>{hardwareDisable?.mountingChannel?.message}</Typography>
          </Box>
        )}
      {/** Mounting Wall Clamp not available */}
      {hardwareDisable?.wallClamp &&
        selectedContent.mountingState === "clamps" && (
          <Box
            sx={{
            //   display: "flex",
              textAlign: "baseline",
              gap: 0.6,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Mounting Wall Clamp:
            </Typography>
            {hardwareDisable?.wallClamp?.length > 0 &&
              hardwareDisable?.wallClamp.map((item, index) => (
                <Typography key={index}>{item?.message}</Typography>
              ))}
          </Box>
        )}
      {/** Mounting Sleeve Over not available */}
      {hardwareDisable?.sleeveOver &&
        selectedContent.mountingState === "clamps" && (
          <Box
            sx={{
            //   display: "flex",
              textAlign: "baseline",
              gap: 0.6,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Mounting Sleeve Over:
            </Typography>
            {hardwareDisable?.sleeveOver?.length > 0 &&
              hardwareDisable?.sleeveOver.map((item, index) => (
                <Typography key={index}>{item?.message}</Typography>
              ))}
          </Box>
        )}
      {/** Mounting Glass to Glass not available */}
      {hardwareDisable?.glassToGlass &&
        selectedContent.mountingState === "clamps" && (
          <Box
            sx={{
            //   display: "flex",
              textAlign: "baseline",
              gap: 0.6,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Mounting Glass to Glass:
            </Typography>
            {hardwareDisable?.glassToGlass?.length > 0 &&
              hardwareDisable?.glassToGlass.map((item, index) => (
                <Typography key={index}>{item?.message}</Typography>
              ))}
          </Box>
        )}
      {/** Corner Wall Clamp not available */}
      {hardwareDisable?.cornerWallClamp && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Corner Wall Clamp:
          </Typography>
          {hardwareDisable?.cornerWallClamp?.length > 0 &&
            hardwareDisable?.cornerWallClamp.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
      {/** Corner Sleeve Over not available */}
      {hardwareDisable?.cornerSleeveOver && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Corner Sleeve Over:
          </Typography>
          {hardwareDisable?.cornerSleeveOver?.length > 0 &&
            hardwareDisable?.cornerSleeveOver.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
      {/** Corner Glass to Glass not available */}
      {hardwareDisable?.cornerGlassToGlass && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Corner Glass to Glass:
          </Typography>
          {hardwareDisable?.cornerGlassToGlass?.length > 0 &&
            hardwareDisable?.cornerGlassToGlass.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default WineCallerCostDifferenceMsgs;
