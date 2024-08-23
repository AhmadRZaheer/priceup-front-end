import { selectedItem } from "@/redux/estimateCalculations";
import { useCreateEstimates } from "@/utilities/ApiHooks/estimate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Close } = require("@mui/icons-material");
const {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} = require("@mui/material");
const { useFormik } = require("formik");

const EnterLabelModal = ({
  handleClose,
  open,
  estimateConfig,
  estimateCategory,
  estimatesTotal,
  projectId,
}) => {
  const { mutateAsync, isLoading: estimateCreateLoading } =
    useCreateEstimates();
  const navigate = useNavigate();
  const estimatesLayout = useSelector(selectedItem);
  const formik = useFormik({
    initialValues: {
      label: "",
    },
    onSubmit: (values) => {
      handleSave(values.label);
    },
  });

  const handleSave = async (label) => {
    try {
      await mutateAsync({
        estimateData: {
          ...estimateConfig,
          layout_id: estimatesLayout?._id || null,
        },
        label: label,
        category: estimateCategory,
        cost: Number(estimatesTotal),
        projectId: projectId,
      });
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          zIndex: 12,
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: { sm: "center" },
          alignItems: { xs: "end", sm: "center" },
        }}
      >
        <Box
          sx={{
            backgroundColor: { xs: "#100D24", sm: "white" },
            backdropFilter: { xs: "blur(81.5px)", sm: "none" },
            padding: "24px 16px 24px 16px",
            borderTopLeftRadius: { sm: "12px", xs: 30 },
            borderTopRightRadius: { sm: "12px", xs: 30 },
            color: { sm: "#101828", xs: "white" },
            width: { sm: "453px", xs: "100%" },
            borderRadius: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
              Add Label
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                // width: "100%",
                backgroundColor: "#F3F5F6",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: 600, mb: 0.8 }}>
                Estimate Name
              </Typography>
              <TextField
                id="label"
                name="label"
                placeholder="Enter label"
                size="small"
                variant="outlined"
                className="custom-textfield"
                InputProps={{
                  inputProps: { min: 0, max: 50 },
                }}
                InputLabelProps={{
                  style: {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                sx={{
                  color: { sm: "black", xs: "white" },
                }}
                fullWidth
                value={formik.values.label}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="button"
                onClick={() => handleClose()}
                variant="contained"
                sx={{
                  textTransform: "initial",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    border: " 1px solid #8477DA",
                  },
                  color: "#101828",
                  border: " 1px solid #D6DAE3",
                  boxShadow: "none",
                }}
              >
                {" "}
                Cancel
              </Button>
              <Button
                disabled={estimateCreateLoading}
                type="submit"
                sx={{
                  textTransform: "initial",
                  backgroundColor: "#8477da",
                  "&:hover": {
                    backgroundColor: "#8477da",
                  },
                  boxShadow: "none",
                }}
                variant="contained"
              >
                {estimateCreateLoading ? <CircularProgress /> : "Save Estimate"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default EnterLabelModal;
