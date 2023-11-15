import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserStatus } from "../../utilities/ApiHooks/superAdmin";
import CustomToggle from "../ui-components/Toggle";

const TableRow = ({ row, refetch, onToggleChange }) => {
  const {
    mutate: updateStatus,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUserStatus();
  const [active, setActive] = useState(row.status);

  const handleSwitch = () => {
    setActive(!active);
    updateStatus({ status: !active, id: row._id });
    // Call the callback function to update non-active count
    onToggleChange(active);
  };

  useEffect(() => {
    if (SuccessForEdit) {
      refetch();
    }
  }, [SuccessForEdit]);

  return (
    <div className="cellAction">
      <div>
        <Box sx={{ height: 50 }}>
          <CustomToggle checked={active} onClick={() => handleSwitch()} />
        </Box>
      </div>
    </div>
  );
};

export default TableRow;
