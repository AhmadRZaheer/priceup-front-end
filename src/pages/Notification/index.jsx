import React from 'react'
import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import Notifications from '@/components/Notification';
import TopBar from '@/components/TopBar';
import { getDecryptedToken } from '@/utilities/common';
import { isAdmin, isCustomAdmin, isStaff, isSuperAdmin } from '@/utilities/authentications';
import StaffLocationsSidebar from '@/components/staffLocations_SideBar/staffLocation_SideBar';
import MobileBar from '@/components/MobileNavBar/mobleNavBar';
import AdminSidebar from '@/components/CustomAdmin_SideBar/adminSideBar';
import SuperSidebar from '@/components/SuperSidebar/superSidebar';


const getSidebarAccordingToUserRole = (decodedToken) => {
  if (!decodedToken) {
    return <></>;
  }

  const { company_id } = decodedToken;

  if (isAdmin(decodedToken) || (isCustomAdmin(decodedToken) && company_id?.length)) {
    return <Sidebar />; // for admin and custom admin where company id exists
  }
  if (isStaff(decodedToken)) {
    if (company_id === "") {
      return <StaffLocationsSidebar />; // staff sidebar where company id is empty 
    }
    if (company_id?.length) {
      return <MobileBar />; // staff sidebar where company id exists
    }
  }
  if (isCustomAdmin(decodedToken) && company_id === "") {
    return <AdminSidebar />; // custom admin sidebar where company id is empty
  }
  if (isSuperAdmin(decodedToken)) {
    return <SuperSidebar />; // super admin sidebar
  }

  return <></>;
};

const Notification = () => {
  const decodedToken = getDecryptedToken();
  return (
    <>
      <TopBar />
      <Box className="main-wrapper">
        {getSidebarAccordingToUserRole(decodedToken)}
        <Box className="content-wrapper">
          <Notifications />
        </Box>
      </Box>

    </>
  )
}

export default Notification