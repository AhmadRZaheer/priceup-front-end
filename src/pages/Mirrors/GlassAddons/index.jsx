import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsGlassAddonComponent from '@/components/Mirrors/GlassAddons';
export const MirrorsGlassAddon = () => {
    return (<Box className="main-wrapper">
        <Sidebar />
        <Box className="content-wrapper">
            <MirrorsGlassAddonComponent />
        </Box>
    </Box>);
}

export default MirrorsGlassAddon;


