import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsGlassAddonComponent from '@/components/Mirrors/GlassAddons';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
export const MirrorsGlassAddon = () => {
    return (
    <>
    <TopBar/>
    <Box className="main-wrapper">
        {/* <Sidebar /> */}
        <CommonSideBar />
        <Box className="gcontent-wrapper">
            <MirrorsGlassAddonComponent />
        </Box>
    </Box>
    </>
    );
}

export default MirrorsGlassAddon;


