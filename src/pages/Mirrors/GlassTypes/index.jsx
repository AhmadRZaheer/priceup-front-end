import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsGlassTypeComponent from '@/components/Mirrors/GlassTypes';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
export const MirrorsGlassType = () => {
    return (
    <>
    <TopBar/>
     <Box className="main-wrapper">
        {/* <Sidebar /> */}
        <CommonSideBar/>
        <Box className="gtcontent-wrapper">
            <MirrorsGlassTypeComponent />
        </Box>
    </Box>
    </>
   );
}

export default MirrorsGlassType;


