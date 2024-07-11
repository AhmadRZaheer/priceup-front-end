import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsGlassTypeComponent from '@/components/Mirrors/GlassTypes';
import TopBar from "@/components/TopBar";
export const MirrorsGlassType = () => {
    return (
    <>
    <TopBar/>
     <Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <MirrorsGlassTypeComponent />
        </Box>
    </Box>
    </>
   );
}

export default MirrorsGlassType;


