import * as React from 'react';

import {EntityList} from '../../../../features/entity-list/EntityList';
import {
    Avatar,
    Divider, IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import RouteIcon from '@mui/icons-material/Route';
import {EvaluateResult} from '../../../../../../evo-delivery-backend/src/types';
import {useGetEntities} from '../../../../hooks/entities/use-get-entities';
import {useNavigateToChild} from '../../../../hooks/router/use-navigate-to-child';
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteEntity} from "../../../../hooks/entities/use-delete-entity";

export const Results = () => {
    const {data: results = [], isFetching, isLoading, isError} = useGetEntities();
    const goToChild = useNavigateToChild();
    const deleteResult = useDeleteEntity();

    return (
        <EntityList
            isLoading={isFetching || isLoading}
            isError={isError}
            items={results as EvaluateResult[]}
            withFilter={(obj, text) =>
                (JSON.stringify(obj)).toLowerCase().includes(text.toLowerCase())
              }
              filterPlaceholder={'Filter results by id or draft id'}
            renderItem={(result: EvaluateResult) => (
                <>
                    <ListItem key={result._id} disablePadding alignItems='center' secondaryAction={
                        <Tooltip title='Delete'>
                            <IconButton edge='end' aria-label='comments' size='small'
                                        onClick={() => deleteResult(result._id as string)}>
                                <DeleteIcon fontSize='inherit'/>
                            </IconButton>
                        </Tooltip>
                    }>
                        <ListItemButton
                            onClick={() => {
                                goToChild(result._id as string);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <RouteIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`ID: ${result._id}`}
                                secondary={
                                    <>
                                        <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                                    color='text.primary'>
                                            {`Draft ID: ${result.draftId}`}
                                        </Typography>
                                        <br/>
                                        <Typography component='span' variant='caption' color='text.muted'>
                                            {`Created At: ${new Date(result.createdAt as string).toDateString()}`} <br/>
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider key={`divider_${result._id}`} variant='middle' component='li'/>
                </>
            )}
        />
    );
};
