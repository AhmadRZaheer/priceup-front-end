import { CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserStatus } from "../../utilities/ApiHooks/superAdmin";

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
        {LoadingForEdit ? (
          <CircularProgress size={24} sx={{ color: "#8477DA" }} />
        ) : (
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={active}
                onClick={() => handleSwitch()}
                name="status"
              />
            }
            label={active ? "Active" : "Inactive"}
          />
        )}
      </div>
    </div>
  );
};

export default TableRow;
