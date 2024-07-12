import { Box, Grid, Typography } from "@mui/material";
import NotificationSection from "./NotificationSection";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleItemDetail from "../SingleItemDetail";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const ArchiveSection = ({ data }) => {
    const query = useQuery();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(query.get('id') ?? "");
    const handleItemClick = (activeTab = 'Archive', id) => {
        navigate(`/notification?tab=${activeTab}&id=${id}`);
        setSelectedId(id);
    }

    return (<Grid container>
        <Grid item xs={6} sx={{borderRight:'0.5px solid #F1F1F1'}}>
            <NotificationSection list={data} handleItemClick={handleItemClick} selectedId={selectedId} />
        </Grid>
        <Grid item xs={6}>
            {selectedId?.length ? <SingleItemDetail selectedId={selectedId} handleMoveToArchive={() => { }} editLoading={false} />
                : <Box sx={{ display: 'flex', height: '200px', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>No preview found. Try selecting item from list.</Typography>
                </Box>
            }
        </Grid>
    </Grid>);
}