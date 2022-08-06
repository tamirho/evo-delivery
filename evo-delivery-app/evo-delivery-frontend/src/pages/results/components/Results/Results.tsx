import * as React from 'react';
import {useMemo} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ENTITY_VIEW_STATES} from "../../../common";
import {EntityList} from "../../../../features/entity-list/EntityList";
import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import RouteIcon from '@mui/icons-material/Route';
import {EvaluateResult} from "../../../../../../evo-delivery-backend/src/types";
import {useGetEntities} from "../../../../hooks/entities-api/use-get-entities";


export const Results = () => {
    const {data: results = [], isFetching, isLoading, isError} = useGetEntities();
    const navigate = useNavigate();
    const location = useLocation();
    const goToEntity = useMemo(() => (id: string) => navigate(`${id}/${ENTITY_VIEW_STATES.view}${location.search}`), []);


    return (<EntityList
        isLoading={(isFetching || isLoading)}
        isError={isError}
        items={results as EvaluateResult[]}
        renderItem={(result: EvaluateResult) => (
            <ListItem
                key={result._id}
                disablePadding
                alignItems='center'
            >
                <ListItemButton onClick={() => {
                    goToEntity(result._id as string)
                }}>
                    <ListItemAvatar>
                        <Avatar>
                            <RouteIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Result ID: ${result._id}`}
                        secondary={
                            <>
                                <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                            color='text.secondary'>
                                    {`Draft ID: ${result.draftId}`} <br/>
                                    {`Created At: ${new Date(result.createdAt as string).toDateString()}`} <br/>
                                </Typography>
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
        )}
    />);
};