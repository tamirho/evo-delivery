import * as React from 'react';
import {useContext, useMemo, useState} from 'react';
import {mapActions, MapContext} from "../../../../features/map/context";
import {useOrders} from "../../../orders/hooks/use-orders";
import {useLocation, useNavigate} from "react-router-dom";
import {ENTITY_VIEW_STATES} from "../../../common";
import {EntityList} from "../../../../features/entity-list/EntityList";
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RouteIcon from '@mui/icons-material/Route';
import {EvaluateResult} from "../../../../../../evo-delivery-backend/src/types";
import {LatLngTuple} from "leaflet";
import {useResults} from "../hooks/use-results";

const mockResults = [1, 2, 3, 4, 5].map(item => ({
    "draftId": `62e3f0d9d940ee846c57480${item}`,
    "depot": {
        "name": "Base",
        "address": "Tel Aviv-Yafo, Israel",
        "latitude": 32.0852999 + item / 4,
        "longitude": 34.781767 + item / 4,
        "_id": "62c996aeac626da9333d7639",
        "updatedAt": "2022-07-09T14:54:38.144Z",
        "createdAt": "2022-07-09T14:54:38.144Z"
    },
    "routes": [
        {
            "driver": {
                "name": "Tamir",
                "maxCapacity": 100,
                "maxDistance": 300,
                "_id": "62a441a835e291eacc7014af",
                "updatedAt": "2022-08-03T10:01:46.335Z",
                "createdAt": "2022-06-11T07:18:00.785Z"
            },
            "orders": [
                {
                    "address": "275X+C6 Ma'alot-Tarshiha, Israel",
                    "latitude": 33.0085361 + item / 2,
                    "longitude": 35.2980514 + item / 2,
                    "shippingDate": "Tue Jul 19 2022 03:00:00 GMT+0300 (Israel Daylight Time)",
                    "weight": 14,
                    "_id": "62e1815da55e83ab66c591bf",
                    "updatedAt": "2022-07-27T18:18:05.312Z",
                    "createdAt": "2022-07-27T18:18:05.312Z"
                },
                {
                    "address": "Nahariyya, Israel",
                    "latitude": 33.0085361,
                    "longitude": 35.0980514,
                    "shippingDate": "Tue Jul 19 2022 03:00:00 GMT+0300 (Israel Daylight Time)",
                    "weight": 14,
                    "_id": "62e1813aa55e83ab66c591bd",
                    "updatedAt": "2022-07-27T18:17:30.880Z",
                    "createdAt": "2022-07-27T18:17:30.880Z"
                }
            ],
            "totalDuration": 131.91666666666666,
            "totalDistance": 164.914,
            "load": 28.000000000000004
        },
        {
            "driver": {
                "name": "vladi",
                "maxCapacity": 10,
                "maxDistance": 100,
                "_id": "62a4424a2711bda52a840773",
                "updatedAt": "2022-08-03T10:01:46.335Z",
                "createdAt": "2022-06-11T07:20:43.005Z"
            },
            "orders": [
                {
                    "address": "275X+C6 Dimona, Israel",
                    "latitude": 31.0085361,
                    "longitude": 35.2980514,
                    "shippingDate": "Tue Jul 19 2022 03:00:00 GMT+0300 (Israel Daylight Time)",
                    "weight": 14,
                    "_id": "62e1816ca55e83ab66c591c1",
                    "updatedAt": "2022-07-27T18:18:20.230Z",
                    "createdAt": "2022-07-27T18:18:20.230Z"
                }
            ],
            "totalDuration": 137,
            "totalDistance": 190.101,
            "load": 140
        }
    ],
    "_id": `62ea478aff58ac71e10e5e8${item}`,
    "createdAt": "2022-08-03T10:01:46.336Z",
    "updatedAt": "2022-08-03T10:01:46.336Z"
} as EvaluateResult))

export const Results = () => {
    const {dispatch} = useContext(MapContext);
    const {data, isFetching, isLoading, isError} = useResults();

    const navigate = useNavigate();
    const location = useLocation();
    const goToEntity = useMemo(() => (id: string) => navigate(`${id}/${ENTITY_VIEW_STATES.view}${location.search}`), []);


    return (<EntityList
        isLoading={false && (isFetching || isLoading)}
        isError={false && isError}
        items={mockResults}
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
                                    {`Created At: ${result.createdAt}`} <br/>
                                </Typography>
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
        )}
    />);
};