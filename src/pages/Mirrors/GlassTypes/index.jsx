import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsGlassTypeComponent from '@/components/Mirrors/GlassTypes';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
export const MirrorsGlassType = () => {
    return (
    <>
    {/* <TopBar/>
     <Box className="main-wrapper"> */}
        {/* <Sidebar /> */}
        {/* <CommonSideBar/> */}
        <CommonLayout>
        <Box>
            <MirrorsGlassTypeComponent />
        </Box>
        </CommonLayout>
    {/* </Box> */}
    </>
   );
}

export default MirrorsGlassType;


