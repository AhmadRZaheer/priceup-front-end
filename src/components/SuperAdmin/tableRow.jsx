import { Box, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCustomUserStatus,
  useUserStatus,
} from "../../utilities/ApiHooks/superAdmin";
import CustomToggle from "../ui-components/Toggle";
import { useEditTeamMembers } from "../../utilities/ApiHooks/team";
import { useUpdateSuper_SuperAdmins } from "../../utilities/ApiHooks/super_superAdmins";

const TableRow = ({ row, onToggleChange, type }) => {
  const {
    mutate: updateStatus,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUserStatus();
  const { mutate: updateSuper_SuperAdmin } = useUpdateSuper_SuperAdmins();
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
    } else if (type === "super_superadmin") {
      updateSuper_SuperAdmin({ status: !active, id: row?._id });
    }
    // Call the callback function to update non-active count
  };

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
