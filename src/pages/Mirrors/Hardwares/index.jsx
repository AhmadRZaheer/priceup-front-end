import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsHardwareComponent from '@/components/Mirrors/Hardwares';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
export const MirrorsHardware = () => {
    return (
    <>
    <TopBar/>
     <Box className="main-wrapper">
        {/* <Sidebar /> */}
        <CommonSideBar/>
        <Box className="mcontent-wrapper">
            <MirrorsHardwareComponent />
        </Box>
    </Box>
    </>
   );
}

export default MirrorsHardware;


