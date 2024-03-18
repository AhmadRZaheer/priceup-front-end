import {
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCustomUserStatus,
  useUserStatus,
} from "../../utilities/ApiHooks/superAdmin";
import CustomToggle from "../ui-components/Toggle";
import { useEditTeamMembers } from "../../utilities/ApiHooks/team";
import { useUpdateSuper_SuperAdmins } from "../../utilities/ApiHooks/super_superAdmins";

const TableRow = ({ row, onToggleChange, type, refetch }) => {
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
  const popupMessage = ""

  const handleSwitch = async () => {
    setActive(!active);
    if (type === "superAdmin") {
      await updateStatus({ status: !active, id: row?._id });
      onToggleChange(active);
    } else if (type === "superAdminTeam") {
      await editTeamMembers({ status: !active, id: row?._id });
    } else if (type === "superAdminUser") {
      await updateStatusUser({ status: !active, id: row?._id });
    } else if (type === "super_superadmin") {
      await updateSuper_SuperAdmin({ status: !active, id: row?._id });
    }
    // Call the callback function to update non-active count
  };
  return (
    <div className="cellAction">
      <div>
        <Tooltip title={popupMessage} placement="top" arrow>
          <Box sx={{ height: 50 }}>
            <CustomToggle checked={active} onClick={() => handleSwitch()} />
          </Box>
        </Tooltip>
      </div>
    </div>
  );
};

export default TableRow;
