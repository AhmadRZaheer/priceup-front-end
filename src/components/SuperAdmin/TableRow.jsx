import { CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserStatus } from "../../utilities/ApiHooks/SuperAdmin";

const TableRow = ({ row, refetch }) => {
  const {
    mutate: updateStatus,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUserStatus();
  const [active, setActive] = useState(row.status);
  const handleSwitch = () => {
    setActive(!active);
    updateStatus({ status: !active, id: row._id });
  };
  useEffect(() => {
    if (SuccessForEdit) {
      refetch();
    }
  }, [SuccessForEdit]);
  return (
    <div className="cellAction">
      <div
       
      >
        {LoadingForEdit ? (
          <CircularProgress size={24} color="warning" />
        ) : (
          <FormControlLabel
            control={
              <Switch
                // defaultValue={params.row.status}
                color="primary"
                checked={active}
                // onChange={() => setStatus(!status)}
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
