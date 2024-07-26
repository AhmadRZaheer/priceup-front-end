import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { useFormik } from "formik";
// import { TextField } from "@material-ui/core";
import {
    useCreateEstimates
} from "@/utilities/ApiHooks/estimate";
import { useDispatch, useSelector } from "react-redux";
import {
    // getTotal,
    selectedItem,
} from "@/redux/estimateCalculations";
import { useNavigate } from "react-router-dom";
// import { CircularProgress, InputAdornment } from "@mui/material";
// import { useFetchDataCustomer } from "@/utilities/ApiHooks/customer";
import { useState } from "react";
import { useEffect } from "react";
import { Close } from "@mui/icons-material";
import { setEstimatesListRefetch } from "@/redux/refetch";
// import { getPricing } from "@/redux/mirrorsEstimateSlice";
import SelectFromList from "./selectFromList";
import CreateCustomerForm from "./createCustomerForm";
import { IconButton, Typography } from "@mui/material";
import EnterEstimateLabel from "./enterEstimateLabel";



export const CustomerSelectModal = ({ open, handleCancel, estimateConfig, estimateCategory, estimatesTotal, projectId }) => {
    const {
        mutateAsync,
        isError: ErrorForAdd,
        isSuccess: CreatedSuccessfully,
    } = useCreateEstimates();

    const estimatesLayout = useSelector(selectedItem);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [steps, setSteps] = useState(0);   // 0 for list, 1 for create, 2 for give label
    const [previousStep, setPreviousStep] = useState(0);

    useEffect(() => {
        if (CreatedSuccessfully) {
            dispatch(setEstimatesListRefetch());
            handleCancel();
            navigate("/estimates");
        } else if (ErrorForAdd) {
            const errorMessage = ErrorForAdd.message || "An error occurred";
        }
    }, [CreatedSuccessfully, ErrorForAdd]);

    const handleStepChange = (step) => {
        setPreviousStep(steps);
        setSteps(step);
    }
    const handleSave = async (label) => {
        let firstName = '';
        let lastName = '';
        let id = null;
        if (selectedUser?._id && selectedUser?.name) {
            const name = selectedUser.name.split(" ");
            firstName = name[0];
            lastName = name[1];
            id = selectedUser._id;
        }
        else {
            firstName = selectedUser.firstName;
            lastName = selectedUser.lastName;
        }
        await mutateAsync({
            customerData: {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: selectedUser.email?.length > 0 ? selectedUser.email : null,
                phone: selectedUser.phone?.length > 0 ? selectedUser.phone : null,
                address: selectedUser.address,
            },
            estimateData: {
                ...estimateConfig,
                layout_id: estimatesLayout?._id || null,
            },
            label: label,
            category: estimateCategory,
            cost: Number(estimatesTotal),
            projectId: projectId
        });
    }

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
                        padding: 3,
                        borderTopLeftRadius: { sm: "4px", xs: 30 },
                        borderTopRightRadius: { sm: "4px", xs: 30 },
                        color: { sm: "#101828", xs: "white" },
                        width: { sm: "400px", xs: "100%" },
                    }}
                >

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ textAlign: "center", p: 1 }}>{steps === 0 ? 'Select a customer' : steps === 1 ? 'Create customer' : 'Enter estimate label'}</Typography>
                        <IconButton onClick={handleCancel}><Close /></IconButton>
                    </Box>
                    {steps === 0 ? (
                        <SelectFromList handleStepChange={handleStepChange} handleCancel={handleCancel} selectedUser={selectedUser} setSelectedUser={setSelectedUser} key={'select-from-list-modal'} />
                    ) : steps === 1 ? (
                        <CreateCustomerForm setSelectedUser={setSelectedUser} key={'create-customer-form'} handleStepChange={handleStepChange} />
                    ) : steps === 2 ? (
                        <EnterEstimateLabel handleSave={handleSave} previousStep={previousStep} handleStepChange={handleStepChange} />
                    ) : ''}

                </Box>
            </Box>
        </Modal>
    );
}
