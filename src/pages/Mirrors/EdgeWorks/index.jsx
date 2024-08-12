import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsEdgeWorkComponent from '@/components/Mirrors/EdgeWorks';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
export const MirrorsEdgeWork = () => {
    return (
    <>
    <TopBar/>
     <Box className="main-wrapper">
        {/* <Sidebar /> */}
        <CommonSideBar/>
        <Box className="edcontent-wrapper">
            <MirrorsEdgeWorkComponent />
        </Box>
    </Box>
    </>
   );
}

export default MirrorsEdgeWork;


