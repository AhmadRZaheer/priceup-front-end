import {
  Box,
  // CircularProgress,
  // FormControlLabel,
  // Switch,
  // Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useCustomUserStatus,
  useUserStatus,
} from "../../utilities/ApiHooks/superAdmin";
import CustomToggle from "../ui-components/Toggle";
import { useEditTeamMembers } from "../../utilities/ApiHooks/team";
import { useUpdateSuper_SuperAdmins } from "../../utilities/ApiHooks/super_superAdmins";
import { setLocationsRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";

const TableRow = ({ row, onToggleChange, type, title, refetch, text }) => {
  const dispatch = useDispatch();
  const {
    mutate: updateLocationAdminStatus,
    isLoading: LoadingForEdit,
    isSuccess: SuccessForEdit,
  } = useUserStatus();

  const { mutate: updateSuperAdminStatus } = useUpdateSuper_SuperAdmins();
  const {
    mutate: updateCustomAdminStatus,
    isLoading: LoadingForEditUser,
    isSuccess: SuccessForEditUser,
  } = useCustomUserStatus();
  const { mutate: updateLocationStaffStatus, isSuccess: isSuccessStaffUpdated } =
    useEditTeamMembers();
  const [active, setActive] = useState(row.status);

  const handleSwitch = () => {
    setActive(!active);
    if (type === "superAdmin") {
      updateLocationAdminStatus({ status: !active, id: row?._id });
      onToggleChange(!active);
      dispatch(setLocationsRefetch())
    } else if (type === "superAdminTeam") {
      updateLocationStaffStatus({ status: !active, id: row?._id });
    } else if (type === "superAdminUser") {
      updateCustomAdminStatus({ status: !active, id: row?._id });
    } else if (type === "super_superadmin") {
      updateSuperAdminStatus({ status: !active, id: row?._id });
    }
    // Call the callback function to update non-active count
  };
  useEffect(() => {
    if (SuccessForEditUser || SuccessForEdit || isSuccessStaffUpdated) {
      if(type !== "superAdmin"){
        refetch();
      }      
    }
  }, [SuccessForEditUser, SuccessForEdit, isSuccessStaffUpdated]);

  return (
    <div className="cellAction">
      <div>
        <Box sx={{ height: 50 }}>
          <CustomToggle
            text={text}
            title={title}
            checked={active}
            onClick={() => handleSwitch()}
          />
        </Box>
      </div>
    </div>
  );
};

export default TableRow;
