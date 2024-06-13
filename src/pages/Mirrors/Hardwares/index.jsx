import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsHardwareComponent from '@/components/Mirrors/Hardwares';
export const MirrorsHardware = () => {
    return (<Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <MirrorsHardwareComponent />
        </Box>
    </Box>);
}

export default MirrorsHardware;


