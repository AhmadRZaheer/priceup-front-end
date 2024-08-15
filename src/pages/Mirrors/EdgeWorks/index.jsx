import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/sidebar";
import './style.scss';
import MirrorsEdgeWorkComponent from '@/components/Mirrors/EdgeWorks';
import TopBar from "@/components/TopBar";
import CommonSideBar from "@/components/CommonSideBar";
import CommonLayout from "@/components/CommonLayout";
export const MirrorsEdgeWork = () => {
    return (
    <>
    {/* <TopBar/>
     <Box className="main-wrapper"> */}
        {/* <Sidebar /> */}
        {/* <CommonSideBar/> */}
        <CommonLayout>
        <Box className="edcontent-wrapper">
            <MirrorsEdgeWorkComponent />
        </Box>
        </CommonLayout>
    {/* </Box> */}
    </>
   );
}

export default MirrorsEdgeWork;


