import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsHardwareComponent from '@/components/Mirrors/Hardwares';
import TopBar from "@/components/TopBar";
export const MirrorsHardware = () => {
    return (
    <>
    <TopBar/>
     <Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <MirrorsHardwareComponent />
        </Box>
    </Box>
    </>
   );
}

export default MirrorsHardware;


