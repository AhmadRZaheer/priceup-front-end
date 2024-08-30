import { Box, Grid, Typography } from "@mui/material";
import NotificationSection from "./NotificationSection";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEditDocument } from "@/utilities/ApiHooks/common";
import { setNotificationsRefetch } from "@/redux/refetch";
import { backendURL } from "@/utilities/common";
import { useDispatch } from "react-redux";
import SingleItemDetail from "../SingleItemDetail";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const ActivitySection = ({ data }) => {
    const routePrefix = `${backendURL}/notifications`;
    const query = useQuery();
    const idParam = query.get('id');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState("");
    const { mutateAsync: moveToArchive, isLoading: editLoading, isSuccess: editSuccess } =
        useEditDocument();
    const handleItemClick = (activeTab = 'Activity', id) => {
        setSelectedId(id);
        navigate(`/notification?tab=${activeTab}&id=${id}`);
    }
    const handleMoveToArchive = async () => {
        if (selectedId?.length) {
            await moveToArchive({ data: { archived: true }, apiRoute: `${routePrefix}/${selectedId}` });
            dispatch(setNotificationsRefetch());
            setSelectedId('');
            navigate('/notification?tab=Activity')
        }
    }
    useEffect(()=>{
        if(idParam){
            setSelectedId(idParam);
        }
    },[idParam]);


    
    console.log(selectedId,'sel id',idParam,'param id');
    return (<Grid container>
        <Grid item xs={6} sx={{borderRight:'0.5px solid #F1F1F1'}}>
            <NotificationSection list={data} handleItemClick={handleItemClick} selectedId={selectedId}/>
        </Grid>
        <Grid item xs={6}>
            {selectedId?.length ? <SingleItemDetail selectedId={selectedId} handleMoveToArchive={handleMoveToArchive} editLoading={editLoading} />
                : <Box sx={{ display: 'flex', height: '200px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>No preview found. Try selecting item from list.</Typography>
                </Box>
            }
        </Grid>
    </Grid>);
}