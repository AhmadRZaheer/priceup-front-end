import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCustomUserStatus,
  useUserStatus,
} from "../../utilities/ApiHooks/superAdmin";
import CustomToggle from "../ui-components/Toggle";
import { useEditTeamMembers } from "../../utilities/ApiHooks/team";

const TableRow = ({ row, refetch, onToggleChange, type }) => {
  const {
    mutate: updateStatus,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUserStatus();

  const {
    mutate: updateStatusUser,
    isLoading: LoadingForEditUser,
    isSuccess: SuccessForEditUser,
  } = useCustomUserStatus();
  const { mutate: editTeamMembers } = useEditTeamMembers();

  const [active, setActive] = useState(row.status);

  const handleSwitch = () => {
    setActive(!active);
    if (type === "superAdmin") {
      updateStatus({ status: !active, id: row?._id });
      onToggleChange(active);
    } else if (type === "superAdminTeam") {
      console.log(active, "activeactiveactive");
      editTeamMembers({ status: !active, id: row?._id });
    } else if (type === "superAdminUser") {
      updateStatusUser({ status: !active, id: row?._id });
    }
    // Call the callback function to update non-active count
  };

  useEffect(() => {
    if (SuccessForEdit) {
      refetch();
    }
  }, [SuccessForEdit, SuccessForEditUser]);

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
