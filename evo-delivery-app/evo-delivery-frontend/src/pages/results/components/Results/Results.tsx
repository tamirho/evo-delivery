import * as React from 'react';
import {useContext, useEffect, useMemo} from "react";
import {mapActions, MapContext} from "../../../../features/map/context";
import {useOrders} from "../../../orders/hooks/use-orders";
import {useLocation, useNavigate} from "react-router-dom";
import {ENTITY_VIEW_STATES} from "../../../common";
import {EntityList} from "../../../../features/entity-list/EntityList";
import {
    Avatar, Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import {Depot, EvaluateResult} from "../../../../../../evo-delivery-backend/src/types";

const mockResults = [1, 2, 3, 4, 5].map(item => ({
    "draftId": `62e3f0d9d940ee846c57480${item}`,
    "depot": {
        "name": "Base",
        "address": "Tel Aviv-Yafo, Israel",
        "latitude": 32.0852999,
        "longitude": 34.781767,
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
                    "latitude": 33.0085361,
                    "longitude": 35.2980514,
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
    "_id": "62ea478aff58ac71e10e5e84",
    "createdAt": "2022-08-03T10:01:46.336Z",
    "updatedAt": "2022-08-03T10:01:46.336Z"
} as EvaluateResult))


export const Results = () => {
    const {dispatch} = useContext(MapContext);
    // const { data, isFetching, isLoading, isError } = useOrders();

    useEffect(() => {
        dispatch({type: mapActions.UPDATE_RESULTS, payload: {result: mockResults[0], zoom: 13}});
        return () => dispatch({type: mapActions.CLEAR_STATE, payload: {}});
    }, []);


    return (<div>Hello World</div>);
};