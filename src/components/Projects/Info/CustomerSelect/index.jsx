const { default: CreateCustomerForm } = require("./createCustomerForm")
const { default: SelectFromList } = require("./selectFromList");
const { default: CustomerPreview } = require("./customerPreview");
const { Box, Typography } = require("@mui/material");

const CustomerSelect = ({ selectedCustomer, setSelectedCustomer, steps, handleStepChange }) => {

    return (<Box
        sx={{
            // backgroundColor: { xs: "#100D24", sm: "white" },
            // backdropFilter: { xs: "blur(81.5px)", sm: "none" },
            // padding: 1.5,
            // color: { sm: "#101828", xs: "white" },
            borderTopLeftRadius: { sm: "4px", xs: 30 },
            borderTopRightRadius: { sm: "4px", xs: 30 },
            width: { sm: "480px", xs: "100%" },
        }}
    >

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ textAlign: "center", p: 0.2, fontSize: '18px', fontWeight: 700 }}>{steps === 0 ? 'Select a customer' : steps === 1 ? 'Create Customer' : ''}</Typography>
        </Box>
        {steps === 0 ? (
            <SelectFromList handleStepChange={handleStepChange} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} key={'select-from-list-modal'} />
        ) : steps === 1 ? (
            <CreateCustomerForm setSelectedCustomer={setSelectedCustomer} key={'create-customer-form'} handleStepChange={handleStepChange} />
        ) : steps === 2 ? <CustomerPreview handleStepChange={handleStepChange} selectedCustomer={selectedCustomer} key={'customer-preview-screen'} /> : ''}
    </Box>)
};

export default CustomerSelect;
