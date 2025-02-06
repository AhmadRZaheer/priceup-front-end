import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { getListData } from '@/redux/estimateCalculations';
import { getMirrorsHardware } from '@/redux/mirrorsHardwareSlice';
import {
  getCostDifferenceModelData,
  getCostDifferenceModelStatus,
  setCostDifferenceModelState,
} from '@/redux/modelSlice';
import { getWineCellarsHardware } from '@/redux/wineCellarsHardwareSlice';
import { EstimateCategory } from '@/utilities/constants';
import {
  generateContentForMirrorEdit,
  generateContentForShowerEdit,
  generateContentForWineCellarEdit,
} from '@/utilities/generateEstimateCalculationContent';
import {
  Close,
  ErrorOutline,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import CustomCostDifferenceMsgs from '../Estimates/Customs/costDifferenceMsgs';
import MirrorCostDifferenceMsgs from '../Estimates/Mirrors/costDifferenceMsgs';
import CostDifferenceMsgs from '../Estimates/Showers/costDifferenceMsgs';
import WineCallerCostDifferenceMsgs
  from '../Estimates/WineCellar/costDifferenceMsgs';

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 0.5,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffff",
  borderRadius: "4px",
  p: 3,
  minWidth: "700px",
};

export default function CostDifferenceAlert({ estimate }) {
  console.log(estimate, "estimateestimate");
  const dispatch = useDispatch();
  const status = useSelector(getCostDifferenceModelStatus);
  const reduxData = useSelector(getCostDifferenceModelData);
  const wineCellarsHardware = useSelector(getWineCellarsHardware);
  const mirrorsHardware = useSelector(getMirrorsHardware);
  const showersHardware = useSelector(getListData);
  const handleClose = () => {
    dispatch(setCostDifferenceModelState(false));
  };
  const wineCostDifference = generateContentForWineCellarEdit(
    wineCellarsHardware,
    reduxData
  );
  const showerCostDifference = generateContentForShowerEdit(
    showersHardware,
    reduxData
  );
  const mirrorCostDifference = generateContentForMirrorEdit(
    mirrorsHardware,
    reduxData
  );
  console.log(showerCostDifference, "showerCostDifference");
  return (
    <div>
      <Modal
        open={status}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ ...style, maxWidth: "900px", width: { sm: "auto", xs: "80%" } }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
              {" "}
              <ErrorOutline sx={{ fontSize: 22, mb: "-3px" }} /> Cost Difference
              Alert
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Typography>
            The following selected hardware currently have a cost difference.
          </Typography>
          {reduxData?.category === EstimateCategory.SHOWERS &&
          reduxData?.settings !== null ? (
            <CostDifferenceMsgs showerData={showerCostDifference} />
          ) : reduxData?.category === EstimateCategory.WINECELLARS &&
            reduxData?.settings !== null ? (
            <WineCallerCostDifferenceMsgs
              wineCostDifference={wineCostDifference}
            />
          ) : reduxData?.category === EstimateCategory.MIRRORS ? (
            <MirrorCostDifferenceMsgs
              mirrorCostDifference={mirrorCostDifference}
            />
          ) : (reduxData?.category === EstimateCategory.SHOWERS ||
              reduxData?.category === EstimateCategory.WINECELLARS) &&
            reduxData?.settings === null ? (
            <CustomCostDifferenceMsgs
              customData={
                reduxData?.category === EstimateCategory.SHOWERS
                  ? showerCostDifference
                  : wineCostDifference
              }
            />
          ) : (
            ""
          )}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              marginTop: 2,
              justifyContent: "end",
            }}
          >
            <Button
              sx={{
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                color: "#344054",
                textTransform: "initial",
                border: "1px solid #D0D5DD",
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
