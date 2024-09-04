import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsHardwareComponent from '@/components/Mirrors/Hardwares';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
export const MirrorsHardware = () => {
    return (
    <>
    {/* <TopBar/>
     <Box className="main-wrapper"> */}
        {/* <Sidebar /> */}
        {/* <CommonSideBar/> */}
        <CommonLayout>
        <Box>
            <MirrorsHardwareComponent />
        </Box>
        </CommonLayout>
    {/* </Box> */}
    </>
   );
}

export default MirrorsHardware;


