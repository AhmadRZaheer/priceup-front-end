import { useMemo } from 'react';

import {
  getSelectedCostDifferenceErrorMsgs,
} from '@/utilities/mirrorEstimates';
import {
  Box,
  Typography,
} from '@mui/material';

const MirrorCostDifferenceMsgs = ({mirrorCostDifference}) => {
  const selectedContent = mirrorCostDifference?.content;
  const hardwareDisable = useMemo(() => {
    const getErrors = getSelectedCostDifferenceErrorMsgs(selectedContent);
    return getErrors;
  }, [selectedContent]);
  console.log(hardwareDisable,'hardwareDisablehardwareDisable')
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      {/** Edge work not available */}
      {hardwareDisable?.edgeWork && (
        <Box
          sx={{
            display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Edge Work:</Typography>
          <Typography>{hardwareDisable?.edgeWork?.message}</Typography>
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
      {/** Hardware addons not available */}
      {hardwareDisable?.hardwares && (
        <Box
          sx={{
            // display: "flex",
            textAlign: "baseline",
            gap: 0.6,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Hardwares:</Typography>
          {hardwareDisable?.hardwares?.length > 0 &&
            hardwareDisable?.hardwares.map((item, index) => (
              <Typography key={index}>{item?.message}</Typography>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default MirrorCostDifferenceMsgs;
