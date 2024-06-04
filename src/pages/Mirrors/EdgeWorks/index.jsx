import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsEdgeWorkComponent from '@/components/Mirrors/EdgeWorks';
export const MirrorsEdgeWork = () => {
    return (<Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <MirrorsEdgeWorkComponent />
        </Box>
    </Box>);
}

export default MirrorsEdgeWork;


